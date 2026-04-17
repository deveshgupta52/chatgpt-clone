import { tavily as Tavily } from "@tavily/core";


export const searchInternet=async({query, searchDepth = "basic", topic = "general"})=>{
const tavily = Tavily({ apiKey: process.env.TAVILY_API_KEY });
const response = await tavily.search(query,{
    max_results: 5,
    search_depth: searchDepth,
    topic: topic
});

return JSON.stringify(response);
}

