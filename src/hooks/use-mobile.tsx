/**
 * Mobile detection hook
 * Provides a custom hook for detecting mobile devices and screen sizes
 */
import { useEffect, useState } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
