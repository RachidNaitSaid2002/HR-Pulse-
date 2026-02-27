"use client";

import { Bell, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function TopHeader() {
    const pathname = usePathname();

    // Simple breadcrumb logic
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.map((s, i) => ({
        name: s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' '),
        href: '/' + segments.slice(0, i + 1).join('/')
    }));

    return (
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
            <div className="flex flex-col">
                <nav className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    <span className="hover:text-black transition-colors cursor-pointer">Dashboards</span>
                    {breadcrumbs.map((bc) => (
                        <div key={bc.href} className="flex items-center gap-1.5">
                            <span className="opacity-30">/</span>
                            <span className="hover:text-black transition-colors cursor-pointer">{bc.name}</span>
                        </div>
                    ))}
                </nav>
                <h2 className="text-lg font-bold text-black tracking-tight leading-none mt-0.5">
                    {breadcrumbs[breadcrumbs.length - 1]?.name || "Overview"}
                </h2>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center relative group">
                    <Search className="absolute left-4 text-slate-400 group-focus-within:text-black transition-colors" size={14} />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        className="pl-10 pr-4 h-9 bg-slate-50/50 border border-slate-100 rounded-full text-[11px] font-medium w-64 focus:bg-white focus:border-slate-200 focus:shadow-sm transition-all outline-none text-black"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-slate-400 hover:text-black hover:bg-slate-50 rounded-lg transition-all">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                    </button>

                    <div className="w-[1px] h-6 bg-slate-100" />

                    <div className="flex items-center gap-3 pl-1 group cursor-pointer">
                        <div className="text-right hidden sm:block">
                            <p className="text-[11px] font-bold text-black leading-tight">Admin HR</p>
                            <p className="text-[10px] text-slate-400 font-medium tracking-tight">admin@hrpulse.ai</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all overflow-hidden">
                            <User size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

