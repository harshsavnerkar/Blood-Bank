import React from "react";
import { motion } from "framer-motion";
import { Droplets, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { mockBloodInventory, mockHospitalStats } from "../../utils/mockData";
import { itemVariants } from "../../utils/animations";

const OverviewSection = () => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Units</p>
              <p className="text-3xl font-bold text-white">
                {mockHospitalStats.totalUnits}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Low Stock</p>
              <p className="text-3xl font-bold text-yellow-400">
                {mockHospitalStats.lowStock}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Critical Levels</p>
              <p className="text-3xl font-bold text-red-400">
                {mockHospitalStats.criticalLevels}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Active Requests</p>
              <p className="text-3xl font-bold text-blue-400">
                {mockHospitalStats.activeRequests}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blood Type Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="glass-card p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Blood Inventory Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {mockBloodInventory.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="blood-type-card"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">
                  {item.type}
                </div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "available"
                      ? "text-green-400 bg-green-500/20 border border-green-500/30"
                      : item.status === "low"
                      ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30"
                      : "text-red-400 bg-red-500/20 border border-red-500/30"
                  }`}
                >
                  {item.quantity} units
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Exp: {item.expiry.split("-")[1]}/{item.expiry.split("-")[2]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Near Expiry Warning */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="glass-card p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Near Expiry Alerts
        </h2>
        <div className="space-y-4">
          {mockBloodInventory
            .filter((item) => item.status !== "available")
            .map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-white font-medium">{item.type}</span>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "low"
                        ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30"
                        : "text-red-400 bg-red-500/20 border border-red-500/30"
                    }`}
                  >
                    {item.quantity} units
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Expires: {item.expiry}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OverviewSection;
