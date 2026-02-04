import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Clock, X, Check } from "lucide-react";
import { mockNotifications } from "../../utils/mockData";

const EmergencyAlerts = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const dismissNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass-card p-4 rounded-xl flex items-center justify-between ${
            notification.urgent
              ? "border-l-4 border-red-500"
              : "border-l-4 border-blue-500"
          }`}
        >
          <div className="flex items-center">
            {notification.urgent ? (
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-red-400" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
            )}
            <div>
              <p className="text-white font-medium">{notification.message}</p>
              <p className="text-gray-400 text-sm">{notification.time}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-full">
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EmergencyAlerts;
