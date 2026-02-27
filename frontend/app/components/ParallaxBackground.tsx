"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function ParallaxBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth) - 0.5;
            const y = (clientY / innerHeight) - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const x1 = useTransform(springX, (v) => v * 100);
    const y1 = useTransform(springY, (v) => v * 100);
    const x2 = useTransform(springX, (v) => v * -150);
    const y2 = useTransform(springY, (v) => v * -150);
    const x3 = useTransform(springX, (v) => v * 50);
    const y3 = useTransform(springY, (v) => v * 50);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Large gradient orbs with parallax */}
            <motion.div
                style={{ x: x1, y: y1 }}
                className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-gradient-to-bl from-blue-600/30 to-transparent rounded-full blur-3xl"
            />
            <motion.div
                style={{ x: x2, y: y2 }}
                className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-purple-600/25 to-transparent rounded-full blur-3xl"
            />
            <motion.div
                style={{ x: x3, y: y3 }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/20 to-transparent rounded-full blur-3xl shadow-[0_0_100px_rgba(99,102,241,0.1)]"
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-950" />
        </div>
    );
}
