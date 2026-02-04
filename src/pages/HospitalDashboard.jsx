import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Users,
  Bell,
  Plus,
  TrendingUp,
  AlertTriangle,
  Building,
  Heart,
  Search,
  Filter,
} from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

const HospitalDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("inventory");

  const bloodInventory = [
    { type: "A+", units: 24, status: "available" },
    { type: "A-", units: 8, status: "low" },
    { type: "B+", units: 15, status: "available" },
    { type: "B-", units: 3, status: "critical" },
    { type: "AB+", units: 12, status: "available" },
    { type: "AB-", units: 2, status: "critical" },
    { type: "O+", units: 35, status: "available" },
    { type: "O-", units: 6, status: "low" },
  ];

  const emergencyRequests = [
    {
      id: 1,
      patient: "Sarah Johnson",
      bloodType: "O-",
      units: 2,
      hospital: "City General",
      status: "urgent",
      time: "10 min ago",
    },
    {
      id: 2,
      patient: "Michael Chen",
      bloodType: "AB+",
      units: 1,
      hospital: "St. Mary's",
      status: "pending",
      time: "25 min ago",
    },
  ];

  const getStatusBarColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "low":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available";
      case "low":
        return "Low Stock";
      case "critical":
        return "Critical";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="glass-card m-6 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("hospitalDashboard")}
            </h1>
            <p className="text-gray-600">{t("hospitalManageBlood")}</p>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeLanguageToggle />

            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>

            <div className="flex items-center space-x-3">
              <Building className="w-6 h-6 text-red-500" />
              <span className="text-gray-900 font-medium">
                City General Hospital
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="mx-6 mb-6">
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-xl p-1">
          {[
            { id: "inventory", label: t("bloodInventory"), icon: Droplets },
            {
              id: "requests",
              label: t("emergencyRequests"),
              icon: AlertTriangle,
            },
            { id: "exchange", label: t("hospitalExchange"), icon: Building },
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
        {activeTab === "inventory" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Units</p>
                    <p className="text-3xl font-bold text-gray-900">105</p>
                  </div>
                  <Droplets className="w-12 h-12 text-red-500" />
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Donors</p>
                    <p className="text-3xl font-bold text-gray-900">247</p>
                  </div>
                  <Users className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Critical Types</p>
                    <p className="text-3xl font-bold text-gray-900">3</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Blood Inventory Grid */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("bloodInventory")}
                </h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search blood types..."
                      className="pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/50 border border-gray-200 rounded-lg hover:bg-white/70 transition-colors">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Add Units</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bloodInventory.map((item, index) => (
                  <motion.div
                    key={item.type}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="blood-type-card text-center"
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {item.type}
                    </div>
                    <div className="text-3xl font-bold text-red-600 mb-3">
                      {item.units}
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusBarColor(
                          item.status
                        )}`}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "requests" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("emergencyRequests")}
              </h2>

              <div className="space-y-4">
                {emergencyRequests.map((request) => (
                  <div
                    key={request.id}
                    className="glass-card p-4 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {request.patient}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Blood Type:{" "}
                          <span className="font-medium text-red-600">
                            {request.bloodType}
                          </span>
                        </p>
                        <p className="text-gray-600 text-sm">
                          Units Needed: {request.units}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Hospital: {request.hospital}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.status === "urgent"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status}
                        </span>
                        <p className="text-gray-500 text-sm mt-2">
                          {request.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "exchange" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("hospitalExchange")}
              </h2>
              <div className="text-center py-12">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {t("hospitalExchangeComingSoon")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;
