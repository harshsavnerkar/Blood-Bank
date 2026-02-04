import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle } from "lucide-react";
import { mockDonationHistory } from "../../utils/mockData";

const DonationHistory = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-blue-400 bg-blue-500/20 border border-blue-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border border-gray-500/30";
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Donation History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 text-gray-300">Date</th>
              <th className="text-left py-3 text-gray-300">Location</th>
              <th className="text-left py-3 text-gray-300">Volume</th>
              <th className="text-left py-3 text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockDonationHistory.map((donation, index) => (
              <motion.tr
                key={donation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-800 hover:bg-white/5 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-white">{donation.date}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-white">{donation.location}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-white">{donation.volume}</span>
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      donation.status
                    )}`}
                  >
                    {donation.status.charAt(0).toUpperCase() +
                      donation.status.slice(1)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationHistory;
