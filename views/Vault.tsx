import React, { useState } from 'react';
import { HardDrive, FileText, Image as ImageIcon, Key, MoreHorizontal, Folder, Save, ArrowLeft } from 'lucide-react';
import { FileItem } from '../types';

const MOCK_FILES: FileItem[] = [
  { id: '1', name: 'Manifesto_v1.txt', type: 'DOC', size: '12 KB', lastModified: '2h ago', content: 'The digital frontier is not a place, it is a state of mind...' },
  { id: '2', name: 'Server_Keys.pem', type: 'KEY', size: '4 KB', lastModified: '1d ago', content: '-----BEGIN RSA PRIVATE KEY-----' },
  { id: '3', name: 'Evidence_001.jpg', type: 'IMG', size: '2.4 MB', lastModified: '3d ago' },
  { id: '4', name: 'Operation_Sun.doc', type: 'DOC', size: '154 KB', lastModified: '1w ago', content: 'Target: The main grid mainframe. \nObjective: Deploy the payload.' },
];

const Vault: React.FC = () => {
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [editorContent, setEditorContent] = useState('');

  const openFile = (file: FileItem) => {
    if (file.type === 'DOC' || file.type === 'KEY') {
      setActiveFile(file);
      setEditorContent(file.content || '');
    } else {
      alert("Encryption format not supported in web viewer.");
    }
  };

  const closeFile = () => {
    setActiveFile(null);
    setEditorContent('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {activeFile ? (
        /* Editor Mode */
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b-2 border-black flex items-center justify-between px-6 bg-gray-50">
            <div className="flex items-center gap-4">
              <button onClick={closeFile} className="border-2 border-black p-2 bg-white shadow-neo-sm hover:shadow-none hover:translate-y-0.5 transition-all rounded">
                <ArrowLeft size={20} />
              </button>
              <div>
                <div className="font-black text-lg">{activeFile.name}</div>
                <div className="text-xs font-mono bg-neo-accent px-1 inline-block border border-black">EDIT MODE</div>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-black text-white px-6 py-2 border-2 border-black shadow-neo-sm hover:shadow-none hover:translate-y-0.5 transition-all font-bold rounded">
              <Save size={18} /> SAVE
            </button>
          </div>
          <div className="flex-1 p-8 bg-gray-50">
            <div className="h-full bg-white border-2 border-black shadow-neo rounded-lg p-6 relative">
                <textarea 
                className="w-full h-full bg-transparent font-mono outline-none resize-none leading-relaxed text-sm z-10 relative"
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                spellCheck={false}
                />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5" 
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2rem' }}>
                </div>
            </div>
          </div>
        </div>
      ) : (
        /* Browser Mode */
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <header className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
            <h2 className="text-3xl font-black flex items-center gap-3 uppercase">
              <HardDrive className="text-black" size={32} /> The Vault
            </h2>
            <div className="flex gap-4 font-mono font-bold text-xs">
              <span className="bg-neo-primary text-white px-2 py-1 border-2 border-black shadow-neo-sm">USED: 42.5 GB</span>
              <span className="bg-white px-2 py-1 border-2 border-black shadow-neo-sm">TOTAL: 10 TB</span>
            </div>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Folder Mock */}
            <div className="bg-neo-accent border-2 border-black p-4 rounded-lg flex flex-col items-center justify-center gap-2 shadow-neo hover:-translate-y-1 transition-all cursor-pointer aspect-square">
              <Folder size={48} className="text-black fill-white" />
              <span className="font-bold border-b-2 border-black">Shared Drops</span>
            </div>

            {MOCK_FILES.map(file => (
              <div 
                key={file.id} 
                onClick={() => openFile(file)}
                className="bg-white border-2 border-black p-4 rounded-lg flex flex-col justify-between shadow-neo hover:-translate-y-1 transition-all cursor-pointer aspect-square relative group"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={20} />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  {file.type === 'DOC' && <FileText size={48} className="text-neo-primary" strokeWidth={1.5} />}
                  {file.type === 'IMG' && <ImageIcon size={48} className="text-neo-secondary" strokeWidth={1.5} />}
                  {file.type === 'KEY' && <Key size={48} className="text-neo-success" strokeWidth={1.5} />}
                </div>
                <div className="border-t-2 border-gray-100 pt-2 mt-2">
                  <div className="font-bold text-sm truncate">{file.name}</div>
                  <div className="text-[10px] font-mono text-gray-500">{file.size}</div>
                </div>
              </div>
            ))}
            
            {/* Add New Placeholder */}
             <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-black hover:bg-white transition-all cursor-pointer aspect-square text-gray-400 hover:text-black">
              <div className="text-4xl font-light">+</div>
              <span className="font-bold text-sm">Upload</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vault;