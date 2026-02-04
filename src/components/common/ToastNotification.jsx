import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

const ToastNotification = ({ toasts, removeToast }) => {
  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  const getToastColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border border-green-500/30 text-green-400";
      case "error":
        return "bg-red-500/20 border border-red-500/30 text-red-400";
      case "warning":
        return "bg-yellow-500/20 border border-yellow-500/30 text-yellow-400";
      case "info":
        return "bg-blue-500/20 border border-blue-500/30 text-blue-400";
      default:
        return "bg-gray-500/20 border border-gray-500/30 text-gray-400";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`glass-card p-4 rounded-lg flex items-start space-x-3 min-w-80 max-w-md ${getToastColor(
              toast.type
            )}`}
          >
            <div className="pt-0.5">{getToastIcon(toast.type)}</div>
            <div className="flex-1">
              <h4 className="font-medium text-white">{toast.title}</h4>
              <p className="text-sm text-gray-300 mt-1">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification;
