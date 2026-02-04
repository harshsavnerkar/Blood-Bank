import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Droplets,
  Calendar,
  MapPin,
  Phone,
  Award,
  Activity,
  Heart,
} from "lucide-react";
import { mockDonorProfile, mockDonorStats } from "../../utils/mockData";

const ProfileCard = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "eligible":
        return "text-green-400 bg-green-500/20 border border-green-500/30";
      case "ineligible":
        return "text-red-400 bg-red-500/20 border border-red-500/30";
      case "pending":
        return "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30";
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
      <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Full Name</p>
            <p className="text-white font-medium">{mockDonorProfile.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Blood Type</p>
            <div className="flex items-center">
              <Droplets className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-red-400 font-medium text-xl">
                {mockDonorProfile.bloodType}
              </p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Last Donation</p>
            <p className="text-white font-medium">
              {mockDonorProfile.lastDonation}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Next Eligible Date</p>
            <p className="text-white font-medium">
              {mockDonorProfile.nextEligible}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-white font-medium">
              {mockDonorProfile.location}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Contact</p>
            <p className="text-white font-medium">{mockDonorProfile.contact}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Donations</p>
            <p className="text-white font-medium">
              {mockDonorProfile.donationsCount}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Status</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                mockDonorProfile.status
              )}`}
            >
              {mockDonorProfile.status.charAt(0).toUpperCase() +
                mockDonorProfile.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
