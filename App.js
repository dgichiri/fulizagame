import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, TrendingUp, Users, ShoppingBag, Globe } from 'lucide-react';

const COLORS = ['#00f2ff', '#39ff14', '#bc13fe'];

const App = () => {
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(30); // Starting Confidence Index
  const [limit, setLimit] = useState(200);
  const [history, setHistory] = useState([{ name: 'Start', limit: 200, sales: 500 }]);
  const [username, setUsername] = useState("AlphaMerchant_254");

  const milestones = [
    { title: "First Fuliza Overdraft", limit: 200, desc: "Bridge stock gaps.", icon: <Zap /> },
    { title: "Steady Repayment", limit: 1500, desc: "Build credit trust.", icon: <TrendingUp /> },
    { title: "Fuliza Biashara", limit: 10000, desc: "Bulk inventory scale.", icon: <ShoppingBag /> },
    { title: "Business Scale", limit: 50000, desc: "Market leader status.", icon: <Globe /> }
  ];

  // Leaderboard Mock Data (Dynamics)
  const leaders = [
    { name: "PrimeWholesaler_Scale", limit: 50000, score: 98 },
    { name: "VelocityRetail_Elite", limit: 12000, score: 85 },
    { name: username, limit: limit, score: score, isUser: true },
    { name: "ApexTrader_254", limit: 1500, score: 62 }
  ].sort((a, b) => b.limit - a.limit);

  const handleRepay = () => {
    if (stage < milestones.length - 1) {
      const nextStage = stage + 1;
      const nextLimit = milestones[nextStage].limit;
      setStage(nextStage);
      setLimit(nextLimit);
      setScore(prev => Math.min(prev + 21.6, 95));
      setHistory([...history, { 
        name: milestones[nextStage].title, 
        limit: nextLimit, 
        sales: nextLimit * 2.4 
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090f] text-white p-4 font-mono overflow-x-hidden">
      {/* HUD Header */}
      <header className="border-b border-[#00f2ff] pb-4 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#00f2ff] tracking-tighter italic">FULIZA CREDIT JOURNEY</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Operator: {username}</p>
        </div>
        <div className="text-right">
          <div className="text-[#39ff14] text-xs font-bold animate-pulse">CASHFLOW VELOCITY: ACTIVE</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: The Path to Growth */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xs text-cyan-400 uppercase tracking-widest border-l-2 border-cyan-400 pl-2">The Path to Growth</h2>
          {milestones.map((m, i) => (
            <motion.div 
              key={i}
              animate={{ opacity: i <= stage ? 1 : 0.2, x: i <= stage ? 0 : -10 }}
              className={`p-4 border ${i === stage ? 'border-[#39ff14] bg-[#0c161d]' : 'border-slate-800'} rounded`}
            >
              <div className="flex justify-between text-xs font-bold">
                <span>{m.title}</span>
                <span>KSH {m.limit.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
          <button 
            onClick={handleRepay}
            className="w-full py-4 bg-transparent border-2 border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff] hover:text-black transition-all font-black text-sm"
          >
            SIMULATE REPAYMENT CYCLE >>
          </button>
        </div>

        {/* Center: Visceral Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0a0e14] p-6 border border-slate-800 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-[8px] text-slate-600">FINANCIAL HEALTH (LIVE)</div>
            <div className="flex flex-col items-center py-10">
              <motion.div 
                animate={{ rotate: (score * 1.8) - 90 }}
                className="w-1 h-24 bg-cyan-400 origin-bottom shadow-[0_0_15px_#00f2ff]" 
              />
              <h3 className="text-6xl font-black mt-4 text-[#00f2ff]">{Math.round(score)}%</h3>
              <p className="text-[10px] tracking-[0.5em] text-slate-400 uppercase">Confidence Index</p>
            </div>
          </div>

          <div className="bg-[#0a0e14] p-6 border border-slate-800 rounded-xl">
             <h3 className="text-[10px] text-slate-500 uppercase mb-4 tracking-widest">Growth Trend</h3>
             <ResponsiveContainer width="100%" height={180}>
                <LineChart data={history}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Line type="monotone" dataKey="limit" stroke="#00f2ff" strokeWidth={4} dot={{r:6, fill:'#00f2ff'}} />
                  <Line type="monotone" dataKey="sales" stroke="#bc13fe" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Leaderboard & Impact */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#0a0e14] p-4 border border-[#bc13fe] rounded-xl shadow-[0_0_15px_rgba(188,19,254,0.1)]">
            <h3 className="text-[10px] text-[#bc13fe] uppercase mb-4 flex items-center gap-2 italic font-bold">
              <Trophy size={12} /> Top Credit Investors
            </h3>
            <div className="space-y-3">
              {leaders.map((l, i) => (
                <div key={i} className={`flex justify-between items-center p-2 rounded text-[10px] ${l.isUser ? 'bg-[#39ff1420] border border-[#39ff14]' : 'bg-slate-900'}`}>
                  <span>{l.name}</span>
                  <span className="text-[#00f2ff]">KSH {l.limit.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0a0e14] p-4 border border-slate-800 rounded-xl">
            <h3 className="text-[10px] text-slate-500 uppercase mb-4">Economic Impact</h3>
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie data={[{v:40}, {v:30}, {v:30}]} innerRadius={25} outerRadius={35} dataKey="v">
                  {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-[8px] mt-2 space-y-1 opacity-60">
              <div className="flex justify-between"><span>Suppliers</span><span>40%</span></div>
              <div className="flex justify-between"><span>Staffing</span><span>30%</span></div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 pt-4 border-t border-slate-900 text-center">
        <p className="text-[8px] text-slate-700 tracking-tighter">DATA-DRIVEN NARRATIVE | REPAYMENT IS KEY | LIMIT GROWS WITH USAGE</p>
      </footer>
    </div>
  );
};

export default App;