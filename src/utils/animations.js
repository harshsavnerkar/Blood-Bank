// Animation variants for Framer Motion

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 25px rgba(0, 0, 0, 0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

export const cardTilt = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.05,
    rotateX: -5,
    rotateY: 5,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 200,
    },
  },
};

export const bounceIn = {
  hidden: { scale: 0.3, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};
