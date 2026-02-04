import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Droplets, Users, Shield } from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

const LandingPage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Blood Inventory",
      description: "Real-time tracking of blood units with expiry monitoring",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Emergency Requests",
      description: "Quick response system for urgent blood needs",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Donor Network",
      description: "Connect with eligible donors instantly",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description: "HIPAA compliant data protection",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-red-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center py-8"
        >
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">LifeShare</span>
          </div>

          {/* Language Toggle */}
          <ThemeLanguageToggle />

          <div className="hidden md:flex space-x-8">
            <Link
              to="/auth"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t("login")}
            </Link>
            <Link
              to="/auth"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t("signup")}
            </Link>
          </div>
          <Link
            to="/auth"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {t("getStarted")}
          </Link>
        </motion.nav>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between pt-16 pb-24"
        >
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0"
          >
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {t("welcome")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                {t("saveLives")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-700 mb-8 max-w-lg"
            >
              {t("landingDescription") ||
                "Connect blood donors with patients in need through our intelligent matching system. Save lives with technology."}
            </motion.p>

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <Link
                to="/auth"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {t("joinHospital")}
              </Link>
              <Link
                to="/auth"
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:bg-gray-100"
              >
                {t("registerDonor")}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              <motion.div
                className="glass-card p-8 rounded-3xl w-full max-w-md"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                      LifeShare Dashboard
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -left-4 bg-red-500 rounded-full p-3 glass-card"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Droplets className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 bg-blue-500 rounded-full p-3 glass-card"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="py-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            {t("powerfulFeatures") || "Powerful Features"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl text-center"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-center mb-4 text-red-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t(feature.title) || feature.title}
                </h3>
                <p className="text-gray-600">
                  {t(feature.description) || feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t("readyToMakeADifference") || "Ready to Make a Difference?"}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            {t("joinThousands") ||
              "Join thousands of healthcare professionals and donors making a difference every day."}
          </p>
          <Link
            to="/auth"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {t("startSavingLives") || "Start Saving Lives"}
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default LandingPage;
