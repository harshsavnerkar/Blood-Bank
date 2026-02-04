import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  variant = "default",
  hoverEffect = false,
  ...props
}) => {
  const baseClasses = "rounded-xl border transition-all duration-300";

  const variants = {
    default: "bg-white/10 border-white/20 backdrop-blur-lg",
    elevated: "bg-white/10 border-white/20 backdrop-blur-lg shadow-xl",
    outlined: "bg-transparent border-gray-700",
    filled: "bg-gray-800/50 border-gray-700",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-6 pb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-xl font-semibold text-white ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-gray-400 mt-2 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
