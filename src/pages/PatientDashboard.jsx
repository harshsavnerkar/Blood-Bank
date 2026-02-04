import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  AlertTriangle,
  MapPin,
  Phone,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

const PatientDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("requests");
  const [requestStep, setRequestStep] = useState(1);
  const [bloodType, setBloodType] = useState("");
  const [unitsNeeded, setUnitsNeeded] = useState(1);
  const [hospital, setHospital] = useState("");
  const [urgency, setUrgency] = useState("normal");

  const nearbyHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      distance: "2.3 miles",
      available: true,
    },
    {
      id: 2,
      name: "St. Mary's Medical Center",
      distance: "3.1 miles",
      available: true,
    },
    {
      id: 3,
      name: "Community Regional Hospital",
      distance: "4.7 miles",
      available: false,
    },
  ];

  const emergencyRequests = [
    {
      id: 1,
      bloodType: "O-",
      units: 2,
      hospital: "City General",
      status: "matched",
      time: "15 min ago",
    },
    {
      id: 2,
      bloodType: "AB+",
      units: 1,
      hospital: "St. Mary's",
      status: "pending",
      time: "1 hour ago",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "matched":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (requestStep < 3) {
      setRequestStep(requestStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="glass-card m-6 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("patientDashboard")}
            </h1>
            <p className="text-gray-600">{t("findBloodSupport")}</p>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeLanguageToggle />

            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-red-500" />
              <span className="text-gray-900 font-medium">Patient Portal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="mx-6 mb-6">
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-xl p-1">
          {[
            { id: "requests", label: t("myRequests"), icon: AlertTriangle },
            { id: "nearby", label: t("nearbyHospitals"), icon: MapPin },
            { id: "new", label: t("newRequest"), icon: Heart },
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
        {activeTab === "requests" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("myEmergencyRequests")}
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
                          Blood Type:{" "}
                          <span className="text-red-600">
                            {request.bloodType}
                          </span>
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Units Needed: {request.units}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Hospital: {request.hospital}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            request.status
                          )}`}
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

        {activeTab === "nearby" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("nearbyHospitals")}
              </h2>

              <div className="space-y-4">
                {nearbyHospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="glass-card p-4 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {hospital.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Distance: {hospital.distance}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            hospital.available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {hospital.available ? "Available" : "Unavailable"}
                        </span>
                        <button
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            hospital.available
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={!hospital.available}
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "new" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("newBloodRequest")}
              </h2>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                          step <= requestStep
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step < requestStep ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          step
                        )}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-16 h-1 h-1 mx-2 ${
                            step < requestStep ? "bg-red-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleSubmitRequest}
                className="max-w-2xl mx-auto"
              >
                {requestStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      {t("patientInformation")}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Patient Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter patient name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Blood Type *
                        </label>
                        <select
                          value={bloodType}
                          onChange={(e) => setBloodType(e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select blood type</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Units Needed *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={unitsNeeded}
                          onChange={(e) => setUnitsNeeded(e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Urgency Level *
                        </label>
                        <select
                          value={urgency}
                          onChange={(e) => setUrgency(e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        >
                          <option value="normal">Normal</option>
                          <option value="urgent">Urgent</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {requestStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      {t("hospitalInformation")}
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Select Hospital *
                        </label>
                        <select
                          value={hospital}
                          onChange={(e) => setHospital(e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select a hospital</option>
                          {nearbyHospitals
                            .filter((h) => h.available)
                            .map((h) => (
                              <option key={h.id} value={h.name}>
                                {h.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Contact Person
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Name of contact person"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Contact Phone
                          </label>
                          <div className="relative">
                            <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="tel"
                              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {requestStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      {t("reviewAndSubmit")}
                    </h3>

                    <div className="glass-card rounded-xl p-6 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Request Summary
                      </h4>
                      <div className="space-y-2 text-gray-700">
                        <p>
                          <span className="font-medium">Blood Type:</span>{" "}
                          {bloodType}
                        </p>
                        <p>
                          <span className="font-medium">Units Needed:</span>{" "}
                          {unitsNeeded}
                        </p>
                        <p>
                          <span className="font-medium">Hospital:</span>{" "}
                          {hospital}
                        </p>
                        <p>
                          <span className="font-medium">Urgency:</span>{" "}
                          {urgency}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setRequestStep(requestStep - 1)}
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Submit Request</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {requestStep < 3 && (
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={() =>
                        setRequestStep(Math.max(1, requestStep - 1))
                      }
                      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                      disabled={requestStep === 1}
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
