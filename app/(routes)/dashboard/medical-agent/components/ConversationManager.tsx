"use client"
import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

interface ConversationManagerProps {
  isCallActive: boolean;
  doctorPrompt: string;
  onNewMessage: (message: Message) => void;
  onError: (error: string) => void;
}

export interface ConversationManagerRef {
  handleTranscript: (transcript: string, isFinal: boolean) => void;
}

const ConversationManager = forwardRef<ConversationManagerRef, ConversationManagerProps>(
  ({ isCallActive, doctorPrompt, onNewMessage, onError }, ref) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const lastTranscriptRef = useRef<string>("");
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const processingTranscriptRef = useRef<boolean>(false);

    useEffect(() => {
      if (isCallActive) {
        const initialMessage = {
          role: 'assistant' as const,
          content: "Hello, I'm your AI medical assistant. Can you tell me Your Name, age and what is your problem?",
          timestamp: Date.now()
        };

        setMessages([initialMessage]);
        onNewMessage(initialMessage);
      } else {
        setMessages([]);
        lastTranscriptRef.current = "";

        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      }
    }, [isCallActive, onNewMessage]);

    const handleTranscript = (transcript: string, isFinal: boolean) => {
      if (!transcript || transcript.trim() === "" || processingTranscriptRef.current) return;

      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }

      if (isFinal) {
        processTranscript(transcript);
      } else {
        silenceTimeoutRef.current = setTimeout(() => {
          if (transcript && transcript.trim() !== "") {
            console.log("Silence detected, processing transcript:", transcript);
            processTranscript(transcript);
          }
        }, 2000);       
      }
    };

    const processTranscript = async (transcript: string) => {
      if (transcript.trim() === lastTranscriptRef.current.trim() || processingTranscriptRef.current) return;

      processingTranscriptRef.current = true;
      lastTranscriptRef.current = transcript;

      const userMessage: Message = {
        role: 'user',
        content: transcript,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, userMessage]);
      onNewMessage(userMessage);

      try {
        const conversationHistory = messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));

        conversationHistory.push({
          role: 'user',
          content: transcript
        });


        const response = await axios.post('/api/chat', {
          messages: conversationHistory,
          doctorPrompt: doctorPrompt || "You are a helpful AI medical assistant."
        });

        if (response.data && response.data.content) {
          const assistantMessage: Message = {
            role: 'assistant',
            content: response.data.content,
            timestamp: Date.now()
          };


          setMessages(prev => [...prev, assistantMessage]);
          onNewMessage(assistantMessage);
        }
      } catch (error) {
        console.error("Error sending to AI agent:", error);
        onError("Error communicating with AI. Please try again.");


        const fallbackMessage: Message = {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble processing your request. Could you please try again?",
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, fallbackMessage]);
        onNewMessage(fallbackMessage);
      } finally {
        processingTranscriptRef.current = false;
      }
    };


    useImperativeHandle(ref, () => ({
      handleTranscript
    }));

    return null; 
  }
);

ConversationManager.displayName = 'ConversationManager';

export default ConversationManager; 