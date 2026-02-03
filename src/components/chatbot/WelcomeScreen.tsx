import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: (suggestion?: string) => void;
  ageGroup: 'youth' | 'adult' | 'senior';
}

const SUGGESTED_QUESTIONS = {
  youth: [
    "I have a headache, what should I do?",
    "How can I improve my sleep?",
    "What are healthy snacks for school?",
    "I feel stressed about exams",
  ],
  adult: [
    "I have acidity, what are home remedies?",
    "What are the symptoms of diabetes?",
    "How to manage work stress?",
    "Best exercises for back pain",
  ],
  senior: [
    "What foods help with joint pain?",
    "How to manage high blood pressure?",
    "Tips for better memory",
    "Safe exercises for seniors",
  ],
};

export function WelcomeScreen({ onStartChat, ageGroup }: WelcomeScreenProps) {
  const suggestions = SUGGESTED_QUESTIONS[ageGroup];

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
        <MessageSquare className="h-8 w-8 text-blue-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">CareCrafter Health Assistant</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start a new conversation or select from your history. I'm here to help with your health questions and concerns.
      </p>

      <div className="w-full max-w-md space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Suggested Questions:</p>
        {suggestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left justify-start h-auto py-3 px-4"
            onClick={() => onStartChat(question)}
          >
            <span className="text-blue-600 mr-2">•</span>
            {question}
          </Button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-8 max-w-md">
        Note: This chatbot provides general guidance only and is not a substitute for professional medical advice.
      </p>
    </div>
  );
}
