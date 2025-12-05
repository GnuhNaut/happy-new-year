import React, { useState, useRef } from 'react';
import Login from './components/Login';
import Fireworks from './components/Fireworks';
import Decorations from './components/Decorations';
import InfinityGallery from './components/InfinityGallery';
import YearInReview from './components/YearInReview';
import FutureVision from './components/FutureVision';
import Countdown from './components/Countdown';
import LuckyMoney from './components/LuckyMoney';
import MusicPlayer from './components/MusicPlayer';
import PetalInteraction from './components/PetalInteraction';
import PersonalSection from './components/PersonalSection';
import { USERS, ACHIEVEMENTS, COMPANY_LOGO } from './constants';
import { UserProfile } from './types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleLogin = (id: number) => {
    const user = USERS[id];
    if (user) {
      setCurrentUser(user);
    }
  };

  useGSAP(() => {
    if (currentUser && heroRef.current) {
        const tl = gsap.timeline();
        tl.from(".hero-text", { y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" })
          .from(".hero-line", { scaleX: 0, duration: 1.5, ease: "expo.out" }, "-=0.8")
          .from(".hero-countdown", { opacity: 0, y: 20, duration: 1 }, "-=0.5");
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <>
        <PetalInteraction />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-tet-dark text-tet-cream overflow-x-hidden selection:bg-tet-gold selection:text-tet-dark relative">
      <PetalInteraction />
      
      {/* Global Noise Overlay */}
      <div className="bg-noise"></div>
      
      {/* Background Ambience - slightly darker/richer */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a0505] to-[#2d0a0a] -z-20"></div>

      <Decorations />
      <MusicPlayer />
      <Fireworks />

      {/* Hero Section */}
      <header ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
           {/* Add a subtle spotlight effect */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="z-20 text-center px-4 space-y-8 max-w-6xl mx-auto w-full">
          <img src={COMPANY_LOGO} alt="Xuan Media" className="hero-text h-24 md:h-40 mx-auto mb-6 drop-shadow-[0_0_25px_rgba(255,215,0,0.6)] object-contain" />
          
          <div className="space-y-2">
             <h2 className="hero-text text-xl md:text-2xl font-sans font-light tracking-[0.3em] text-tet-champagne/80 uppercase">
                Chào đón xuân mới
             </h2>
             
             <h1 className="hero-text text-6xl md:text-9xl font-script text-transparent bg-clip-text bg-gradient-to-b from-tet-gold to-yellow-600 drop-shadow-sm p-4 leading-tight">
                Xuân Bính Ngọ
             </h1>
             
             <div className="hero-line w-32 h-1 bg-gradient-to-r from-transparent via-tet-gold to-transparent mx-auto"></div>
             
             <p className="hero-text text-2xl md:text-4xl font-serif italic text-white/90 max-w-3xl mx-auto leading-relaxed pt-4">
                "Vạn sự như ý - Tỷ sự như mơ"
             </p>
          </div>
          
          <div className="hero-countdown pt-8">
             <Countdown />
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-60">
             <span className="text-3xl text-tet-gold/50">⇩</span>
          </div>
        </div>
      </header>

      {/* Greeting Card */}
      <section className="relative z-20 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-premium p-10 md:p-16 rounded-[2rem] max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-700 relative overflow-hidden group">
             {/* Decorative corner borders */}
             <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-tet-gold/50 rounded-tl-xl"></div>
             <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-tet-gold/50 rounded-tr-xl"></div>
             <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-tet-gold/50 rounded-bl-xl"></div>
             <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-tet-gold/50 rounded-br-xl"></div>
             
             <div className="relative z-10">
                <h3 className="text-3xl font-serif text-tet-gold mb-8">
                  Thân gửi <span className="text-white font-bold">{currentUser.name}</span>,
                </h3>
                <p className="text-xl md:text-2xl leading-relaxed font-light font-serif text-tet-cream/90">
                  {currentUser.wishes}
                </p>
                <div className="mt-12 flex justify-center gap-6 text-4xl opacity-80">
                  <span>🌸</span>
                  <span>🐎</span>
                  <span>💰</span>
                </div>
             </div>
             
             {/* Background glow animation */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </div>
        </div>
      </section>

      {/* New Personal Photo Section */}
      <div className="relative z-20">
         <PersonalSection user={currentUser} />
      </div>

      <section className="relative z-20">
        <LuckyMoney />
      </section>

      <div className="relative z-20 bg-gradient-to-b from-tet-dark via-[#150505] to-tet-dark">
        <YearInReview />
      </div>

      <div className="relative z-20">
        <FutureVision />
      </div>

      <section className="relative z-20 py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h3 className="text-4xl font-serif text-tet-gold mb-2">Thành Tựu 2025</h3>
             <div className="w-24 h-0.5 bg-tet-gold/30 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ACHIEVEMENTS.map((item, index) => (
              <div key={item.id} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-tet-red/10 hover:border-tet-gold/30 transition-all duration-500 hover:-translate-y-2">
                <div className="text-6xl mb-6 text-center transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h4 className="text-xl font-bold text-tet-gold mb-4 text-center uppercase tracking-wide group-hover:text-white transition-colors">{item.title}</h4>
                <p className="text-gray-400 text-center font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Infinity Gallery */}
      <section className="relative z-20">
        <InfinityGallery images={currentUser.images} />
      </section>

      <footer className="relative z-20 bg-black/60 py-16 border-t border-white/5 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center space-y-6">
          <img src={COMPANY_LOGO} alt="Xuan Media" className="h-16 mx-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-500" />
          <div className="flex justify-center gap-4 text-gray-500">
             <a href="#" className="hover:text-tet-gold transition-colors">Facebook</a>
             <span>•</span>
             <a href="#" className="hover:text-tet-gold transition-colors">Instagram</a>
             <span>•</span>
             <a href="#" className="hover:text-tet-gold transition-colors">Website</a>
          </div>
          <div>
              <p className="text-gray-500 font-sans text-sm">
                © 2026 Xuan Media. All rights reserved.
              </p>
              <p className="text-tet-gold/30 text-xs mt-2 font-serif">
                Chuc Mung Nam Moi
              </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;