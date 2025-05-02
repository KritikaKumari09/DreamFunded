import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useRouteError } from 'react-router-dom';
import { BackgroundBeams } from '../components/ui/background-beams';
import Button from '../components/Button';
import ButtonGradient from '../assets/svg/ButtonGradient';

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Auto redirect to home after countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-900 text-white px-4">
      <BackgroundBeams className="absolute inset-0" />

      <div className="z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.h1 
            className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            animate={{ 
              textShadow: ["0 0 5px #00a8ff, 0 0 10px #00a8ff", "0 0 20px #00a8ff, 0 0 40px #00a8ff", "0 0 5px #00a8ff, 0 0 10px #00a8ff"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Oops!
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 mb-8 max-w-md border border-white/10 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          
          <motion.p 
            className="text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {error?.statusText || error?.message || "We're sorry, but it seems there was an unexpected error."}
          </motion.p>
          
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={() => navigate(-1)}
              className="w-full"
            >
              Go Back
            </Button>
            <ButtonGradient />
            
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return Home
            </Button>
            <ButtonGradient />
          </div>
          
          <motion.p 
            className="text-sm text-gray-400 mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Auto-redirecting in {countdown} seconds...
          </motion.p>
        </motion.div>
        
        <motion.div
          className="flex flex-wrap justify-center gap-4 max-w-md text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="p-4 bg-white/5 backdrop-blur rounded-lg flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-4xl mb-2">🔍</span>
            <h3 className="text-lg font-semibold">Refresh</h3>
            <p className="text-xs text-gray-400">Try refreshing the page</p>
          </motion.div>
          
          <motion.div 
            className="p-4 bg-white/5 backdrop-blur rounded-lg flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-4xl mb-2">💬</span>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-xs text-gray-400">Report this issue</p>
          </motion.div>
          
          <motion.div 
            className="p-4 bg-white/5 backdrop-blur rounded-lg flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-4xl mb-2">⏱️</span>
            <h3 className="text-lg font-semibold">Try Later</h3>
            <p className="text-xs text-gray-400">Check back soon</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorBoundary;