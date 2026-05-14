import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUpload, FaMusic, FaHeadphones } from 'react-icons/fa';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingParticles } from '@/components/FloatingParticles';
import { InputMethod } from '@/types';

export const HomePage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const inputMethods: InputMethod[] = [
    {
      type: 'search',
      icon: <FaSearch className="text-4xl" />,
      title: 'Search Song',
      description: 'Enter title and singer to get YouTube recommendations',
      color: 'from-primary-blue to-primary-pink',
    },
    {
      type: 'upload',
      icon: <FaUpload className="text-4xl" />,
      title: 'Upload File',
      description: 'Upload MP3, WAV, or M4A files for analysis',
      color: 'from-primary-pink to-primary-purple',
    },
  ];

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setTimeout(() => {
      navigate(`/analyze/${method}`);
    }, 300);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <AnimatedBackground />
      <FloatingParticles />

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary-purple via-primary-blue to-primary-pink rounded-full blur-2xl opacity-50"
              />
              <div className="relative bg-gradient-to-r from-primary-purple to-primary-blue p-6 rounded-full">
                <FaMusic className="text-6xl text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Discover Your Music's</span>
            <br />
            <span className="text-white">Emotional Tone</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Analyze the mood and emotion of any song through advanced tempo and lyrics analysis.
            Get insights into what makes your music truly resonate.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <FaHeadphones className="text-primary-purple" />
              <span>10,000+ Songs Analyzed</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <FaMusic className="text-primary-blue" />
              <span>8 Tone Categories</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Input Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Choose Your <span className="text-gradient">Analysis Method</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputMethods.map((method, index) => (
              <motion.div
                key={method.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card
                  onClick={() => handleMethodSelect(method.type)}
                  className={`relative overflow-hidden group ${
                    selectedMethod === method.type ? 'ring-2 ring-primary-purple' : ''
                  }`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-block p-4 rounded-xl bg-gradient-to-br ${method.color} mb-4`}
                    >
                      {method.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-2">{method.title}</h3>
                    <p className="text-gray-400 text-sm">{method.description}</p>

                    <motion.div
                      className="mt-4 flex items-center gap-2 text-primary-purple font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      <span>Get Started</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-gradient">Powerful Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Tempo Analysis',
                description: 'Detect BPM, rhythm patterns, and energy levels',
                icon: '🎵',
              },
              {
                title: 'Lyrics Sentiment',
                description: 'Analyze emotions and themes in song lyrics',
                icon: '📝',
              },
              {
                title: 'Tone Classification',
                description: '8 distinct mood categories with confidence scores',
                icon: '🎨',
              },
              {
                title: 'Similar Songs',
                description: 'Discover tracks with matching emotional tones',
                icon: '🔍',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card hover={false} className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary-purple/10 to-primary-blue/10">
            <h3 className="text-2xl font-bold mb-4">Ready to Analyze?</h3>
            <p className="text-gray-400 mb-6">
              Start discovering the emotional depth of your favorite songs in seconds
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/analyze/search')}
              className="mx-auto"
            >
              <FaSearch />
              Start Analyzing Now
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
