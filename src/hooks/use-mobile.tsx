
'use client';
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Check on mount
    checkSize();

    // Add listener for window resize
    window.addEventListener("resize", checkSize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isMobile;
}
