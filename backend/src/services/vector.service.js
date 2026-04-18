import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const indexName = process.env.PINECONE_INDEX_NAME || 'perplexity-clone';
const index = pinecone.index(indexName);

// const embeddings = new GoogleGenerativeAIEmbeddings({
//     apiKey: process.env.GEMINI_API_KEY,
//     modelName: "text-embedding-004", // embedding-001 is most stable for v1beta
// });

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY,
});

export const upsertFileChunks = async (userId, fileId, text, fileName) => {
    try {
        if (!text || text.trim().length === 0) return;

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunks = await splitter.splitText(text);
        console.log(chunks)
        const vectors = await Promise.all(
            chunks.map(async (chunk, i) => {
                const embedding = await embeddings.embedQuery(chunk);
                return {
                    id: `${fileId}-${i}`,
                    values: embedding,
                    metadata: {
                        userId: userId.toString(),
                        fileId: fileId,
                        fileName: fileName,
                        text: chunk,
                    },
                };
            })
        );
        console.log(`Prepared ${vectors.length} vectors for Pinecone`);

        // Batch upsert to Pinecone (V7 SDK expects { records: [] })
        if (vectors.length > 0) {
            await index.upsert({
                records: vectors
            });
            console.log(`Successfully indexed ${vectors.length} chunks for file ${fileName}`);
        } else {
            console.warn(`No vectors generated for file ${fileName}. Skipping upsert.`);
        }
    } catch (error) {
        console.error('Error upserting to Pinecone:', error);
    }
};

export const queryRelevantContext = async (userId, query) => {
    try {
        const queryEmbedding = await embeddings.embedQuery(query);

        const queryResponse = await index.query({
            vector: queryEmbedding,
            topK: 5,
            includeMetadata: true,
            filter: {
                userId: { '$eq': userId.toString() },
            },
        });

        const context = queryResponse.matches
            .map((match) => match.metadata.text)
            .join('\n\n---\n\n');

        return context;
    } catch (error) {
        console.error('Error querying Pinecone:', error);
        return '';
    }
};
