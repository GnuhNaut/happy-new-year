import React, { useState, useRef } from 'react';
import { LUCKY_WISHES } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LuckyMoney: React.FC = () => {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [randomWish, setRandomWish] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  const envelopes = Array.from({ length: 3 });

  const handleOpen = (index: number) => {
    if (openedIndex !== null) return;
    const wish = LUCKY_WISHES[Math.floor(Math.random() * LUCKY_WISHES.length)];
    setRandomWish(wish);
    setOpenedIndex(index);
  };

  useGSAP(() => {
    gsap.to(".envelope-item", {
      y: -15,
      duration: 2.5,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  useGSAP(() => {
    if (openedIndex !== null) {
      gsap.to(`#envelope-${openedIndex}`, {
        scale: 1.2,
        y: -30,
        zIndex: 50,
        duration: 0.6,
        ease: "back.out(1.5)"
      });

      envelopes.forEach((_, idx) => {
        if (idx !== openedIndex) {
          gsap.to(`#envelope-${idx}`, {
            opacity: 0,
            scale: 0.8,
            filter: "blur(5px)",
            duration: 0.5
          });
        }
      });

      gsap.fromTo("#result-card", 
        { scale: 0.5, opacity: 0, rotationX: 90 },
        { scale: 1, opacity: 1, rotationX: 0, duration: 0.8, delay: 0.2, ease: "elastic.out(1, 0.75)" }
      );
    }
  }, [openedIndex]);

  const reset = () => {
    gsap.to(".envelope-item", {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      zIndex: 1,
      duration: 0.5,
      clearProps: "all"
    });
    setOpenedIndex(null);
    setRandomWish('');
  };

  return (
    <div ref={containerRef} className="py-24 relative min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')] opacity-10"></div>
      
      <div className="z-10 text-center mb-16">
          <h3 className="text-5xl font-serif text-tet-gold mb-4 drop-shadow-md">
            Hái Lộc Đầu Xuân
          </h3>
          <div className="w-16 h-1 bg-tet-gold mx-auto mb-4"></div>
          <p className="text-tet-champagne/70 max-w-lg mx-auto px-4 font-light">
            Mỗi bao lì xì chứa đựng một lời chúc may mắn đặc biệt dành riêng cho bạn.
          </p>
      </div>

      <div className="flex flex-wrap justify-center gap-12 relative z-10 perspective-1000">
        {envelopes.map((_, index) => (
          <div
            key={index}
            id={`envelope-${index}`}
            className="envelope-item cursor-pointer relative group transform-style-3d"
            onClick={() => handleOpen(index)}
          >
            <div className={`w-40 h-64 bg-gradient-to-br from-[#c62828] to-[#8e0000] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-tet-gold/30 flex flex-col items-center justify-start pt-8 transform transition-all duration-300 ${openedIndex === null ? 'group-hover:shadow-[0_0_30px_#FFD700] group-hover:-translate-y-4' : ''}`}>
              
              {/* Envelope Flap */}
              <div className="absolute top-0 w-full h-20 bg-[#b71c1c] rounded-t-2xl clip-path-triangle shadow-md z-20 origin-top"></div>
              
              {/* Pattern */}
              <div className="w-24 h-24 border-2 border-tet-gold/50 rounded-full flex items-center justify-center mb-4 bg-[#8e0000]/50 backdrop-blur-sm z-10">
                <span className="text-5xl text-tet-gold font-serif font-bold filter drop-shadow-lg">
                    {index === 0 ? 'Phúc' : index === 1 ? 'Lộc' : 'Thọ'}
                </span>
              </div>
              
              {/* Bottom Decoration */}
              <div className="absolute bottom-0 w-full h-1/3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              
              <div className="text-yellow-200/50 text-xs mt-12 font-sans tracking-widest uppercase">
                 Xuân 2026
              </div>
            </div>
          </div>
        ))}

        {/* Result Popup */}
        {openedIndex !== null && (
          <div 
            id="result-card" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-tet-cream/95 text-tet-dark p-10 rounded-2xl shadow-[0_0_100px_rgba(255,215,0,0.4)] border-4 border-tet-gold text-center z-50 backdrop-blur-xl"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-tet-red rounded-full flex items-center justify-center border-2 border-tet-gold shadow-lg">
                <span className="text-2xl">✨</span>
            </div>
            
            <h4 className="text-2xl font-bold font-serif mb-6 uppercase text-tet-red tracking-widest border-b pb-4 border-tet-red/10">Lời Chúc Xuân</h4>
            <p className="text-xl font-serif italic leading-relaxed mb-8 text-tet-dark/80">
              "{randomWish}"
            </p>
            <button 
              onClick={reset}
              className="bg-gradient-to-r from-tet-red to-red-700 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-bold uppercase text-sm tracking-wider"
            >
              Nhận Lộc Tiếp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyMoney;