'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your Axiom Store AI Assistant. I can help you analyze sales data, manage inventory, or optimize your store. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const lowerInput = userMsg.content.toLowerCase();
      let aiResponse = "I've analyzed the data. Store performance is stable, but let me know if you want to dive deeper into specific metrics.";
      
      if (lowerInput.includes('sales') || lowerInput.includes('revenue')) {
        aiResponse = "Based on the latest data, revenue is up 12% this week compared to last week. The 'Italian Wool Coat' is driving the most conversions.";
      } else if (lowerInput.includes('inventory') || lowerInput.includes('stock')) {
        aiResponse = "You currently have 3 items running low on stock. I recommend restocking the 'Camel Wool Flat Cap' (Size M) as it's highly requested.";
      } else if (lowerInput.includes('customer') || lowerInput.includes('vip')) {
        aiResponse = "You have 42 new VIP customers this month. Sending them a targeted campaign could increase retention by 15%.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-neutral-900 text-white rounded-full shadow-lg hover:scale-105 transition-transform ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" className="animate-[spin_4s_linear_infinite]" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-slide-up" style={{ height: '500px', maxHeight: 'calc(100vh - 48px)' }}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-neutral-900 text-white">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
              <h3 className="text-sm font-medium tracking-wide">Axiom AI</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-neutral-900 text-white rounded-br-none' 
                      : 'bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 p-3 text-sm rounded-lg rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
            <form onSubmit={handleSubmit} className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your store..."
                className="w-full bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="absolute right-1.5 top-1.5 p-1.5 bg-neutral-900 text-white rounded-full disabled:opacity-50 hover:bg-neutral-800 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
