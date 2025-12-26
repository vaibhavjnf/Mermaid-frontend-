import React, { useEffect, useState } from 'react';
import { MapNode } from '../types';
import { generateMapNodes } from '../services/geminiService';
import { RefreshCw, Navigation, Wifi, ShieldAlert, MapPin } from 'lucide-react';
import { Tooltip, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Cell } from 'recharts';

const Maps: React.FC = () => {
  const [nodes, setNodes] = useState<MapNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNodes = async () => {
      setLoading(true);
      const rawNodes = await generateMapNodes();
      
      const formattedNodes = rawNodes.map((n, i) => ({
        ...n,
        id: `node-${i}`,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        z: Math.floor(Math.random() * 500)
      }));
      setNodes(formattedNodes);
      setLoading(false);
    };
    fetchNodes();
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border-2 border-black p-4 shadow-neo">
          <h4 className="font-black text-lg uppercase mb-1">{data.name}</h4>
          <div className="font-mono text-xs bg-gray-100 p-1 mb-2 inline-block">{data.type}</div>
          <div className={`text-xs px-2 py-1 font-bold border-2 border-black inline-block ${
            data.status === 'ACTIVE' ? 'bg-neo-success text-black' : 'bg-neo-danger text-white'
          }`}>
            {data.status}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-black flex items-center gap-3 uppercase">
            <div className="bg-neo-accent p-2 border-2 border-black shadow-neo-sm">
                <Navigation size={28} className="text-black" />
            </div>
            GhostMap
          </h2>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-white border-2 border-black p-3 shadow-neo hover:translate-y-1 hover:shadow-none transition-all active:bg-gray-100 rounded"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </header>

      <div className="flex-1 bg-white border-2 border-black shadow-neo relative overflow-hidden rounded-lg">
        {/* Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
               backgroundSize: '40px 40px',
             }}>
        </div>

        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
             <div className="animate-bounce mb-4">
               <MapPin size={64} className="text-neo-primary" />
             </div>
             <div className="font-mono text-lg font-bold bg-black text-white px-4 py-2 shadow-neo">SCANNING SECTOR...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis type="number" dataKey="x" name="Longitude" hide domain={[0, 100]} />
              <YAxis type="number" dataKey="y" name="Latitude" hide domain={[0, 100]} />
              <ZAxis type="number" dataKey="z" range={[100, 600]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#000', strokeWidth: 2 }} />
              <Scatter name="Nodes" data={nodes}>
                {nodes.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.status === 'ACTIVE' ? '#6366f1' : '#f87171'} 
                    stroke="#000"
                    strokeWidth={2}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        <div className="bg-white border-2 border-black px-4 py-2 shadow-neo-sm rounded flex items-center gap-3 whitespace-nowrap">
          <div className="h-4 w-4 rounded-full bg-neo-primary border-2 border-black"></div>
          <div className="font-bold text-sm">Active Relay</div>
        </div>
        <div className="bg-white border-2 border-black px-4 py-2 shadow-neo-sm rounded flex items-center gap-3 whitespace-nowrap">
          <div className="h-4 w-4 rounded-full bg-neo-danger border-2 border-black"></div>
          <div className="font-bold text-sm">Compromised</div>
        </div>
        <div className="bg-white border-2 border-black px-4 py-2 shadow-neo-sm rounded flex items-center gap-3 whitespace-nowrap">
          <ShieldAlert className="text-neo-accent" size={20} />
          <div className="font-bold text-sm">Surveillance: HIGH</div>
        </div>
      </div>
    </div>
  );
};

export default Maps;