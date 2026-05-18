import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMusic } from 'react-icons/fa';
import { shouldReduceMotion } from '@/utils/deviceDetect';

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(shouldReduceMotion());
    // Reduce particle count on mobile
    const particleCount = shouldReduceMotion() ? 0 : 15;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  if (reduceMotion || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-primary-purple/20"
          style={{
            left: `${particle.x}%`,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            rotate: [0, 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        >
          <FaMusic className="text-2xl" />
        </motion.div>
      ))}
    </div>
  );
};
