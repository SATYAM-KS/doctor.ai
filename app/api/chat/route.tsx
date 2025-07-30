import { NextRequest, NextResponse } from "next/server";
import { openai, generateFallbackResponse } from "@/shared/OpenAiModel";

export async function POST(request: NextRequest) {
  try {
    const { messages, doctorPrompt } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 });
    }
    const systemMessage = {
      role: "system",
      content: doctorPrompt || "You are a helpful AI medical assistant. Provide concise, accurate medical information. Remember that you are not a replacement for professional medical advice, diagnosis, or treatment."
    };
 
    const apiMessages = [
      systemMessage,
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    try {

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 500
      });


      const assistantResponse = response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

      return NextResponse.json({
        content: assistantResponse
      });
    } catch (openaiError) {
      console.error("Error calling OpenAI API:", openaiError);

        
      const fallbackResponse = generateFallbackResponse("I'm having trouble understanding your request.");
      return NextResponse.json({
        content: fallbackResponse
      });
    }
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 });
  }
} 