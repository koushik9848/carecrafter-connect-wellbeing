
import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import ChatbotInterface from "../components/ChatbotInterface";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChatHistory } from "../components/ChatHistory";
import { useChatHistory } from "../hooks/useChatHistory";
import { toast } from "@/hooks/use-toast";

const ChatbotPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const ageGroup = location.state?.ageGroup as 'youth' | 'adult' | 'senior';
  
  if (!ageGroup) {
    return <Navigate to="/" replace />;
  }

  const { 
    sessions, 
    currentSession, 
    currentSessionId,
    createNewSession, 
    loadSession, 
    addMessageToSession 
  } = useChatHistory(ageGroup);

  useEffect(() => {
    if (!currentSession) {
      createNewSession();
    }
  }, []);

  const handleSelectSession = (sessionId: string) => {
    const session = loadSession(sessionId);
    if (session) {
      toast({
        title: "Chat session loaded",
        description: "Continuing from your previous conversation"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">
            {ageGroup === 'youth' ? 'Youth Wellness Hub' : 
             ageGroup === 'adult' ? 'Adult Health Guide' : 
             'Senior Care Corner'}
          </h1>
          <div className="flex items-center gap-4">
            <ChatHistory 
              sessions={sessions} 
              onSelectSession={handleSelectSession}
              currentSessionId={currentSessionId}
            />
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-blue-800 text-blue-800 hover:bg-blue-50"
            >
              Back to Home
            </Button>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg h-[70vh] overflow-hidden">
          <ChatbotInterface 
            ageGroup={ageGroup}
            initialMessages={currentSession?.messages || []}
            onMessageSend={(message) => {
              addMessageToSession({
                id: Date.now(),
                text: message,
                isUser: true
              });
            }}
            onResponseReceived={(response) => {
              addMessageToSession({
                id: Date.now(),
                text: response,
                isUser: false
              });
            }}
          />
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Note: This chatbot provides general guidance only and is not a substitute for professional medical advice.</p>
          <p>If you are experiencing a medical emergency, please call emergency services immediately.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
