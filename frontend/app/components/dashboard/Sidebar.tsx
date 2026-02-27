"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    BrainCircuit,
    History,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Briefcase
} from "lucide-react";
import { useState } from "react";

const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Salary Predictor", icon: BrainCircuit, href: "/predict" },
    { name: "Market Jobs", icon: Briefcase, href: "/dashboard/jobs" },
    { name: "Insights", icon: TrendingUp, href: "/insights" },
    { name: "History", icon: History, href: "/history" },
    { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar({ onLogout }: { onLogout: () => void }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? 72 : 250 }}
            className="h-screen sticky top-0 bg-white border-r border-slate-100 flex flex-col z-50 transition-all duration-300 shadow-sm"
        >
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg shadow-black/5">
                            <div className="w-3.5 h-3.5 bg-white rounded-sm transform rotate-45" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-black">HR Pulse</span>
                    </motion.div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mx-auto shadow-lg shadow-black/5">
                        <div className="w-3.5 h-3.5 bg-white rounded-sm transform rotate-45" />
                    </div>
                )}
            </div>

            <nav className="flex-1 px-3 mt-8 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={`
                                relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group
                                ${isActive
                                    ? "text-black bg-slate-50 shadow-sm font-semibold"
                                    : "text-slate-500 hover:text-black hover:bg-slate-50/50"}
                            `}>
                                <item.icon size={18} className={isActive ? "text-black" : "group-hover:text-black transition-colors"} strokeWidth={isActive ? 2.5 : 2} />
                                {!isCollapsed && (
                                    <span className="text-xs tracking-tight">{item.name}</span>
                                )}
                                {isActive && !isCollapsed && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-4 bg-black rounded-full"
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-50 space-y-1">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-black hover:bg-slate-50/50 rounded-xl transition-all"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    {!isCollapsed && <span className="text-xs tracking-tight">Collapse menu</span>}
                </button>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-all"
                >
                    <LogOut size={18} />
                    {!isCollapsed && <span className="text-xs tracking-tight">Sign out</span>}
                </button>
            </div>
        </motion.div>
    );
}

