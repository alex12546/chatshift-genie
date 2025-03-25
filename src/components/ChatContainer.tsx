
import { useState, useRef, useEffect } from "react";
import { ChatMessage, MessageType } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: string;
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! How can I assist you today?",
      type: "ai",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI response
  const generateAIResponse = async (userMessage: string) => {
    setIsProcessing(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let response = "";
    
    // Simple response logic based on user input
    if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
      response = "Hello there! How can I help you today?";
    } else if (userMessage.toLowerCase().includes("help")) {
      response = "I'm here to help! What do you need assistance with?";
    } else if (userMessage.toLowerCase().includes("thank")) {
      response = "You're welcome! Is there anything else you'd like to know?";
    } else if (userMessage.toLowerCase().includes("bye")) {
      response = "Goodbye! Feel free to come back if you have more questions.";
    } else {
      response = "That's interesting. Can you tell me more about that?";
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: response,
        type: "ai",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    
    setIsProcessing(false);
  };

  const handleSend = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      type: "user" as MessageType,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    generateAIResponse(message);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            type={message.type}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
        
        {isProcessing && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground animate-pulse-slow">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
        )}
      </div>
      
      <ChatInput onSend={handleSend} disabled={isProcessing} />
    </div>
  );
}
