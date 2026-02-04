import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Edit3, Trash2 } from "lucide-react";
import { mockBloodInventory } from "../../utils/mockData";

const InventorySection = () => {
  const [inventoryFilter, setInventoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = mockBloodInventory.filter(
    (item) =>
      (inventoryFilter === "all" || item.status === inventoryFilter) &&
      (searchTerm === "" ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "text-green-400 bg-green-500/20 border border-green-500/30";
      case "low":
        return "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30";
      case "critical":
        return "text-red-400 bg-red-500/20 border border-red-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">
          Blood Inventory
        </h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={inventoryFilter}
            onChange={(e) => setInventoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="low">Low</option>
            <option value="critical">Critical</option>
          </select>
          <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Unit</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 text-gray-300">Blood Type</th>
              <th className="text-left py-3 text-gray-300">Quantity</th>
              <th className="text-left py-3 text-gray-300">Status</th>
              <th className="text-left py-3 text-gray-300">Expiry Date</th>
              <th className="text-left py-3 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-800 hover:bg-white/5 transition-colors"
              >
                <td className="py-4">
                  <div className="font-medium text-white">{item.type}</div>
                </td>
                <td className="py-4">
                  <div className="text-white">{item.quantity} units</div>
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <div className="text-gray-300">{item.expiry}</div>
                </td>
                <td className="py-4">
                  <button className="text-red-400 hover:text-red-300 mr-3">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventorySection;
