import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiHeart,
  FiSend,
  FiArrowUp,
  FiStar,
  FiTruck,
  FiShield,
  FiAward
} from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Order Online', href: '/order' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'Catering', href: '/catering' },
    { name: 'Gift Cards', href: '/gift-cards' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Track Order', href: '/track' },
    { name: 'Returns & Refunds', href: '/returns' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  const businessLinks = [
    { name: 'Partner with Us', href: '/partner' },
    { name: 'Become a Driver', href: '/driver' },
    { name: 'Restaurant Signup', href: '/restaurant' },
    { name: 'Careers', href: '/careers' },
    { name: 'Investor Relations', href: '/investors' },
    { name: 'Press & Media', href: '/press' }
  ];

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: FiTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' },
    { icon: FiInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' }
  ];

  const features = [
    { icon: FiTruck, text: 'Free Delivery on $25+' },
    { icon: FiShield, text: 'Secure Payment' },
    { icon: FiAward, text: '5-Star Service' },
    { icon: FiStar, text: 'Top Rated App' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section - Newsletter & Features */}
        <div className="border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Stay in the Loop!
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Get exclusive deals, new menu updates, and special offers delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center group"
                  >
                    <FiSend className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-300">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                      <feature.icon className="text-white text-lg" />
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Middle Section - Links & Info */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  FoodVerse
                </h2>
                <p className="text-gray-400 mt-3 leading-relaxed">
                  Delivering happiness, one meal at a time. Experience the future of food delivery with our premium service.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiMapPin className="text-orange-500 text-lg" />
                  <span>123 Food Street, Chandigarh, India</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiPhone className="text-orange-500 text-lg" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiMail className="text-orange-500 text-lg" />
                  <span>hello@foodverse.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiClock className="text-orange-500 text-lg" />
                  <span>24/7 Service Available</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-orange-400">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition duration-300 hover:translate-x-2 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-orange-400">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition duration-300 hover:translate-x-2 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Business */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-orange-400">Business</h3>
              <ul className="space-y-3">
                {businessLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition duration-300 hover:translate-x-2 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex space-x-6"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={`bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center text-gray-400"
              >
                <p className="flex items-center justify-center space-x-2">
                  <span>&copy; 2025 FoodVerse. Made with</span>
                  <FiHeart className="text-red-500 animate-pulse" />
                  <span>in India. All rights reserved.</span>
                </p>
              </motion.div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 p-3 rounded-full transition duration-300 group"
                aria-label="Back to top"
              >
                <FiArrowUp className="text-xl group-hover:animate-bounce" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;