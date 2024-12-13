import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  const initParticles = (width: number, height: number) => {
    const particleCount = Math.floor((width * height) / 15000); // Responsive particle count
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      connections: []
    }));
  };

  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    
    // Update particle positions
    particles.current.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      // Keep particles within bounds
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      // Reset connections
      particle.connections = [];
    });

    // Find connections
    particles.current.forEach((particle1, i) => {
      particles.current.forEach((particle2, j) => {
        if (i !== j) {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            particle1.connections.push(j);
          }
        }
      });
    });

    // Draw connections
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 163, 255, 0.1)';
    particles.current.forEach((particle, i) => {
      particle.connections.forEach(j => {
        const particle2 = particles.current[j];
        const distance = Math.sqrt(
          Math.pow(particle.x - particle2.x, 2) + 
          Math.pow(particle.y - particle2.y, 2)
        );
        const opacity = 1 - (distance / 150);
        ctx.strokeStyle = `rgba(0, 163, 255, ${opacity * 0.2})`;
        ctx.lineWidth = opacity * 1;
        
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle2.x, particle2.y);
      });
    });
    ctx.stroke();

    // Draw particles
    particles.current.forEach(particle => {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, 3
      );
      gradient.addColorStop(0, 'rgba(0, 163, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 163, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawParticles(ctx, canvas.width, canvas.height);
    animationFrameId.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background: 'radial-gradient(circle at 50% 50%, #0A1929 0%, #050B13 100%)',
        '& canvas': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }
      }}
    >
      <canvas ref={canvasRef} />
    </Box>
  );
};

export default ParticleBackground; 