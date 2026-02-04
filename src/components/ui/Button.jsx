import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center";

  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    outline: "border border-red-500 text-red-400 hover:bg-red-500/10",
    ghost: "text-gray-300 hover:text-white hover:bg-white/10",
    danger:
      "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const classes = `${baseClasses} ${variants[variant]} ${
    sizes[size]
  } ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
