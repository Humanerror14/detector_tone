import { motion } from "framer-motion";
import { FaHeart, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gradient">
              Tone Music Analyzer
            </h3>
            <p className="text-gray-400 text-sm">
              Discover the emotional tone of your favorite songs through
              advanced audio and lyrics analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-purple transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-purple transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-purple transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-purple transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              {[
                {
                  icon: FaTwitter,
                  href: "https://www.threads.com/@ulil_amry14",
                },
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/ulil_amry14/",
                },
                {
                  icon: FaLinkedin,
                  href: "linkedin.com/in/ulil-amri-2818a5268",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 glass-effect rounded-lg hover:bg-white/10 transition-colors"
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Made with <FaHeart className="text-primary-pink" /> by Tone Music
            Team © 2026
          </p>
        </div>
      </div>
    </footer>
  );
};
