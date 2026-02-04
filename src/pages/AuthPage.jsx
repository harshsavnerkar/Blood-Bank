import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

const AuthPage = () => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    setTimeout(() => {
      navigate("/role-selection");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-red-50 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header with Language Toggle */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">LifeShare</span>
          </div>
          <ThemeLanguageToggle />
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? t("welcomeBack") : t("createAccount")}
            </h1>
            <p className="text-gray-600">
              {isLogin ? t("signInToContinue") : t("joinOurCommunity")}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-white/50 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isLogin
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {t("login")}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isLogin
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {t("signup")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    {t("fullName")}
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder={t("enterFullName")}
                      required={!isLogin}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t("email")}
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={t("enterEmail")}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t("password")}
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={t("enterPassword")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    {t("confirmPassword")}
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder={t("confirmPassword")}
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    {t("rememberMe")}
                  </span>
                </label>
                <a
                  href="#"
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  {t("forgotPassword")}
                </a>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-lg"
            >
              {isLogin ? t("login") : t("signup")}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                {isLogin ? t("signup") : t("login")}
              </button>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            ← {t("backToHome")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
