import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  MapPin,
  Phone,
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { bloodTypes } from "../../utils/mockData";

const RequestForm = ({
  currentStep,
  setCurrentStep,
  requestData,
  setRequestData,
}) => {
  const handleInputChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitRequest = () => {
    // In a real app, this would submit the request
    setCurrentStep(4); // Show results
  };

  // Step 1: Request Details
  if (currentStep === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Blood Request Details
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Blood Type Needed
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setRequestData({ ...requestData, bloodType: type })
                  }
                  className={`p-3 rounded-xl border transition-all duration-200 ${
                    requestData.bloodType === type
                      ? "border-red-500 bg-red-500/20 text-white"
                      : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quantity Needed (Units)
            </label>
            <input
              type="number"
              name="quantity"
              value={requestData.quantity}
              onChange={handleInputChange}
              min="1"
              max="10"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter number of units needed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  value: "low",
                  label: "Low",
                  icon: <Clock className="w-4 h-4" />,
                },
                {
                  value: "medium",
                  label: "Medium",
                  icon: <Heart className="w-4 h-4" />,
                },
                {
                  value: "high",
                  label: "High",
                  icon: <AlertTriangle className="w-4 h-4" />,
                },
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() =>
                    setRequestData({ ...requestData, urgency: level.value })
                  }
                  className={`p-3 rounded-xl border transition-all duration-200 flex flex-col items-center ${
                    requestData.urgency === level.value
                      ? "border-red-500 bg-red-500/20 text-white"
                      : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {level.icon}
                  <span className="text-sm mt-1">{level.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={requestData.notes}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Any additional information about the request..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNextStep}
              disabled={!requestData.bloodType || !requestData.quantity}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                requestData.bloodType && requestData.quantity
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue to Location
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Step 2: Location & Contact
  if (currentStep === 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Location & Contact Information
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hospital/Location
            </label>
            <input
              type="text"
              name="location"
              value={requestData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter hospital name or address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={requestData.contact}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter contact number"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevStep}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              disabled={!requestData.location || !requestData.contact}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                requestData.location && requestData.contact
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Review Request
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Step 3: Review & Submit
  if (currentStep === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Review Your Request
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">
                Request Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Blood Type:</span>
                  <span className="text-white font-medium">
                    {requestData.bloodType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quantity:</span>
                  <span className="text-white font-medium">
                    {requestData.quantity} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Urgency:</span>
                  <span
                    className={`font-medium ${
                      requestData.urgency === "high"
                        ? "text-red-400"
                        : requestData.urgency === "medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {requestData.urgency.charAt(0).toUpperCase() +
                      requestData.urgency.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">
                Location & Contact
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white font-medium">
                    {requestData.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact:</span>
                  <span className="text-white font-medium">
                    {requestData.contact}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {requestData.notes && (
            <div className="glass-card p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">
                Additional Notes
              </h3>
              <p className="text-gray-300">{requestData.notes}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handlePrevStep}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmitRequest}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Submit Emergency Request
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Step 4: Results
  if (currentStep === 4) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="glass-card p-6 rounded-2xl">
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Request Submitted Successfully!
            </h2>
            <p className="text-gray-300">
              Your emergency blood request has been sent to nearby hospitals and
              donors
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 p-4 rounded-xl mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-400 font-medium">
                Request ID: LS-{Date.now().toString().slice(-6)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default RequestForm;
