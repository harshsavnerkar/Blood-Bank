import React from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

const AnimatedBloodFill = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Blood Container */}
      <div className="relative h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl border-4 border-red-900/50 overflow-hidden shadow-2xl">
        {/* Animated Blood Fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600 to-red-500"
          initial={{ height: "0%" }}
          animate={{ height: ["0%", "70%", "40%", "65%", "50%"] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {/* Blood Surface Effect */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 to-red-300 opacity-80"></div>

          {/* Blood Bubbles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-300 rounded-full opacity-60"
              style={{
                left: `${15 + i * 10}%`,
                bottom: `${20 + (i % 3) * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Container Highlights */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>

        {/* Measurement Markings */}
        <div className="absolute right-2 top-4 bottom-4 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-8 h-0.5 bg-red-400/50"></div>
              <span className="text-red-300 text-xs ml-2 font-mono">
                {100 - i * 25}%
              </span>
            </div>
          ))}
        </div>

        {/* Floating Droplets */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`droplet-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <Droplets className="w-4 h-4 text-red-400" />
          </motion.div>
        ))}

        {/* Status Indicator */}
        <motion.div
          className="absolute top-4 left-4 flex items-center space-x-2"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-300 text-sm font-medium">Active</span>
        </motion.div>

        {/* Volume Text */}
        <motion.div
          className="absolute bottom-4 left-4 text-red-200"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-lg font-bold">450ml</div>
          <div className="text-xs">Current Volume</div>
        </motion.div>
      </div>

      {/* Base Stand */}
      <div className="mt-4 flex justify-center">
        <div className="w-32 h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full shadow-lg"></div>
      </div>

      {/* Connection Tube */}
      <motion.div
        className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-16 h-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full"
        animate={{ scaleX: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute right-0 w-4 h-4 bg-red-500 rounded-full"></div>
      </motion.div>

      {/* Dripping Effect */}
      <motion.div
        className="absolute -right-4 top-1/3 w-2 h-8 bg-red-500 rounded-b-full"
        animate={{
          height: [8, 12, 8],
          opacity: [0.8, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default AnimatedBloodFill;
