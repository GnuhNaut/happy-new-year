import React, { useRef, useEffect } from 'react';
import { TET_SYMBOLS } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Decorations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftBranchRef = useRef<HTMLDivElement>(null);
  const rightBranchRef = useRef<HTMLDivElement>(null);
  const godRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas Petals Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const petals: Petal[] = [];
    
    class Petal {
        x: number;
        y: number;
        size: number;
        speedY: number;
        swaySpeed: number;
        swayRange: number;
        rotation: number;
        rotationSpeed: number;
        color: string;
        initialX: number;
        time: number;
        
        constructor() {
            this.initialX = Math.random() * width;
            this.x = this.initialX;
            this.y = Math.random() * height - height; // Start above screen
            this.size = Math.random() * 4 + 2;
            this.speedY = Math.random() * 0.8 + 0.2; // Slower, more gentle fall
            this.swaySpeed = Math.random() * 0.02 + 0.01;
            this.swayRange = Math.random() * 50 + 20;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 1 - 0.5;
            this.time = Math.random() * 100;
            // Pink and Gold petals
            this.color = Math.random() > 0.8 ? '#FFD700' : `rgba(255, 183, 197, ${Math.random() * 0.4 + 0.4})`;
        }

        update() {
            this.y += this.speedY;
            this.time += this.swaySpeed;
            
            // Smooth Sine wave sway
            this.x = this.initialX + Math.sin(this.time) * this.swayRange;
            
            this.rotation += this.rotationSpeed;

            // Reset when out of view
            if (this.y > height + 20) {
                this.y = -20;
                this.initialX = Math.random() * width;
                this.time = Math.random() * 100;
            }
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Ellipse shape is more petal-like than simple circle
            ctx.ellipse(0, 0, this.size, this.size / 1.8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Init petals
    for (let i = 0; i < 60; i++) {
        petals.push(new Petal());
    }

    let animationFrameId: number;
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(petal => {
            petal.update();
            petal.draw(ctx);
        });
        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useGSAP(() => {
    // Parallax effect for branches
    gsap.to(leftBranchRef.current, {
      y: 100,
      scale: 1.1,
      rotation: 5,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
      }
    });

    gsap.to(rightBranchRef.current, {
      y: 150,
      scale: 1.2,
      rotation: -5,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
      }
    });

    // God of wealth appears
    gsap.fromTo(godRef.current, 
      { x: 200, opacity: 0, scale: 0.5 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: "body",
          start: "200px top",
          toggleActions: "play reverse play reverse"
        }
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Left Peach Blossoms (Hoa Đào) - Enhanced Visuals */}
      <div 
        ref={leftBranchRef}
        className="absolute left-[-50px] bottom-[-20px] origin-bottom-left"
      >
        <div className="w-[500px] h-[500px] bg-red-500/5 blur-[100px] rounded-full absolute bottom-0 left-0"></div>
        {/* Abstract shapes for flowers */}
        <div className="absolute bottom-10 left-10 text-9xl opacity-80 filter drop-shadow-[0_0_10px_rgba(255,100,100,0.5)]">🌸</div>
        <div className="absolute bottom-48 left-20 text-7xl opacity-70 rotate-12">🌸</div>
        <div className="absolute bottom-32 left-[-10px] text-8xl opacity-90 -rotate-12">🌸</div>
        <div className="absolute bottom-80 left-10 text-5xl opacity-60 rotate-45">🌸</div>
      </div>

      {/* Right Ochna Blossoms (Hoa Mai) - Enhanced Visuals */}
      <div 
        ref={rightBranchRef}
        className="absolute right-[-50px] bottom-[-20px] origin-bottom-right"
      >
         <div className="w-[500px] h-[500px] bg-yellow-500/5 blur-[100px] rounded-full absolute bottom-0 right-0"></div>
         <div className="absolute bottom-10 right-10 text-9xl text-yellow-400 opacity-80 filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">🌼</div>
         <div className="absolute bottom-52 right-24 text-7xl text-yellow-400 opacity-70 -rotate-12">🌼</div>
         <div className="absolute bottom-28 right-[-10px] text-8xl text-yellow-400 opacity-90 rotate-12">🌼</div>
         <div className="absolute bottom-72 right-10 text-5xl text-yellow-400 opacity-60 -rotate-45">🌼</div>
      </div>

      {/* Hanging Lanterns */}
      <div className="absolute top-0 left-12 animate-float origin-top" style={{ animationDelay: '0s' }}>
        <div className="w-0.5 h-16 bg-tet-gold/50 mx-auto"></div>
        <img src={TET_SYMBOLS.lantern} className="w-20 h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] brightness-110" alt="lantern" />
        <div className="w-20 h-20 bg-red-500/20 blur-xl absolute top-10 left-0"></div>
      </div>
      <div className="absolute top-[-20px] right-24 animate-float origin-top" style={{ animationDelay: '1.5s', animationDuration: '7s' }}>
        <div className="w-0.5 h-24 bg-tet-gold/50 mx-auto"></div>
        <img src={TET_SYMBOLS.lantern} className="w-16 h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] brightness-110" alt="lantern" />
        <div className="w-16 h-16 bg-red-500/20 blur-xl absolute top-16 left-0"></div>
      </div>

      {/* God of Wealth (Thần Tài) */}
      <div 
        ref={godRef}
        className="absolute bottom-10 right-10 z-50 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => {
            // Little easter egg
            gsap.to(godRef.current, { rotation: 360, duration: 1, ease: "back.out" });
        }}
      >
        <img 
          src={TET_SYMBOLS.godOfWealth} 
          alt="Thần Tài" 
          className="w-40 h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        />
        <div className="absolute -top-6 right-0 bg-white text-tet-red font-bold px-4 py-2 rounded-full shadow-lg whitespace-nowrap animate-bounce">
          Nhận lộc nào! 🧧
        </div>
      </div>
    </div>
  );
};

export default Decorations;