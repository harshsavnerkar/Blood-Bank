import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Building } from "lucide-react";
import { mockNearbyHospitals } from "../../utils/mockData";

const ExchangeSection = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "text-green-400 bg-green-500/20";
      case "limited":
        return "text-yellow-400 bg-yellow-500/20";
      case "unavailable":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Hospital Exchange</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNearbyHospitals.map((hospital, index) => (
          <motion.div
            key={hospital.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 glass-card rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {hospital.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  hospital.status
                )}`}
              >
                {hospital.status.charAt(0).toUpperCase() +
                  hospital.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center text-gray-300 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{hospital.distance}</span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">
                Available Blood Types:
              </p>
              <div className="flex flex-wrap gap-2">
                {hospital.bloodTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-800 text-white text-xs rounded"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                Request
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                Offer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeSection;
