import React from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  User,
  Heart,
  MapPin,
  Phone,
  CheckCircle,
} from "lucide-react";

const MatchingVisualization = ({ status = "matching" }) => {
  const getStatusText = () => {
    switch (status) {
      case "matching":
        return "Finding compatible donors nearby...";
      case "alert_sent":
        return "Alerts sent to nearby donors";
      case "confirmed":
        return "Donor confirmed and coming to help";
      case "completed":
        return "Blood successfully donated";
      default:
        return "Processing request...";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "matching":
        return <Droplets className="w-8 h-8 text-blue-400" />;
      case "alert_sent":
        return <Phone className="w-8 h-8 text-yellow-400" />;
      case "confirmed":
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case "completed":
        return <Heart className="w-8 h-8 text-red-400" />;
      default:
        return <Droplets className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="glass-card p-8 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        Matching Process
      </h3>

      <div className="relative flex items-center justify-center mb-8">
        {/* Visual flow lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border-2 border-dashed border-blue-500/30"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-48 h-48 rounded-full border-2 border-dashed border-purple-500/30 animate-spin"
            style={{ animationDuration: "10s" }}
          ></div>
        </div>

        {/* Central patient node */}
        <div className="relative z-10">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <Heart className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Donor nodes */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500">
            <User className="w-6 h-6 text-green-400" />
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500">
            <User className="w-6 h-6 text-green-400" />
          </div>
        </div>

        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500">
            <User className="w-6 h-6 text-green-400" />
          </div>
        </div>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500">
            <User className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-4"
        >
          {getStatusIcon()}
        </motion.div>
        <p className="text-gray-300 text-lg">{getStatusText()}</p>

        <div className="mt-6 flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="w-3 h-3 bg-red-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingVisualization;
