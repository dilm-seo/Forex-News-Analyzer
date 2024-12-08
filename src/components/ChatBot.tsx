import React, { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Send, Bot, Loader2 } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { Message, MessageType } from '../types';
import { ChatMessage } from './ChatMessage';
import { SuggestedQuestions } from './SuggestedQuestions';
import { OpenAIService } from '../services/openai';
import { FeedService } from '../services/feed';
import { generateFollowUpQuestions } from '../utils/questionGenerator';

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { settings } = useSettingsStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, followUpQuestions]);

  const addMessage = (content: string, type: MessageType) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date().toISOString()
    }]);
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || !settings.apiKey || isLoading) return;

    setInput('');
    addMessage(messageText.trim(), 'user');
    setIsLoading(true);
    setFollowUpQuestions([]);

    try {
      const news = await FeedService.fetchFeed();
      const latestNews = news.slice(0, 3).map(item => 
        `${item.title}\n${item.description}\n`
      ).join('\n---\n');

      const context = `Voici les dernières actualités forex:\n\n${latestNews}\n\nQuestion de l'utilisateur: ${messageText}`;

      const response = await OpenAIService.analyzeContent(context, {
        ...settings,
        prompt: `Tu es un expert en trading forex. Analyse ces actualités et réponds à la question de l'utilisateur. 
        Fournis une réponse structurée avec:
        - Impact sur le marché (note /10)
        - Paires de devises concernées
        - Direction recommandée (achat/vente)
        - 2-3 raisons principales
        Sois précis et concis.`
      });

      addMessage(response, 'assistant');
      
      // Générer des questions de suivi basées sur la réponse
      const newFollowUpQuestions = generateFollowUpQuestions(response);
      setFollowUpQuestions(newFollowUpQuestions);

    } catch (error) {
      addMessage("Désolé, une erreur est survenue lors de l'analyse.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSelect = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Assistant Forex</h2>
          <p className="text-sm text-gray-500">Analysez les opportunités en temps réel</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {messages.length > 0 && !isLoading && followUpQuestions.length > 0 && (
          <div className="mt-4">
            <SuggestedQuestions 
              questions={followUpQuestions}
              onSelect={handleQuestionSelect}
            />
          </div>
        )}
        
        {messages.length === 0 && (
          <div className="space-y-6 text-center text-gray-500 mt-8">
            <div>
              <p>👋 Bonjour! Je suis votre assistant forex.</p>
              <p className="mt-2">Je peux vous aider à analyser les dernières actualités et identifier des opportunités de trading.</p>
            </div>
            <SuggestedQuestions 
              questions={[
                "Quelles sont les principales opportunités de trading aujourd'hui ?",
                "Y a-t-il des événements majeurs qui impactent l'EUR/USD ?",
                "Quel est le sentiment général sur le marché forex ?",
                "Quelles paires de devises montrent le plus de volatilité ?",
                "Y a-t-il des tendances importantes à surveiller ?"
              ]}
              onSelect={handleQuestionSelect}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }} 
        className="p-4 border-t border-gray-100"
      >
        <div className="flex gap-2">
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question sur les actualités forex..."
            className="flex-1 resize-none max-h-32 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxRows={4}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}