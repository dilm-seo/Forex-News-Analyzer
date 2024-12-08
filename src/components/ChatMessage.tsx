import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
        ${isUser ? 'bg-blue-100' : isError ? 'bg-red-100' : 'bg-gray-100'}`}>
        {isUser ? (
          <User className="w-5 h-5 text-blue-600" />
        ) : (
          <Bot className="w-5 h-5 text-gray-600" />
        )}
      </div>
      
      <div className={`flex-1 rounded-lg p-3 ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : isError 
            ? 'bg-red-50 text-red-600'
            : 'bg-gray-100 text-gray-900'
      }`}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          className="prose prose-sm max-w-none"
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}