# Perplexity Clone - Project Explanation

## Overview
This project is an AI-powered search and chat application, similar to **chatgpt**. It is built using the **MERN Stack** (MongoDB, Express, React, Node.js) and integrates modern AI technologies like LangChain, Google Gemini, Mistral AI, Pinecone, and Tavily for real-time web searches and Retrieval-Augmented Generation (RAG).

The platform allows users to chat with AI, ask for the latest information from the internet, and upload files (PDFs, Images, Documents) to ask context-aware questions based on those files.

---

## 🛠️ Tech Stack & Technologies Used

### Frontend
- **React.js (Vite)**: For building a fast, dynamic user interface.
- **Tailwind CSS**: For clean, modern styling.
- **Redux Toolkit**: To manage application state globally (e.g., chat history, generation state).
- **Socket.io Client**: For receiving real-time, token-by-token AI responses (Live Streaming).
- **React-Markdown & Syntax-Highlighter**: To render AI responses beautifully, including code blocks.

### Backend
- **Node.js & Express.js**: Server and API setup.
- **MongoDB & Mongoose**: Database for storing users, chat histories, etc.
- **Socket.io**: To stream AI response chunks to the frontend in real-time.
- **Passport.js & JWT**: For robust Authentication, including Google OAuth.

### AI & Core Logic
- **LangChain**: The core framework used to orchestrate AI models and create Agents.
- **LLMs**: Google (`gemini-2.5-flash-lite`) and Mistral AI (`mistral-small-latest`).
- **Tavily API**: Integrated as a tool inside LangChain agent. It searches the internet live when a user asks for "latest news", "today's data", etc.
- **RAG (Retrieval-Augmented Generation)**:
  - **Parsers Integration**: Uses `pdf-parse`, `tesseract.js` (OCR for images), and `mammoth` (for word docs) to extract text from files uploaded by users.
  - **Pinecone Vector Database**: Extracted text is converted into vectors and stored here to give the AI context about user's files without needing to paste the whole document.
- **ImageKit**: Cloud storage for handling and hosting uploaded files and images.

---

## ⚙️ How Everything Works (The Flow)

### 1. User Input & Chat Interface (`frontend`)
When a user types a message in the `ChatInput` component:
- They can optionally attach files (which immediately upload to ImageKit).
- They can select search parameters like **Depth** (Basic, Advanced) and **Topic** (General, News, Finance).
- The chat request represents a mix of HTTP and WebSockets. WebSockets allow the response to be streamed live instead of waiting for the full response to generate.

### 2. Live Web Searching & Agents (`backend/ai.service.js`)
When the backend receives the prompt:
- An AI **Agent** is initialized with a System Prompt instructing it to be helpful, aware of the current date/time, and utilize external tools if necessary.
- **Dynamic Search Tool:** The agent is equipped with a `searchInternet` tool (powered by Tavily). If the user asks "What is the stock price of Apple today?", the LangChain agent automatically decides to trigger this tool, scrapes the latest data, and generates a formulated response based on it.

### 3. File Context & Memory (RAG Flow)
If the user previously uploaded documents:
- The backend takes the user's latest message and queries **Pinecone** (`vector.service.js` using `queryRelevantContext`).
- Pinecone does a "similarity search" to find the most relevant chunks of text from the user's uploaded files.
- This matched text is silently injected into the AI's system prompt as "BACKGROUND KNOWLEDGE". 
- Thus, when the user asks "Summarize page 3 of my PDF", the AI successfully answers because it has the context.

### 4. Real-time Response Streaming
- The LangChain model outputs data as a stream (`streamMode: "messages"`).
- A `for await` loop handles incoming chunks from the AI model in `ai.service.js`.
- During this generation, chunks are passed through a callback (`onChunk`) which emits them to the frontend via **Socket.io**.
- On the frontend side, Redux catches these socket events and updates the UI character-by-character, creating the typewriter effect often seen in ChatGPT.

### 5. Chat Auto-Titling
After a conversation starts, a side function (`generateChatTitle` using the Mistral model) briefly reads the user's first prompt and generates a short 2-4 word title. This is saved to MongoDB so the user's historical chat sidebar looks organized.

---

## 📌 Summary of Features
1. **Real-time Streaming AI Chat** (WebSocket integration).
2. **Dynamic internet Searching** (Tavily + Langchain AI Agents).
3. **Multi-modal Inputs** (Text, Images, Documents).
4. **Context-Aware Documents Chat** (RAG memory pipeline via Pinecone).
5. **Modern, responsive UI** with categorization and focus topics (News, Finance).
6. **Robust Auth** system with JWT & OAuth.
