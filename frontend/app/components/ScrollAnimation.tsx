"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "zoom-in";
  delay?: number;
}

export function ScrollAnimation({ 
  children, 
  className = "", 
  animation = "fade-up",
  delay = 0 
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const animations = {
    "fade-up": "translate-y-8 opacity-0",
    "fade-down": "-translate-y-8 opacity-0",
    "fade-left": "translate-x-8 opacity-0",
    "fade-right": "-translate-x-8 opacity-0",
    "scale-up": "scale-90 opacity-0",
    "zoom-in": "scale-75 opacity-0",
  };

  const visibleStates = {
    "fade-up": "translate-y-0 opacity-100",
    "fade-down": "translate-y-0 opacity-100",
    "fade-left": "translate-x-0 opacity-100",
    "fade-right": "translate-x-0 opacity-100",
    "scale-up": "scale-100 opacity-100",
    "zoom-in": "scale-100 opacity-100",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? visibleStates[animation] : animations[animation]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
