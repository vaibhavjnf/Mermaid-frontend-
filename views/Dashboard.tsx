import React from 'react';
import { Activity, Shield, Wifi, Cpu, Lock, EyeOff, Zap } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', load: 40, privacy: 90 },
  { name: '04:00', load: 30, privacy: 92 },
  { name: '08:00', load: 60, privacy: 88 },
  { name: '12:00', load: 80, privacy: 85 },
  { name: '16:00', load: 50, privacy: 95 },
  { name: '20:00', load: 45, privacy: 98 },
  { name: '24:00', load: 35, privacy: 99 },
];

const StatCard = ({ icon: Icon, label, value, colorClass }: any) => (
  <div className={`neo-card p-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-200 rounded-md`}>
    <div className={`absolute top-0 right-0 p-2 border-l-2 border-b-2 border-black bg-white z-10 ${colorClass}`}>
      <Icon size={24} className="text-black" />
    </div>
    <div className="relative z-0 pt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono font-bold uppercase border-b-2 border-black">{label}</span>
      </div>
      <div className="text-3xl font-black text-black">{value}</div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-8 bg-gray-50/50">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-black pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black flex items-center gap-3">
            System Status <span className="text-xs bg-neo-success text-black border-2 border-black px-2 py-1 shadow-neo-sm">ONLINE</span>
          </h1>
          <p className="font-mono text-sm mt-2 text-gray-600">ID: {MOCK_USER.id} // <span className="bg-black text-white px-1">ENCRYPTED</span></p>
        </div>
        
        <div className="flex items-center gap-4 bg-white border-2 border-black p-2 shadow-neo-sm rounded-full pr-6">
           <div className="h-12 w-12 rounded-full border-2 border-black overflow-hidden">
             <img src={MOCK_USER.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
           </div>
           <div>
             <div className="text-xs font-bold uppercase text-gray-500">Wallet</div>
             <div className="text-xl font-black">{MOCK_USER.cryptoBalance} ETH</div>
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Shield} label="Privacy Score" value={`${MOCK_USER.trustScore}%`} colorClass="bg-neo-success" />
        <StatCard icon={Wifi} label="Network Latency" value="12ms" colorClass="bg-neo-primary" />
        <StatCard icon={Cpu} label="Node Load" value="34%" colorClass="bg-neo-accent" />
        <StatCard icon={EyeOff} label="Trackers Blocked" value="14k" colorClass="bg-neo-secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 neo-card p-6 rounded-md">
          <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
            <h3 className="text-xl font-bold uppercase flex items-center gap-2">
              <Activity size={24} />
              Traffic Analysis
            </h3>
            <div className="flex gap-2">
               <button className="border-2 border-black px-3 py-1 text-xs font-bold bg-neo-primary text-white shadow-neo-sm hover:translate-y-0.5 hover:shadow-none transition-all">24H</button>
               <button className="border-2 border-black px-3 py-1 text-xs font-bold bg-white hover:bg-gray-100 transition-all">7D</button>
            </div>
          </div>
          <div className="h-64 font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrivacy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#000" tick={{fill: '#000'}} axisLine={{stroke: '#000', strokeWidth: 2}} />
                <YAxis stroke="#000" tick={{fill: '#000'}} axisLine={{stroke: '#000', strokeWidth: 2}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', boxShadow: '4px 4px 0px 0px #000', borderRadius: '0px' }} 
                  itemStyle={{ color: '#000', fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="privacy" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPrivacy)" />
                <Area type="monotone" dataKey="load" stroke="#000" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="neo-card p-0 overflow-hidden rounded-md flex flex-col">
          <div className="bg-neo-accent border-b-2 border-black p-4 flex justify-between items-center">
             <h3 className="text-xl font-bold uppercase flex items-center gap-2">
              <Zap size={24} /> Alerts
            </h3>
            <div className="bg-black text-white text-xs font-mono px-2 py-0.5 rounded-full">4 New</div>
          </div>
          <div className="divide-y-2 divide-black overflow-y-auto flex-1 bg-white">
            {[
              { title: "Unauthorized Ping", time: "02m", level: "Low", bg: "bg-yellow-100" },
              { title: "ISP Probe Detected", time: "15m", level: "High", bg: "bg-red-100" },
              { title: "Key Rotation", time: "01h", level: "Info", bg: "bg-blue-100" },
              { title: "Node Discovered", time: "03h", level: "Info", bg: "bg-green-100" },
              { title: "Sync Complete", time: "05h", level: "Info", bg: "bg-gray-100" },
            ].map((alert, i) => (
              <div key={i} className={`p-4 hover:bg-black hover:text-white transition-colors cursor-pointer group`}>
                <div className="flex justify-between items-start">
                  <div className="font-bold">{alert.title}</div>
                  <span className={`text-[10px] font-mono border-2 border-black px-1 ${alert.level === 'High' ? 'bg-neo-danger text-white' : 'bg-white text-black group-hover:text-black'}`}>
                    {alert.level}
                  </span>
                </div>
                <div className="text-xs font-mono mt-1 opacity-60 group-hover:opacity-100">{alert.time} ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;