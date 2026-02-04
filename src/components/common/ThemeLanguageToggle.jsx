import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const ThemeLanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languageOptions = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  ];

  const currentLanguage = languageOptions.find(
    (lang) => lang.code === language
  );

  return (
    <div className="flex items-center">
      {/* Language Selector */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <Globe className="w-5 h-5 text-gray-300" />
          <span className="text-white font-medium text-sm">
            {currentLanguage?.nativeName}
          </span>
          <motion.div
            animate={{ rotate: showLanguageMenu ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showLanguageMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setShowLanguageMenu(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50"
              >
                <div className="py-2">
                  {languageOptions.map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors ${
                        language === lang.code
                          ? "bg-red-500/20 text-white"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <span className="font-medium">{lang.nativeName}</span>
                      {language === lang.code && (
                        <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeLanguageToggle;
