import { useState, useEffect } from "react";

// Custom hook to track screen size and device type
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setScreenSize({
          width,
          height,
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024,
        });
      };

      // Initial call
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return screenSize;
};

// Breakpoint constants
export const BREAKPOINTS = {
  sm: 640, // Small screens
  md: 768, // Medium screens (tablets)
  lg: 1024, // Large screens (laptops)
  xl: 1280, // Extra large screens (desktops)
  "2xl": 1536, // 2x extra large screens
};

// Custom hook to check if screen matches a breakpoint
export const useBreakpoint = (breakpoint) => {
  const [matches, setMatches] = useState(false);
  const breakpointValue = BREAKPOINTS[breakpoint] || breakpoint;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(`(min-width: ${breakpointValue}px)`);

      const handleChange = (e) => setMatches(e.matches);

      // Initial check
      setMatches(mediaQuery.matches);

      // Add listener
      mediaQuery.addEventListener("change", handleChange);

      // Cleanup
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [breakpointValue]);

  return matches;
};

// Hook to check multiple breakpoints
export const useMultipleBreakpoints = (breakpoints) => {
  const [matches, setMatches] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const newMatches = {};

        Object.entries(breakpoints).forEach(([key, value]) => {
          const mediaQuery = window.matchMedia(`(min-width: ${value}px)`);
          newMatches[key] = mediaQuery.matches;
        });

        setMatches(newMatches);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [JSON.stringify(breakpoints)]);

  return matches;
};
