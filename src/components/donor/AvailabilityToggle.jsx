import React, { useState } from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

const AvailabilityToggle = ({ initialAvailability = true }) => {
  const [availability, setAvailability] = useState(initialAvailability);

  const toggleAvailability = () => {
    setAvailability(!availability);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center mb-4 md:mb-0">
        <div className="mr-4">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
            <Droplets className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            Blood Type: <span className="text-red-400">O+</span>
          </h3>
          <p className="text-gray-300">Universal donor</p>
        </div>
      </div>
      <div className="flex items-center">
        <span
          className={`mr-3 font-medium ${
            availability ? "text-green-400" : "text-gray-400"
          }`}
        >
          {availability ? "Available" : "Unavailable"}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAvailability}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            availability ? "bg-red-500" : "bg-gray-600"
          }`}
        >
          <motion.span
            animate={{ x: availability ? 24 : 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block h-4 w-4 transform rounded-full bg-white"
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AvailabilityToggle;
