import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Building,
  Stethoscope,
  Users,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";
import { AuthContext } from "../App";

const EnhancedAuthPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [authType, setAuthType] = useState("user"); // 'user' or 'admin'
  const [isLogin, setIsLogin] = useState(true); // For user flow
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    // Mock validation
    if (authType === "admin") {
      if (!formData.email || !formData.password) {
        setMessage({ type: "error", text: "Please fill in all fields" });
        setIsLoading(false);
        return;
      }

      // Mock admin validation
      if (
        formData.email === "admin@hospital.com" &&
        formData.password === "admin123"
      ) {
        setTimeout(() => {
          setMessage({
            type: "success",
            text: "Admin login successful! Redirecting...",
          });
          // Login and redirect to admin dashboard
          login({ email: formData.email, name: "Hospital Admin" }, "admin");
          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 1500);
        }, 1500);
      } else {
        setTimeout(() => {
          setMessage({ type: "error", text: "Invalid admin credentials" });
          setIsLoading(false);
        }, 1500);
      }
    } else {
      // User flow validation
      if (!isLogin) {
        // Signup validation
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setMessage({ type: "error", text: "Please fill in all fields" });
          setIsLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: "error", text: "Passwords do not match" });
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setMessage({
            type: "error",
            text: "Password must be at least 6 characters",
          });
          setIsLoading(false);
          return;
        }
        setTimeout(() => {
          setMessage({
            type: "success",
            text: "Account created successfully! Redirecting to dashboard...",
          });
          // Login and redirect to user dashboard
          login({ email: formData.email, name: formData.name }, "user");
          setTimeout(() => {
            navigate("/user-dashboard");
          }, 1500);
        }, 1500);
      } else {
        // Login validation
        if (!formData.email || !formData.password) {
          setMessage({ type: "error", text: "Please fill in all fields" });
          setIsLoading(false);
          return;
        }
        setTimeout(() => {
          setMessage({
            type: "success",
            text: "Login successful! Redirecting to dashboard...",
          });
          // Login and redirect to user dashboard
          login({ email: formData.email, name: "User" }, "user");
          setTimeout(() => {
            navigate("/user-dashboard");
          }, 1500);
        }, 1500);
      }
    }
  };

  const socialLogin = (provider) => {
    setIsLoading(true);
    setMessage({ type: "info", text: `Signing in with ${provider}...` });
    setTimeout(() => {
      setMessage({
        type: "success",
        text: "Login successful! Redirecting to dashboard...",
      });
      // Login and redirect to user dashboard
      login({ email: "user@gmail.com", name: "Social User" }, "user");
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 1500);
    }, 1500);
  };

  const getMessageStyle = () => {
    switch (message.type) {
      case "error":
        return "bg-red-500/20 text-red-200 border border-red-500/30";
      case "success":
        return "bg-green-500/20 text-green-200 border border-green-500/30";
      case "info":
        return "bg-blue-500/20 text-blue-200 border border-blue-500/30";
      default:
        return "";
    }
  };

  const getMessageIcon = () => {
    switch (message.type) {
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/3 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header with Language Toggle */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-3">
            <Heart className="w-10 h-10 text-red-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">LifeShare</h1>
              <p className="text-gray-300">Blood Bank Management System</p>
            </div>
          </div>
          <ThemeLanguageToggle />
        </motion.div>

        {/* Auth Type Selection */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-white/10 backdrop-blur-lg rounded-2xl p-1 border border-white/20">
            <button
              onClick={() => setAuthType("user")}
              className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                authType === "user"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>User Portal</span>
            </button>
            <button
              onClick={() => setAuthType("admin")}
              className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                authType === "admin"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Shield className="w-5 h-5" />
              <span>Admin Login</span>
            </button>
          </div>
        </motion.div>

        {/* Admin Login */}
        {authType === "admin" && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="glass-card rounded-3xl p-8 shadow-2xl w-full max-w-md">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Hospital Admin
                </h2>
                <p className="text-black">
                  Secure access for healthcare professionals
                </p>
              </div>

              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg mb-6 flex items-center space-x-2 ${getMessageStyle()}`}
                >
                  {getMessageIcon()}
                  <span className="font-medium">{message.text}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-black text-sm font-medium mb-2">
                    Hospital Email
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="admin@hospital.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Admin Login</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}

        {/* User Login/Signup */}
        {authType === "user" && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="glass-card rounded-3xl p-8 shadow-2xl w-full max-w-md">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-black">
                  {isLogin
                    ? "Sign in to save lives"
                    : "Join our community of life savers"}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex bg-white/10 rounded-xl p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    isLogin
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-black hover:text-gray-800"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    !isLogin
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-black hover:text-gray-800"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg mb-6 flex items-center space-x-2 ${getMessageStyle()}`}
                >
                  {getMessageIcon()}
                  <span className="font-medium">{message.text}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div>
                      <label className="block text-black text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium"
                          placeholder="Enter your full name"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-black text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-300 transition-colors"
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
                      <label className="block text-black text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 font-medium"
                          placeholder="Confirm your password"
                          required={!isLogin}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-300 transition-colors"
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
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500 bg-white/10"
                      />
                      <span className="ml-2 text-black text-sm">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>
                        {isLogin ? "Signing in..." : "Creating account..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      <span>{isLogin ? "Login" : "Create Account"}</span>
                    </>
                  )}
                </motion.button>
              </form>

              {isLogin && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-900 text-gray-300">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => socialLogin("Google")}
                    className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-blue-600 hover:bg-blue-700 border border-blue-500 rounded-lg text-white font-medium transition-all duration-200"
                  >
                    <div className="w-5 h-5 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                      G
                    </div>
                    <span>Continue with Google</span>
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedAuthPage;
