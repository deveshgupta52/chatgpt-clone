
import { ChatGoogle } from "@langchain/google";
import { AIMessage, HumanMessage,SystemMessage, createAgent,tool } from "langchain"
import { ChatMistralAI } from "@langchain/mistralai"

import * as z from "zod"
import { searchInternet } from "./searchInternet.service.js";

const geminiModel = new ChatGoogle({
  apiKey:process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash-lite",
});



const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
})

export const generateResponse=async(messages, modelName, searchDepth = "basic", topic = "general", onChunk)=>{
const dynamicSearchInternetTool = tool(
    async ({ query }) => {
        return await searchInternet({ query, searchDepth, topic });
    },
    {
        name: "searchInternet",
        description: "Use this tool to get the latest information from the internet",
        schema: z.object({
            query: z.string().describe("The query to search the internet for"),
        }),
    }
);

const agent=createAgent({
  model: modelName === "gemini" ? geminiModel : mistralModel,
  tools:[dynamicSearchInternetTool],
  systemMessage:"You are a helpful assistant that answers user queries",
})

const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const currentTime = new Date().toLocaleTimeString('en-US');

const stream = await agent.stream({
  messages:[new SystemMessage(`
    You are a helpful assistant that answers user queries.
    Important: The current date is ${currentDate} and the current time is ${currentTime}.
    Whenever the user asks for "today's", "latest", "recent", or current information, DO NOT assume the year based on your training data. 
    Always use this exact current date and time as your chronological context. 
    If you need to search the internet for the latest information, use the searchInternet tool and explicitly include the current year and date in your search queries to fetch up-to-date information.
    `),
    ...(messages.map((message)=>{
    if(message.role==="user"){
        return new HumanMessage(message.content);
    }else{
        return new AIMessage(message.content);
    }
}))]
}, { streamMode: "messages" });

let fullResponse = "";
console.log(stream)
for await (const [message, metadata] of stream) {
    if (metadata.langgraph_node === "model_request" && message.content) {
        // Skip tool calls/function calls which come as an array/object in content
        if (typeof message.content !== 'string') continue;
        
        const chunk = message.content;
        fullResponse += chunk;
      
        if (onChunk) {
            onChunk(chunk);
        }
    }
}

return fullResponse;
}


export const generateChatTitle=async(message)=>{
const response = await mistralModel.invoke([
     new SystemMessage(
    `You are a helpful assistant that generates a title for the user's message or chat conversation.
    

    Rules:
    1. The title should be short and concise.
    2. The title should be in the same language as the user's message.
    3.The title should be clear,relevant and should give user clear understanding of the chat conversation.
    4.The Title should capture the essence of chat in 2 to 4 words.  

    `
  ),
    new HumanMessage(`
      Generate a title for the  chat conversation based on following first message:
      ${message}
      `),
])
return response.text

}