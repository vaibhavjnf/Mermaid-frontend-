import React, { useState } from 'react';
import { Mail as MailIcon, Unlock, Lock, Trash2, Archive, Reply, RefreshCw, X } from 'lucide-react';
import { EncryptedMail } from '../types';
import { generateEmailContent } from '../services/geminiService';

const MOCK_MAILS: EncryptedMail[] = [
  { id: '1', sender: 'Morpheus', subject: 'The construct is loading', timestamp: '10:42 AM', encryptedContent: 'k3j4h2k3j4h2...', isRead: false, securityLevel: 'High' },
  { id: '2', sender: 'Ghost_Shell', subject: 'Project 2501 coordinates', timestamp: 'Yesterday', encryptedContent: 'x9s8d7f6...', isRead: true, securityLevel: 'Critical' },
  { id: '3', sender: 'DAO_Admin', subject: 'Vote required: Protocol upgrade', timestamp: '2 days ago', encryptedContent: 'a1s2d3...', isRead: true, securityLevel: 'Medium' },
];

const Mail: React.FC = () => {
  const [selectedMail, setSelectedMail] = useState<EncryptedMail | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptedText, setDecryptedText] = useState<string>('');

  const handleSelectMail = async (mail: EncryptedMail) => {
    setSelectedMail(mail);
    setDecryptedText(''); 
    
    // Auto decrypt simulation
    setIsDecrypting(true);
    const content = await generateEmailContent(mail.subject);
    setDecryptedText(content);
    setIsDecrypting(false);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Mail List */}
      <div className={`w-full md:w-96 border-r-2 border-black flex flex-col ${selectedMail ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b-2 border-black bg-neo-accent flex justify-between items-center">
          <h2 className="text-xl font-black flex items-center gap-2 uppercase">
            Inbox <span className="text-sm bg-black text-white px-2 py-0.5 rounded-full">{MOCK_MAILS.length}</span>
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_MAILS.map((mail) => (
            <div 
              key={mail.id}
              onClick={() => handleSelectMail(mail)}
              className={`p-4 border-b-2 border-black cursor-pointer transition-all hover:bg-black hover:text-white group ${selectedMail?.id === mail.id ? 'bg-black text-white' : 'bg-white'}`}
            >
              <div className="flex justify-between mb-1 items-center">
                <span className={`font-mono text-sm font-bold ${!mail.isRead ? 'text-neo-primary group-hover:text-neo-primary' : 'text-gray-500 group-hover:text-gray-400'}`}>
                  {mail.sender}
                </span>
                <span className="text-xs font-mono">{mail.timestamp}</span>
              </div>
              <div className="font-bold truncate mb-1">{mail.subject}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`border-2 px-1 text-[10px] font-bold uppercase ${mail.securityLevel === 'Critical' ? 'border-red-500 text-red-500 bg-red-50' : 'border-green-500 text-green-500 bg-green-50'}`}>
                   {mail.securityLevel} SEC
                </div>
                <Lock size={12} className="opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mail Detail */}
      <div className={`flex-1 flex flex-col bg-gray-50 ${!selectedMail ? 'hidden md:flex' : 'flex'}`}>
        {selectedMail ? (
          <>
            {/* Toolbar */}
            <div className="p-4 border-b-2 border-black bg-white flex items-center justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedMail(null)} 
                  className="md:hidden neo-button border-2 border-black p-2 rounded bg-white hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
                <button className="neo-button border-2 border-black p-2 rounded bg-white hover:bg-neo-danger hover:text-white"><Trash2 size={18} /></button>
                <button className="neo-button border-2 border-black p-2 rounded bg-white hover:bg-neo-primary hover:text-white"><Archive size={18} /></button>
                <button className="neo-button border-2 border-black p-2 rounded bg-white hover:bg-neo-secondary hover:text-white"><Reply size={18} /></button>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold font-mono bg-neo-success px-2 py-1 border-2 border-black rounded shadow-neo-sm">
                <Unlock size={14} />
                DECRYPTED
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="bg-white border-2 border-black shadow-neo rounded-lg p-8 min-h-[500px] relative">
                  {/* Letter Header */}
                  <div className="border-b-2 border-dashed border-black pb-6 mb-6">
                    <h1 className="text-3xl font-black mb-4">{selectedMail.subject}</h1>
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 border-2 border-black rounded-full flex items-center justify-center text-xl font-bold bg-neo-accent">
                        {selectedMail.sender[0]}
                        </div>
                        <div>
                        <div className="font-bold text-lg">{selectedMail.sender}</div>
                        <div className="font-mono text-sm text-gray-500">&lt;{selectedMail.sender.toLowerCase()}@mesh.net&gt;</div>
                        <div className="font-mono text-xs mt-1 bg-gray-100 inline-block px-1">To: me@aether.os</div>
                        </div>
                    </div>
                  </div>

                  {/* Body */}
                  {isDecrypting ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                     <RefreshCw className="animate-spin text-black" size={48} />
                     <div className="font-mono text-lg font-bold bg-black text-white px-4 py-1">
                       DECRYPTING...
                     </div>
                  </div>
                  ) : (
                  <div className="prose max-w-none font-mono text-sm leading-loose">
                     <p className="p-4 bg-gray-100 border-l-4 border-black mb-6 italic text-gray-600">
                       // BEGIN TRANSMISSION
                     </p>
                     <p className="text-lg">
                       {decryptedText}
                     </p>
                     <div className="mt-12 pt-6 border-t-2 border-black flex justify-between items-center opacity-70">
                       <div className="flex gap-2">
                           <div className="h-2 w-2 bg-black rounded-full"></div>
                           <div className="h-2 w-2 bg-black rounded-full"></div>
                           <div className="h-2 w-2 bg-black rounded-full"></div>
                       </div>
                       <div className="font-mono text-xs">PGP: VERIFIED</div>
                     </div>
                  </div>
                  )}
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-4 border-double border-neo-danger opacity-20 rounded-full flex items-center justify-center -rotate-12 font-black text-neo-danger">
                      CONF
                  </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <div className="border-2 border-gray-300 p-8 rounded-full mb-4 bg-white">
                 <Lock size={64} className="opacity-20" />
            </div>
            <p className="font-mono font-bold text-lg">SELECT ENCRYPTED DATA</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mail;