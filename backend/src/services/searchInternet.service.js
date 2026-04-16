import { tavily as Tavily } from "@tavily/core";


export const searchInternet=async({query})=>{
const tavily = Tavily({ apiKey: process.env.TAVILY_API_KEY });
const response = await tavily.search(query,{
    max_results: 5,
    
});

return JSON.stringify(response);
}

