import React, { useEffect, useRef } from 'react';

const PetalInteraction: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const bursts: BurstPetal[] = [];

    // Colors for the trail (Gold/Sparkle)
    const TRAIL_COLORS = ['#FFD700', '#FFFACD', '#FFFFFF'];
    
    // Colors for the burst (Pink Peach & Yellow Ochna)
    const PETAL_COLORS = ['#FF69B4', '#FFB7C5', '#FFD700', '#FFEA00'];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    class BurstPetal {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      angle: number;
      spin: number;
      life: number;
      color: string;
      type: 'circle' | 'oval';

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2; // Explosive speed
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 5 + 3;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.2;
        this.life = 1;
        this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
        this.type = Math.random() > 0.5 ? 'oval' : 'circle';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15; // Gravity
        this.vx *= 0.95; // Air resistance
        this.vy *= 0.95;
        this.angle += this.spin;
        this.life -= 0.015;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        if (this.type === 'oval') {
          // Draw Petal Shape
          ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        } else {
          ctx.arc(0, 0, this.size / 1.5, 0, Math.PI * 2);
        }
        ctx.fill();
        
        ctx.restore();
        ctx.globalAlpha = 1;
      }
    }

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      // Create trail
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create explosion
      for (let i = 0; i < 20; i++) {
        bursts.push(new BurstPetal(e.clientX, e.clientY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Handle Trail
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      // Handle Bursts
      for (let i = 0; i < bursts.length; i++) {
        bursts[i].update();
        bursts[i].draw();
        if (bursts[i].life <= 0) {
          bursts.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]" 
    />
  );
};

export default PetalInteraction;