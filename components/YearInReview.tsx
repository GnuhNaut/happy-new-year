import React, { useRef } from 'react';
import { YEAR_REVIEW_DATA } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const YearInReview: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate the central line growing
    gsap.fromTo('.timeline-path',
      { height: 0 },
      {
        height: '100%',
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.5
        }
      }
    );

    // Animate items appearing
    const items = gsap.utils.toArray<HTMLElement>('.timeline-row');
    items.forEach((item, i) => {
      const content = item.querySelector('.timeline-content');
      const dot = item.querySelector('.timeline-dot');
      const xOffset = i % 2 === 0 ? -50 : 50;

      gsap.fromTo(content,
        { opacity: 0, x: xOffset, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            scrub: 1
          }
        }
      );

      gsap.fromTo(dot,
        { scale: 0, boxShadow: "0 0 0px #FFD700" },
        {
          scale: 1,
          boxShadow: "0 0 20px #FFD700",
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: container });

  return (
    <section className="py-40 relative overflow-hidden" ref={container}>
      {/* Background ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-32">
            <h3 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-tet-gold via-white to-tet-gold mb-6 drop-shadow-[0_5px_15px_rgba(255,215,0,0.3)]">
              Hành Trình 2025
            </h3>
            <div className="h-1 w-20 bg-tet-gold mx-auto rounded-full mb-6"></div>
            <p className="text-gray-300 font-sans tracking-wide max-w-2xl mx-auto text-lg">
                Những dấu ấn vàng son của Xuân Media trong năm vừa qua.
            </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Central Glow Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 transform md:-translate-x-1/2 z-0">
             <div className="timeline-path w-full bg-gradient-to-b from-tet-gold via-red-500 to-tet-gold shadow-[0_0_15px_#FFD700] absolute top-0"></div>
          </div>

          <div className="space-y-24 md:space-y-32">
            {YEAR_REVIEW_DATA.map((item, index) => (
              <div 
                key={index}
                className={`timeline-row flex flex-col md:flex-row items-center w-full ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className="w-full md:w-5/12 p-4">
                  <div className={`timeline-content p-8 md:p-10 rounded-3xl glass-premium border-t border-white/10 relative overflow-hidden group hover:border-tet-gold/40 transition-colors duration-500`}>
                    {/* Month Label */}
                    <div className="absolute top-0 right-0 px-6 py-2 bg-tet-gold/10 rounded-bl-2xl border-b border-l border-white/5">
                        <span className="text-tet-gold font-bold font-sans tracking-widest text-sm">{item.month}</span>
                    </div>

                    <h4 className="text-3xl font-serif font-bold text-white mb-4 mt-2">{item.title}</h4>
                    <p className="text-gray-300 font-light leading-relaxed text-lg">{item.description}</p>
                    
                    {/* Hover Glow */}
                    <div className={`absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-tl ${item.color} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full pointer-events-none`}></div>
                  </div>
                </div>

                {/* Center Connector */}
                <div className="w-full md:w-2/12 flex justify-center py-6 md:py-0 relative">
                  <div className="timeline-dot w-6 h-6 bg-tet-dark border-2 border-tet-gold rounded-full relative z-10">
                    <div className="absolute inset-0 bg-tet-gold rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Empty Spacer Side */}
                <div className="w-full md:w-5/12 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YearInReview;