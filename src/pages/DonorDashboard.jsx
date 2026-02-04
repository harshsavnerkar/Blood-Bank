import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  MapPin,
  Bell,
  User,
  Droplets,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

const DonorDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const [isAvailable, setIsAvailable] = useState(true);

  const donorProfile = {
    name: "John Smith",
    bloodType: "O+",
    lastDonation: "2024-01-15",
    nextEligible: "2024-07-15",
    totalDonations: 12,
    location: "New York, NY",
  };

  const donationHistory = [
    {
      id: 1,
      date: "2024-01-15",
      location: "City Blood Center",
      units: 1,
      status: "completed",
    },
    {
      id: 2,
      date: "2023-07-20",
      location: "Hospital Blood Drive",
      units: 1,
      status: "completed",
    },
    {
      id: 3,
      date: "2023-01-10",
      location: "Community Center",
      units: 1,
      status: "completed",
    },
  ];

  const upcomingOpportunities = [
    {
      id: 1,
      date: "2024-03-15",
      location: "Downtown Blood Drive",
      time: "9:00 AM - 4:00 PM",
    },
    {
      id: 2,
      date: "2024-03-22",
      location: "University Campus",
      time: "10:00 AM - 3:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="glass-card m-6 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("donorDashboard")}
            </h1>
            <p className="text-gray-600">{t("helpSaveLives")}</p>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeLanguageToggle />

            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>

            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-red-500" />
              <span className="text-gray-900 font-medium">John Smith</span>
            </div>
          </div>
        </div>
      </header>

      {/* Availability Toggle */}
      <div className="mx-6 mb-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {t("donorAvailabilityFull")}
              </h2>
              <p className="text-gray-600">
                {isAvailable
                  ? t("availableForDonation")
                  : t("currentlyUnavailable")}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isAvailable
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </span>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  isAvailable ? "bg-red-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAvailable ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mx-6 mb-6">
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-xl p-1">
          {[
            { id: "profile", label: t("myProfile"), icon: User },
            { id: "history", label: t("donorHistoryFull"), icon: Calendar },
            {
              id: "opportunities",
              label: t("donationOpportunities"),
              icon: MapPin,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6">
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 rounded-2xl text-center">
                <Droplets className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">
                  {donorProfile.bloodType}
                </p>
                <p className="text-gray-600 text-sm">Blood Type</p>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">
                  {donorProfile.totalDonations}
                </p>
                <p className="text-gray-600 text-sm">Total Donations</p>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-gray-600 text-sm">Months Ago</p>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">Eligible</p>
                <p className="text-gray-600 text-sm">Status</p>
              </div>
            </div>

            {/* Personal Info */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("personalInformation")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <p className="text-gray-900 font-medium">
                    {donorProfile.name}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Blood Type
                  </label>
                  <p className="text-red-600 font-medium">
                    {donorProfile.bloodType}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Last Donation
                  </label>
                  <p className="text-gray-900">{donorProfile.lastDonation}</p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Next Eligible Date
                  </label>
                  <p className="text-gray-900">{donorProfile.nextEligible}</p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Location
                  </label>
                  <p className="text-gray-900">{donorProfile.location}</p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Total Donations
                  </label>
                  <p className="text-gray-900">{donorProfile.totalDonations}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("donorHistoryFull")}
              </h2>

              <div className="space-y-4">
                {donationHistory.map((donation) => (
                  <div
                    key={donation.id}
                    className="glass-card p-4 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {donation.location}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Date: {donation.date}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Units Donated: {donation.units}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "opportunities" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("upcomingOpportunities")}
              </h2>

              <div className="space-y-4">
                {upcomingOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="glass-card p-4 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {opportunity.location}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Date: {opportunity.date}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Time: {opportunity.time}
                        </p>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
