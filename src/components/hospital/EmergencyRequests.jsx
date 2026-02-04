import React from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Phone,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { mockEmergencyRequests } from "../../utils/mockData";

const EmergencyRequests = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "text-blue-400 bg-blue-500/20 border border-blue-500/30";
      case "matching":
        return "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30";
      case "fulfilled":
        return "text-green-400 bg-green-500/20 border border-green-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border border-gray-500/30";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-500/20";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20";
      case "low":
        return "text-green-400 bg-green-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Emergency Requests</h2>
      <div className="space-y-4">
        {mockEmergencyRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 glass-card rounded-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </span>
                  <span
                    className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      request.priority
                    )}`}
                  >
                    {request.priority.charAt(0).toUpperCase() +
                      request.priority.slice(1)}{" "}
                    Priority
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {request.patient}
                </h3>
                <div className="flex items-center text-gray-300 mt-2">
                  <Droplets className="w-4 h-4 mr-2" />
                  <span>Blood Type: {request.bloodType}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {request.quantity} unit{request.quantity > 1 ? "s" : ""}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{request.time}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyRequests;
