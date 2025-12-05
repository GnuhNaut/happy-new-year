import React, { useRef } from 'react';
import { UserProfile } from '../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PersonalSectionProps {
  user: UserProfile;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({ user }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const images = gsap.utils.toArray<HTMLElement>('.personal-img');
    
    // Staggered fade in + float up
    gsap.fromTo(images, 
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // Text Reveal
    gsap.fromTo('.personal-text',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.personal-info',
          start: "top 80%"
        }
      }
    );

  }, { scope: containerRef });

  // Use the user's specific images
  const displayImages = user.images.slice(0, 5); // Ensure 5 images max for layout

  return (
    <section ref={containerRef} className="py-32 relative bg-black/40 border-y border-white/5">
      <div className="container mx-auto px-4">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-4 personal-info text-left sticky top-32">
                <div className="personal-text">
                    <span className="text-tet-gold font-sans tracking-[0.4em] text-sm uppercase block mb-4">Gương mặt tiêu biểu</span>
                    <h2 className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">
                        {user.name}
                    </h2>
                    <p className="text-white/60 text-lg font-light leading-relaxed mb-8 border-l-2 border-tet-red pl-6">
                        "Cảm ơn những đóng góp không ngừng nghỉ của bạn. Hãy cùng nhìn lại những khoảnh khắc rạng rỡ nhất."
                    </p>
                    <div className="inline-block px-6 py-3 border border-tet-gold/30 rounded-full text-tet-gold font-sans text-sm hover:bg-tet-gold hover:text-tet-dark transition-colors duration-300">
                        {user.role}
                    </div>
                </div>
            </div>

            {/* Right Images "Masonry" / Art Wall */}
            <div className="lg:col-span-8 grid grid-cols-12 gap-4 auto-rows-[200px]">
                {/* Image 1: Large landscape */}
                {displayImages[0] && (
                    <div className="personal-img col-span-12 md:col-span-8 row-span-2 relative group overflow-hidden rounded-lg">
                        <img src={displayImages[0]} alt="Personal 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 border-[1px] border-white/20 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                )}
                
                {/* Image 2: Tall portrait */}
                {displayImages[1] && (
                    <div className="personal-img col-span-6 md:col-span-4 row-span-2 relative group overflow-hidden rounded-lg">
                         <img src={displayImages[1]} alt="Personal 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                )}

                {/* Image 3: Small square */}
                {displayImages[2] && (
                    <div className="personal-img col-span-6 md:col-span-4 row-span-1 relative group overflow-hidden rounded-lg">
                        <img src={displayImages[2]} alt="Personal 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                )}

                 {/* Image 4: Small square */}
                 {displayImages[3] && (
                    <div className="personal-img col-span-6 md:col-span-4 row-span-1 relative group overflow-hidden rounded-lg">
                        <img src={displayImages[3]} alt="Personal 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                )}

                {/* Image 5: Wide */}
                {displayImages[4] && (
                    <div className="personal-img col-span-12 md:col-span-4 row-span-1 relative group overflow-hidden rounded-lg">
                        <img src={displayImages[4]} alt="Personal 5" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalSection;