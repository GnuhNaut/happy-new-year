import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY_LOGO } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface InfinityGalleryProps {
  images: string[];
}

const InfinityGallery: React.FC<InfinityGalleryProps> = ({ images }) => {
  const container = useRef<HTMLDivElement>(null);
  
  // Ensure we have enough images for the effect by duplicating if needed
  // We need distinct columns
  const allImages = [...images, ...images, ...images]; // Triplicate for length
  const col1 = allImages.slice(0, 5);
  const col2 = allImages.slice(5, 10);
  const col3 = allImages.slice(10, 15);

  useGSAP(() => {
    // Parallax Effect: Move columns at different speeds based on scroll
    gsap.to(".col-1", {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(".col-2", {
      y: 100, // Moves opposite/slower
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });

    gsap.to(".col-3", {
      y: -200, // Moves faster
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-20 relative overflow-hidden bg-[#120404]">
        {/* Section Title Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center bg-gradient-to-t from-tet-dark via-transparent to-tet-dark">
             <div className="bg-black/60 backdrop-blur-sm p-10 border border-white/10 rounded-full text-center transform hover:scale-105 transition-transform duration-500 pointer-events-auto shadow-2xl">
                 <img src={COMPANY_LOGO} alt="Xuan Media" className="h-16 mx-auto mb-4 object-contain brightness-0 invert opacity-80" />
                 <h3 className="text-4xl md:text-5xl font-serif text-tet-gold">Thư Viện Ảnh</h3>
                 <p className="text-gray-400 mt-2 font-sans text-sm tracking-widest uppercase">Khoảnh khắc đáng nhớ</p>
             </div>
        </div>

        {/* Gallery Columns */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 px-4 h-[800px] md:h-[1000px] opacity-80 overflow-hidden transform-style-3d perspective-1000 -skew-y-2 scale-110">
            
            {/* Column 1 */}
            <div className="col-1 flex flex-col gap-8 -mt-20">
                {col1.map((src, i) => (
                    <div key={`c1-${i}`} className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px] shadow-2xl">
                        <img src={src} alt="" className="w-full h-full object-cover filter sepia-[0.3] hover:sepia-0 transition-all duration-500" />
                    </div>
                ))}
            </div>

            {/* Column 2 */}
            <div className="col-2 flex flex-col gap-8 -mt-40">
                {col2.map((src, i) => (
                    <div key={`c2-${i}`} className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px] shadow-2xl">
                         <img src={src} alt="" className="w-full h-full object-cover filter sepia-[0.3] hover:sepia-0 transition-all duration-500" />
                    </div>
                ))}
            </div>

            {/* Column 3 */}
            <div className="col-3 flex flex-col gap-8 -mt-10">
                {col3.map((src, i) => (
                    <div key={`c3-${i}`} className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px] shadow-2xl">
                         <img src={src} alt="" className="w-full h-full object-cover filter sepia-[0.3] hover:sepia-0 transition-all duration-500" />
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default InfinityGallery;