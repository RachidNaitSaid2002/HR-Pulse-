"use client";

import { motion } from "framer-motion";
import {
    Users,
    Target,
    TrendingUp,
    Briefcase,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

const stats = [
    {
        name: "Average Predicted Salary",
        value: "$124,500",
        change: "+12.5%",
        trend: "up",
        icon: Target,
        color: "blue"
    },
    {
        name: "Total Predictions",
        value: "1,284",
        change: "+3.2%",
        trend: "up",
        icon: Users,
        color: "purple"
    },
    {
        name: "Trending Role",
        value: "ML Engineer",
        change: "-2.1%",
        trend: "down",
        icon: Briefcase,
        color: "slate"
    },
    {
        name: "Market Competitiveness",
        value: "84%",
        change: "+5.4%",
        trend: "up",
        icon: TrendingUp,
        color: "emerald"
    }
];

export function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-slate-50 text-black border border-slate-100 transition-colors group-hover:bg-black group-hover:text-white`}>
                            <stat.icon size={20} />
                        </div>
                        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50/50' : 'text-rose-600 bg-rose-50/50'}`}>
                            {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {stat.change}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{stat.name}</p>
                        <h3 className="text-2xl font-bold text-black tracking-tight">{stat.value}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

