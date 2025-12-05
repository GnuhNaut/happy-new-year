import React, { useEffect, useRef } from 'react';

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for non-transparent bg if possible, but we need transparency overlay
    if (!ctx) return;

    // Fix for High DPI (Retina) Displays
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    // Normalize coordinate system to use css pixels
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    const colors = ['#FFD700', '#FF4D4D', '#00FF7F', '#00E5FF', '#E066FF', '#FFFFFF'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        // Explosion shape
        const angle = Math.random() * Math.PI * 2;
        // Randomize speed for "burst" feel
        const speed = Math.random() * 5 + 2; 
        
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.015 + 0.01; // Random fade speed
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96; // Air resistance
        this.vy *= 0.96;
        this.vy += 0.15; // Gravity
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const createFirework = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particleCount = 80; // More particles per explosion
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Auto launch fireworks logic
    let timer = 0;
    const animate = () => {
      // Create a "trail" effect by not fully clearing the canvas, but drawing a semi-transparent black rect
      // We use 'source-over' to layer the fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      // Use 'lighter' composite mode for glowing effect
      ctx.globalCompositeOperation = 'lighter';

      if (Math.random() < 0.03) {
        // Randomize position, keep mostly in top 2/3 of screen
        createFirework(Math.random() * width, Math.random() * (height * 0.6));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }
      
      // Reset composite operation for next frame's background clear
      ctx.globalCompositeOperation = 'source-over';

      timer = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(timer);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen" style={{ width: '100%', height: '100%' }} />;
};

export default Fireworks;