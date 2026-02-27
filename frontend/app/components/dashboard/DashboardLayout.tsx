"use client";

import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { useToast } from "@/app/lib/toast";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { showToast } = useToast();

    const handleLogout = () => {
        localStorage.removeItem("token");
        showToast("You have been signed out", "info");
        window.location.href = "/signin";
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar onLogout={handleLogout} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <TopHeader />
                <main className="flex-1 overflow-auto p-8">
                    <div className="max-w-[1400px] mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

