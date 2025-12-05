import React, { useState, useRef } from 'react';
import { COMPANY_LOGO } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LoginProps {
  onLogin: (id: number) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isGateOpen, setIsGateOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpenGate = () => {
    setIsGateOpen(true);
  };

  useGSAP(() => {
    if (isGateOpen) {
      const tl = gsap.timeline();

      // Open doors
      tl.to(leftDoorRef.current, {
        xPercent: -100,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);
      tl.to(rightDoorRef.current, {
        xPercent: 100,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);

      // Show content
      tl.fromTo(contentRef.current, 
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      );
    }
  }, [isGateOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(inputValue);
    
    // Animate out before login
    gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        onComplete: () => {
            if (inputValue.trim() === '') {
                onLogin(0);
                return;
             }
         
             if (isNaN(id) || id < 0 || id > 12) {
               setError('Mã không hợp lệ (1-12).');
               // Revert animation if error
               gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.3 });
               return;
             }
         
             onLogin(id);
        }
    });
  };

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-tet-dark flex items-center justify-center">
      {/* Background behind doors */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548261327-04664324bbdf?q=80&w=2525&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
      
      {/* Content Form (Hidden initially) */}
      <div ref={contentRef} className={`relative z-10 w-full max-w-md p-8 md:p-12 glass-premium rounded-3xl mx-4 ${!isGateOpen ? 'opacity-0' : ''}`}>
        <div className="flex justify-center mb-8">
          <img src={COMPANY_LOGO} alt="Xuan Media" className="h-24 object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
        </div>
        
        <h2 className="text-4xl font-serif text-center text-tet-gold mb-2">Xin Chào</h2>
        <p className="text-center text-tet-champagne/80 mb-10 font-sans tracking-wide text-sm uppercase">Cổng chào xuân Bính Ngọ 2026</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError('');
              }}
              className="block py-4 px-0 w-full text-xl text-center text-white bg-transparent border-0 border-b-2 border-tet-gold/30 appearance-none focus:outline-none focus:ring-0 focus:border-tet-gold peer transition-colors"
              placeholder=" "
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-tet-gold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 w-full text-center">
              Nhập mã định danh (Để trống nếu là khách)
            </label>
            {error && <p className="mt-2 text-red-400 text-xs text-center">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-tet-red to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(211,47,47,0.4)] transform transition-all hover:scale-105 active:scale-95 tracking-wider uppercase text-sm border border-white/10"
          >
            Khai Xuân
          </button>
        </form>
      </div>

      {/* Left Door */}
      <div 
        ref={leftDoorRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#2a0505] border-r-2 border-tet-gold/50 z-20 flex items-center justify-end shadow-2xl bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] bg-blend-overlay"
      >
        {!isGateOpen && (
          <div className="mr-4 md:mr-8 flex flex-col items-center">
             <div className="w-16 h-16 rounded-full border-4 border-tet-gold bg-tet-dark flex items-center justify-center shadow-[0_0_20px_#FFD700] cursor-pointer hover:scale-110 transition-transform" onClick={handleOpenGate}>
                <span className="text-3xl">🧧</span>
             </div>
          </div>
        )}
        {/* Decorative Circle Half */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[2px] w-32 h-64 md:w-48 md:h-96 border-4 border-tet-gold rounded-l-full opacity-30 pointer-events-none"></div>
      </div>

      {/* Right Door */}
      <div 
        ref={rightDoorRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#2a0505] border-l-2 border-tet-gold/50 z-20 flex items-center justify-start shadow-2xl bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] bg-blend-overlay"
      >
         {!isGateOpen && (
          <div className="ml-4 md:ml-8 flex flex-col items-center">
             <div className="w-16 h-16 rounded-full border-4 border-tet-gold bg-tet-dark flex items-center justify-center shadow-[0_0_20px_#FFD700] cursor-pointer hover:scale-110 transition-transform" onClick={handleOpenGate}>
                <span className="text-3xl text-tet-gold font-serif font-bold">Mở</span>
             </div>
          </div>
        )}
        {/* Decorative Circle Half */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-[2px] w-32 h-64 md:w-48 md:h-96 border-4 border-tet-gold rounded-r-full opacity-30 pointer-events-none"></div>
      </div>
      
      {/* Knock Text */}
      {!isGateOpen && (
        <div className="absolute bottom-20 z-30 text-tet-gold/50 font-serif animate-pulse pointer-events-none">
           Chạm vào cửa để mở
        </div>
      )}
    </div>
  );
};

export default Login;