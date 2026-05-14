import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMusic, FaGithub } from 'react-icons/fa';

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary-purple to-primary-blue p-2 rounded-xl"
            >
              <FaMusic className="text-2xl text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">Tone Music</h1>
              <p className="text-xs text-gray-400">Discover Your Music's Mood</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 glass-effect rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaGithub className="text-xl" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
