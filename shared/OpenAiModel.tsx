import OpenAI from "openai"


export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY || "",
  dangerouslyAllowBrowser: false,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "AI Doctor Voice Agent"
  },
  defaultQuery: {
    timeout: "20000" 
  }
})


export const generateFallbackResponse = (userMessage: string): string => {
  const fallbackResponses = [
    "I'm sorry, I'm having trouble connecting to my knowledge base right now. Could you please repeat your question?",
    "I apologize, but I'm experiencing some technical difficulties. Could we try again in a moment?",
    "I seem to be having trouble processing your request. Could you rephrase your question?",
    "I apologize for the inconvenience, but I'm currently unable to access my medical knowledge database. Please try agaishortly."
  ];

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}