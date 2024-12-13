import React, { useEffect, useState } from 'react';

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; duration: number; size: number; startX: number; endX: number }>>([]);

  useEffect(() => {
    const particleCount = 200;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 11000, // Random delay up to 11s
      duration: 7000 + Math.random() * 4000, // Duration between 7-11s
      size: 4 + Math.random() * 6, // Size between 4-10px
      startX: Math.random() * 100, // Start position X (0-100%)
      endX: Math.random() * 100, // End position X (0-100%)
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, #021027 0%, #000000 100%)',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `
              move-particle-${particle.id} ${particle.duration}ms infinite ${particle.delay}ms linear,
              fade-particle 2s infinite
            `,
            left: `${particle.startX}%`,
            transform: 'translateY(110vh)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at center, rgba(0, 163, 255, 1) 0%, rgba(0, 163, 255, 0.8) 10%, rgba(0, 163, 255, 0) 56%)',
              mixBlendMode: 'screen',
              animation: `scale-particle 2s infinite ${Math.random() * 2000}ms linear`
            }}
          />
        </div>
      ))}
      <style>
        {particles.map((particle) => `
          @keyframes move-particle-${particle.id} {
            from {
              transform: translate3d(0, 110vh, 0);
            }
            to {
              transform: translate3d(${particle.endX - particle.startX}%, -10vh, 0);
            }
          }
        `).join('\n')}
        {`
          @keyframes fade-particle {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
          @keyframes scale-particle {
            0% { transform: scale(0.4); }
            50% { transform: scale(2.2); }
            100% { transform: scale(0.4); }
          }
        `}
      </style>
    </div>
  );
};

export default ParticleBackground; 