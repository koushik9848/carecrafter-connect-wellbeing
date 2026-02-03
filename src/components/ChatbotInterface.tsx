import React, { useState, useRef, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { generateResponse } from "../data/chatbotData";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotInterfaceProps {
  ageGroup: 'youth' | 'adult' | 'senior';
  onMessageSend?: (message: string) => void;
  onResponseReceived?: (response: string) => void;
  initialMessages?: Message[];
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ 
  ageGroup, 
  onMessageSend, 
  onResponseReceived,
  initialMessages = []
}) => {
  const getWelcomeMessage = (): Message => ({
    id: 0,
    text: "Hello! I'm your healthcare assistant. Please describe your symptoms or health concerns, and I'll do my best to help you.",
    isUser: false,
    timestamp: new Date()
  });

  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0 
      ? initialMessages 
      : [getWelcomeMessage()]
  );

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Update messages when initialMessages changes (switching conversations)
  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    } else {
      setMessages([getWelcomeMessage()]);
    }
  }, [initialMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when component mounts or conversation changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [initialMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    onMessageSend?.(inputValue);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate AI response with slight delay to simulate processing
    setTimeout(() => {
      const aiResponse = generateResponse(inputValue, ageGroup);
      
      const newAiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      onResponseReceived?.(aiResponse);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 p-4">
        <h2 className="text-white text-xl font-semibold">
          CareCrafter Health Assistant
          <span className="text-sm ml-2 font-normal opacity-80">
            ({ageGroup === 'youth' ? 'Youth' : ageGroup === 'adult' ? 'Adult' : 'Senior'} Care)
          </span>
        </h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <div className="text-sm whitespace-pre-line">{message.text}</div>
                <div className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-2 max-w-3xl mx-auto">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-grow"
          />
          <Button type="submit" className="bg-blue-800 hover:bg-blue-700">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotInterface;
