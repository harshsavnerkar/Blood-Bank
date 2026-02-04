import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Building, Heart, ArrowLeft, Shield, Stethoscope } from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

const RoleSelectionPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const roles = [
    {
      id: "hospital",
      title: t("hospitalBloodBank"),
      description: t("hospitalManageInventory"),
      icon: Building,
      path: "/hospital-dashboard",
      color: "from-red-500 to-red-600",
      features: [
        t("inventoryManagement"),
        t("emergencyRequests"),
        t("donorCoordination"),
      ],
    },
    {
      id: "donor",
      title: t("bloodDonor"),
      description: t("donorSaveLives"),
      icon: Heart,
      path: "/donor-dashboard",
      color: "from-green-500 to-green-600",
      features: [
        t("donorHistory"),
        t("donorAvailability"),
        t("healthTracking"),
      ],
    },
    {
      id: "patient",
      title: t("patientEmergency"),
      description: t("patientFindSupport"),
      icon: Stethoscope,
      path: "/patient-dashboard",
      color: "from-blue-500 to-blue-600",
      features: [
        t("emergencyRequests"),
        t("hospitalMatching"),
        t("realtimeUpdates"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-red-50">
      {/* Header with Language Toggle */}
      <header className="glass-card m-6 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/auth"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t("back")}</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t("selectYourRole")}
              </h1>
              <p className="text-gray-600">{t("chooseRoleDescription")}</p>
            </div>
          </div>

          {/* Language Toggle */}
          <ThemeLanguageToggle />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card rounded-3xl p-8 cursor-pointer group hover:shadow-2xl transition-all duration-300"
              onClick={() => navigate(role.path)}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <role.icon className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {role.title}
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {role.description}
              </p>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {t("keyFeatures")}
                </h3>
                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color}`}
                      ></div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                className="mt-8 pt-6 border-t border-gray-200"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-medium">
                    {t("selectRole")}
                  </span>
                  <ArrowLeft className="w-5 h-5 text-red-600 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card rounded-2xl p-8 mt-12 text-center"
        >
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t("securePlatform")}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("platformSecurityInfo")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
