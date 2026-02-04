import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  MessageSquare,
} from "lucide-react";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Request Confirmed",
      message: "Your blood request has been confirmed",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Low Stock Alert",
      message: "Blood type O- is running low",
      time: "5 min ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Donation Reminder",
      message: "Your next donation is due in 2 weeks",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "emergency",
      title: "Emergency Request",
      message: "Nearby hospital needs O+ blood urgently",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
      case "emergency":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-purple-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "border-green-500/30 bg-green-500/5";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5";
      case "info":
        return "border-blue-500/30 bg-blue-500/5";
      case "emergency":
        return "border-red-500/30 bg-red-500/5";
      case "message":
        return "border-purple-500/30 bg-purple-500/5";
      default:
        return "border-gray-500/30 bg-gray-500/5";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-300" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Notifications
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-gray-400 hover:text-white"
              >
                Clear All
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-700">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 ${
                        !notification.read ? "bg-gray-750" : ""
                      } ${getNotificationColor(notification.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium ${
                                notification.read
                                  ? "text-gray-300"
                                  : "text-white"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <p
                              className={`text-sm mt-1 ${
                                notification.read
                                  ? "text-gray-400"
                                  : "text-gray-300"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => clearNotification(notification.id)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
