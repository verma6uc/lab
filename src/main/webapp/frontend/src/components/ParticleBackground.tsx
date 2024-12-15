import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(scale, scale);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseRef.current.y = (e.clientY - rect.top) * (canvas.height / rect.height);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle properties
    const particleCount = 100;
    const connectionDistance = 150;
    const particles: {
      x: number;
      y: number;
      radius: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      brightness: number;
    }[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: Math.random() * 1 + 0.2,
        vx: 0,
        vy: 0,
        brightness: Math.random(),
      });
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Mouse repulsion
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouseRef.current.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * 6;
        const directionY = forceDirectionY * force * 6;

        if (distance < maxDistance) {
          particle.x -= directionX;
          particle.y -= directionY;
          particle.brightness = Math.min(0.8, particle.brightness + 0.1);
        } else {
          if (particle.x !== particle.baseX) {
            const dx = particle.x - particle.baseX;
            particle.x -= dx/20;
          }
          if (particle.y !== particle.baseY) {
            const dy = particle.y - particle.baseY;
            particle.y -= dy/20;
          }
          particle.brightness = Math.max(0.2, particle.brightness - 0.01);
        }

        // Draw particle with glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 8
        );
        gradient.addColorStop(0, `rgba(0, 163, 255, ${particle.brightness * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 163, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.radius * 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw solid particle center
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 163, 255, ${particle.brightness * 0.8})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.1 * 
              ((particle.brightness + otherParticle.brightness) / 2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 163, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
        cursor: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default ParticleBackground;
