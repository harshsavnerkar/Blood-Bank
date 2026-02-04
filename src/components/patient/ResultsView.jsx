import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Hospital, Users } from "lucide-react";
import { mockNearbyOptions } from "../../utils/mockData";

const ResultsView = () => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case "high":
        return "text-green-400 bg-green-500/20 border border-green-500/30";
      case "available":
        return "text-green-400 bg-green-500/20 border border-green-500/30";
      case "limited":
        return "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30";
      case "low":
        return "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30";
      case "unavailable":
        return "text-red-400 bg-red-500/20 border border-red-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border border-gray-500/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Nearby Matches</h2>
      <div className="space-y-4">
        {mockNearbyOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 glass-card rounded-2xl flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="mr-4">
                {option.type === "hospital" ? (
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-blue-400" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {option.name}
                </h3>
                <div className="flex items-center text-gray-300 mt-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{option.distance}</span>
                  <span className="mx-2">•</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getAvailabilityColor(
                      option.availability
                    )}`}
                  >
                    {option.availability}
                  </span>
                </div>
                {option.type === "hospital" ? (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {option.bloodAvailable.map((type, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                      {option.bloodType}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResultsView;
