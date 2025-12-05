import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryProps {
  images: string[];
  title: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.gallery-card');
    
    gsap.fromTo(cards, 
      { 
        y: 100, 
        opacity: 0, 
        rotateX: 10 
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
      <div className="text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-serif text-tet-gold mb-4 inline-block relative">
          <span className="relative z-10">{title}</span>
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-tet-red/30 -skew-x-12 z-0"></span>
        </h3>
        <p className="text-gray-300 font-sans tracking-widest text-sm uppercase mt-4">Những khoảnh khắc đáng nhớ</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="gallery-card break-inside-avoid relative group rounded-2xl overflow-hidden glass hover:shadow-[0_10px_40px_rgba(255,215,0,0.2)] transition-all duration-500"
          >
            <div className="relative overflow-hidden">
                <img 
                    src={src} 
                    alt={`Gallery ${index}`} 
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-tet-gold font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Xuân 2026</span>
                    <span className="text-gray-300 text-sm font-sans mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Kỷ niệm đẹp</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;