import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { shouldReduceMotion } from '@/utils/deviceDetect';

export const AnimatedBackground = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(shouldReduceMotion());
  }, []);

  if (reduceMotion) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Static gradient background */}
        <div className="absolute inset-0 gradient-bg opacity-30" />

        {/* Static radial gradients */}
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-purple/20 sm:bg-primary-purple/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-blue/20 sm:bg-primary-blue/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-primary-pink/20 sm:bg-primary-pink/30 rounded-full blur-3xl" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-bg opacity-30" />

      {/* Radial gradients */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-purple/20 sm:bg-primary-purple/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-blue/20 sm:bg-primary-blue/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-primary-pink/20 sm:bg-primary-pink/30 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
    </div>
  );
};
