"use client";

import { motion } from "framer-motion";

const activities = [
    "New prediction generated in California",
    "XGBoost Model updated to v2.4.1",
    "Market trend detected: Salary increase in Data Engineering",
    "New user joined from Madrid, Spain",
    "Precision benchmark improved by 0.5%",
    "New prediction generated in New York",
    "System health: 100% operational",
    "Trending role: ML Scientist (+12% growth)",
];

export function LiveTicker() {
    return (
        <div className="relative py-4 bg-slate-900/5 dark:bg-white/5 border-y border-slate-200/50 dark:border-slate-800/50 overflow-hidden whitespace-nowrap">
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="inline-flex gap-12"
            >
                {[...activities, ...activities].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                            {activity}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
