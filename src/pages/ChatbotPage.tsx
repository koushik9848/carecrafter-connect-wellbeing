
import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import ChatbotInterface from "../components/ChatbotInterface";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const ChatbotPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if ageGroup was passed through location state
  const ageGroup = location.state?.ageGroup as 'youth' | 'adult' | 'senior';
  
  // If no ageGroup was provided, redirect to home
  if (!ageGroup) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">
            {ageGroup === 'youth' ? 'Youth Wellness Hub' : 
             ageGroup === 'adult' ? 'Adult Health Guide' : 
             'Senior Care Corner'}
          </h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-blue-800 text-blue-800 hover:bg-blue-50"
          >
            Back to Home
          </Button>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg h-[70vh] overflow-hidden">
          <ChatbotInterface ageGroup={ageGroup} />
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
