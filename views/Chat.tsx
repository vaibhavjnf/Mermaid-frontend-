import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, Lock, MoreVertical, Paperclip } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateChatReply } from '../services/geminiService';

const CONTACTS = [
  { id: 'c1', name: 'Neo', status: 'online', avatar: 'N', color: 'bg-neo-primary' },
  { id: 'c2', name: 'Trinity', status: 'offline', avatar: 'T', color: 'bg-neo-secondary' },
  { id: 'c3', name: 'Morpheus', status: 'busy', avatar: 'M', color: 'bg-neo-accent' },
];

const Chat: React.FC = () => {
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'other', text: 'Is the line secure?', timestamp: new Date(), isEncrypted: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      timestamp: new Date(),
      isEncrypted: true
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    const history = messages.map(m => `${m.sender}: ${m.text}`);
    const responseText = await generateChatReply(history, newMsg.text);
    
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'other',
        text: responseText,
        timestamp: new Date(),
        isEncrypted: true
      };
      setMessages(prev => [...prev, replyMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-20 md:w-80 border-r-2 border-black flex flex-col bg-gray-50">
        <div className="p-4 border-b-2 border-black bg-white">
          <h2 className="text-xl font-black uppercase tracking-tight hidden md:block">Whisper</h2>
          <div className="md:hidden text-center font-bold">W</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`p-4 flex items-center gap-3 cursor-pointer border-b-2 border-gray-200 hover:bg-white hover:border-black transition-all ${activeContact.id === contact.id ? 'bg-white border-black border-l-4 shadow-[inset_4px_0px_0px_0px_#000]' : ''}`}
            >
              <div className="relative">
                <div className={`h-12 w-12 rounded-lg border-2 border-black flex items-center justify-center font-bold text-white text-lg ${contact.color}`}>
                  {contact.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 h-4 w-4 border-2 border-black ${
                  contact.status === 'online' ? 'bg-green-400' : 
                  contact.status === 'busy' ? 'bg-red-400' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="hidden md:block">
                <div className="font-bold text-black">{contact.name}</div>
                <div className="text-xs font-mono text-gray-500">ID: 8F3...22A</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="p-4 border-b-2 border-black flex justify-between items-center bg-white z-10 shadow-neo-sm">
          <div className="flex items-center gap-4">
             <div className={`h-10 w-10 border-2 border-black rounded flex items-center justify-center font-bold text-white shadow-neo-sm ${activeContact.color}`}>
                {activeContact.avatar}
             </div>
             <div>
               <div className="font-black text-lg uppercase">{activeContact.name}</div>
               <div className="text-xs bg-black text-white px-2 py-0.5 inline-block font-mono">
                 ENCRYPTED
               </div>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2 border-2 border-black rounded hover:bg-gray-200 transition-colors"><Phone size={20} /></button>
             <button className="p-2 border-2 border-black rounded hover:bg-gray-200 transition-colors"><Video size={20} /></button>
             <button className="p-2 border-2 border-transparent hover:border-black rounded transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8fafc]">
           {messages.map(msg => (
             <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[75%] p-4 border-2 border-black relative ${
                 msg.sender === 'me' 
                   ? 'bg-neo-primary text-white shadow-neo-sm rounded-lg rounded-br-none' 
                   : 'bg-white text-black shadow-neo-sm rounded-lg rounded-bl-none'
               }`}>
                 <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                 <div className="mt-2 text-[10px] font-mono opacity-80 flex justify-end gap-1 items-center border-t border-current pt-1">
                   {msg.isEncrypted && <Lock size={8} />}
                   {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                 </div>
               </div>
             </div>
           ))}
           {isTyping && (
             <div className="flex justify-start">
               <div className="bg-white border-2 border-black rounded-lg rounded-bl-none p-4 shadow-neo-sm flex gap-2">
                 <div className="h-2 w-2 bg-black animate-bounce"></div>
                 <div className="h-2 w-2 bg-black animate-bounce delay-75"></div>
                 <div className="h-2 w-2 bg-black animate-bounce delay-150"></div>
               </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t-2 border-black">
          <div className="flex gap-2">
            <button className="p-3 border-2 border-black bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type message..."
              className="flex-1 bg-white border-2 border-black px-4 py-3 outline-none focus:shadow-neo transition-all font-medium placeholder:text-gray-400 rounded"
            />
            <button 
              onClick={handleSend}
              className="bg-black text-white px-6 border-2 border-black hover:bg-gray-800 transition-colors shadow-neo-sm active:translate-y-1 active:shadow-none rounded font-bold"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;