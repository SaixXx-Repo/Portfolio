import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMascot } from './ChatMascot';
import { ChatAvatar } from './ChatAvatar';
import { useAnalytics } from '../../hooks/useAnalytics';
import './ChatWidget.css';

import { personalInfo, projects, skills, workExperience, certificates, socialLinks } from '../../data/projects';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `
You are an AI assistant for ${personalInfo.name}'s portfolio website. 
Here is detailed information about Max (Maximilian Funk):

Personal Info:
${JSON.stringify(personalInfo, null, 2)}

My Work Experience:
${JSON.stringify(workExperience, null, 2)}

My Projects:
${JSON.stringify(projects, null, 2)}

My Skills:
${JSON.stringify(skills, null, 2)}

My Certificates:
${JSON.stringify(certificates, null, 2)}

Social Links:
${JSON.stringify(socialLinks, null, 2)}

Instructions:
1. Answer questions about Max's experience, skills, and projects using the data above.
2. Be friendly, professional, and concise.
3. If asked about contact info, provide his email (${personalInfo.email}) or social links.
4. If asked about something not in the data, say you don't have that specific information but can tell them about his known projects and experience.
5. Emphasize his expertise in Android (Kotlin, Jetpack Compose) and React/Frontend development.
`;

const SUGGESTED_QUESTIONS = [
  "What are your main skills?",
  "Tell me about your projects",
  "What's your experience with Android?",
  "How can I contact you?",
];

export const ChatWidget: React.FC = () => {
  const { trackChatMessage, resetStats } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! 👋 I'm Max's AI assistant. Ask me anything about his skills, projects, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showAttention, setShowAttention] = useState(false);

  // Rate limiting - minimum 2 seconds between messages
  const RATE_LIMIT_MS = 2000;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setShowAttention(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowAttention(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    if (content.trim() === '!RESET') {
      resetStats();
      setMessages(prev => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: 'user',
          content: content.trim(),
          timestamp: new Date(),
        },
        {
          id: `system-${Date.now()}`,
          role: 'assistant',
          content: "Local analytics dashboard has been reset. Note: Vercel Analytics data cannot be reset from the client.",
          timestamp: new Date(),
        }
      ]);
      setInputValue('');
      return;
    }

    // Rate limiting check
    const now = Date.now();
    if (now - lastMessageTime < RATE_LIMIT_MS) {
      return;
    }
    setLastMessageTime(now);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    trackChatMessage();

    try {
      // Filter out the welcome message and map only role/content
      const apiMessages = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));

      // Add user's new message
      apiMessages.push({ role: userMessage.role, content: userMessage.content });

      // Prepend system prompt
      const payloadMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...apiMessages
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: payloadMessages,
          model: 'gemini-2.5-flash',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API request failed with status:', response.status);
        console.error('Error details:', errorText);
        throw new Error(`Failed to get response: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again later or contact Max directly at maxchfunk@gmail.com",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Attention Mascot */}
      <AnimatePresence>
        {showAttention && !isOpen && (
          <ChatMascot />
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        className={`chat-widget__toggle ${isOpen ? 'chat-widget__toggle--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={showAttention && !isOpen ? {
          y: [0, -10, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }
        } : {}}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Pulse animation when closed */}
        {!isOpen && !showAttention && (
          <span className="chat-widget__pulse" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-widget__window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="chat-widget__header">
              <div className="chat-widget__header-info">
                <div className="chat-widget__avatar">
                  <ChatAvatar />
                </div>
                <div className="chat-widget__header-text">
                  <h3>Max's AI Assistant</h3>
                  <span className="chat-widget__status">
                    <span className="chat-widget__status-dot" />
                    Online
                  </span>
                </div>
              </div>
              <button
                className="chat-widget__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="chat-widget__messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`chat-widget__message chat-widget__message--${message.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.role === 'assistant' && (
                    <div className="chat-widget__message-avatar">
                      <ChatAvatar />
                    </div>
                  )}
                  <div className="chat-widget__message-content">
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  className="chat-widget__message chat-widget__message--assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="chat-widget__message-avatar">
                    <ChatAvatar />
                  </div>
                  <div className="chat-widget__message-content chat-widget__typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="chat-widget__suggestions">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    className="chat-widget__suggestion"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form className="chat-widget__input-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="chat-widget__input"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="chat-widget__send"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

