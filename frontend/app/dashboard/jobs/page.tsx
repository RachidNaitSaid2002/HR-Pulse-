"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { jobsApi } from "@/lib/api";
import { useToast } from "@/lib/toast";
import {
    Briefcase,
    Search,
    Filter,
    ExternalLink,
    Tag,
    Database
} from "lucide-react";

interface Job {
    id: number;
    job_title: string;
    skills: string[];
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { showToast } = useToast();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token") || "";
            const data = await jobsApi.getJobs(token, 0, 100);
            setJobs(data);
        } catch (error: any) {
            showToast(error.message || "Failed to fetch jobs.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="space-y-8 pb-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-black tracking-tight">
                            Market Jobs
                        </h1>
                        <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Real-word insights from job listings</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-5 py-2 bg-black text-white rounded-full flex items-center gap-2 text-[11px] font-bold shadow-sm">
                            <Database size={14} />
                            <span>{jobs.length} Jobs Detected</span>
                        </div>
                    </div>
                </div>

                {/* Filter/Search Bar */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title or skills (e.g. Python, Senior)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-full focus:border-slate-300 focus:shadow-sm outline-none transition-all text-[13px] font-medium text-black placeholder:text-slate-400"
                        />
                    </div>
                    <button className="px-6 py-3.5 bg-white border border-slate-100 rounded-full flex items-center gap-2 text-black hover:border-slate-300 transition-all shadow-sm font-bold text-[11px] uppercase tracking-wider">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                </div>

                {/* Jobs Grid */}
                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-64 bg-slate-50 rounded-[2rem] animate-pulse border border-slate-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100 transition-all flex flex-col group cursor-default relative overflow-hidden"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm">
                                            <Briefcase size={22} />
                                        </div>
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-300">ID #{job.id}</div>
                                    </div>

                                    <h3 className="text-lg font-bold text-black mb-4 line-clamp-2 min-h-[3rem] tracking-tight leading-snug">
                                        {job.job_title}
                                    </h3>

                                    <div className="flex flex-wrap gap-1.5 mb-6 flex-1">
                                        {job.skills.slice(0, 6).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold tracking-tight border border-slate-100 hover:bg-black hover:text-white transition-colors cursor-pointer"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {job.skills.length > 6 && (
                                            <span className="px-3 py-1 text-slate-400 text-[10px] font-bold flex items-center italic">
                                                +{job.skills.length - 6} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Tag size={14} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Skill NER</span>
                                        </div>
                                        <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all border border-slate-100">
                                            <ExternalLink size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!isLoading && filteredJobs.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200"
                    >
                        <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
                            <Search size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2 tracking-tight">No jobs found</h3>
                        <p className="text-slate-400 text-xs font-medium max-w-xs mx-auto">Try adjusting your search or filters to see more results.</p>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    );
}

