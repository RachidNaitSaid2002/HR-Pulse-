"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/lib/toast";
import { predictApi } from "@/lib/api";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import {
  BrainCircuit,
  Building2,
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles,
  DollarSign,
  AlertCircle
} from "lucide-react";

interface JobData {
  job_description: string;
  Founded: number;
  Job_titel: string;
  company_size: string;
  sector: string;
  industry: string;
  state: string;
  rating: number;
}

const SECTORS = [
  "Information Technology",
  "Business Services",
  "Finance",
  "Health Care",
  "Biotech & Pharmaceuticals",
  "Insurance",
  "Manufacturing",
  "Retail",
  "Education",
  "Media",
  "Aerospace & Defense"
];

const COMPANY_SIZES = [
  "1 to 50 employees",
  "51 to 200 employees",
  "201 to 500 employees",
  "501 to 1000 employees",
  "1001 to 5000 employees",
  "5001 to 10000 employees",
  "10000+ employees",
  "Unknown"
];

const STATES = ["CA", "NY", "TX", "WA", "MA", "IL", "FL", "GA", "NC", "PA", "OH", "CO", "VA"];

export default function PredictPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<JobData>({
    job_description: "",
    Founded: 2010,
    Job_titel: "",
    company_size: "51 to 200 employees",
    sector: "Information Technology",
    industry: "Computer Hardware & Software",
    state: "CA",
    rating: 3.5,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ predicted_salary: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof JobData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/signin";
        return;
      }

      const data = await predictApi.getPrediction(formData, token);
      setResult(data);
      showToast("Prediction successful!", "success");
    } catch (err: any) {
      const message = err.message || "Unable to connect to service.";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <StatsGrid />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white shadow-lg">
                  <BrainCircuit size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black tracking-tight leading-none">
                    Predictor Engine
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Powered by XGBoost Regression</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Job Info Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Role Details</span>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-black uppercase tracking-tight ml-1">Job Title</label>
                      <input
                        type="text"
                        value={formData.Job_titel}
                        onChange={(e) => handleChange("Job_titel", e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-slate-300 outline-none transition-all text-[13px] font-medium text-black placeholder:text-slate-300"
                        placeholder="e.g. Senior Frontend Developer"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-black uppercase tracking-tight ml-1">Job Description</label>
                      <textarea
                        value={formData.job_description}
                        onChange={(e) => handleChange("job_description", e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-slate-300 outline-none transition-all text-[13px] font-medium text-black h-32 resize-none placeholder:text-slate-300"
                        placeholder="Paste key requirements or job description here..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Company & Context Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Building2 size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Organizational Context</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-black uppercase tracking-tight ml-1">Company Size</label>
                      <select
                        value={formData.company_size}
                        onChange={(e) => handleChange("company_size", e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-slate-300 outline-none transition-all text-[13px] font-medium text-black appearance-none cursor-pointer"
                      >
                        {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-black uppercase tracking-tight ml-1">Industry Sector</label>
                      <select
                        value={formData.sector}
                        onChange={(e) => handleChange("sector", e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-slate-300 outline-none transition-all text-[13px] font-medium text-black appearance-none cursor-pointer"
                      >
                        {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-black uppercase tracking-tight ml-1">Year Founded</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="number"
                          value={formData.Founded}
                          onChange={(e) => handleChange("Founded", parseInt(e.target.value))}
                          className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-slate-300 outline-none transition-all text-[13px] font-medium text-black"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-black uppercase tracking-tight ml-1">State Location</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          value={formData.state}
                          onChange={(e) => handleChange("state", e.target.value)}
                          className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-slate-300 outline-none transition-all text-[13px] font-medium text-black appearance-none cursor-pointer"
                        >
                          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-black text-white rounded-full font-bold text-sm tracking-tight hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 group"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <>
                        <span>Get Salary Benchmark</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Side Results/Info Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-black rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:scale-110" />

                  <div className="relative z-10">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Estimated Annual Salary</p>
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-4xl font-bold tracking-tight">
                        ${result.predicted_salary.toLocaleString()}
                      </span>
                      <span className="text-white/40 text-sm font-medium">/yr</span>
                    </div>

                    <div className="space-y-6">
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Confidence Level</span>
                          <span className="text-xs font-bold">94.8%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "94.8%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-emerald-400 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-[11px] opacity-60 bg-white/5 p-4 rounded-xl">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <p className="font-medium leading-normal">Estimation based on data points from similar roles in our latest training dataset.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-[2rem] p-10 border-2 border-dashed border-slate-100 text-center flex flex-col items-center justify-center min-h-[350px]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                    <DollarSign size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2 tracking-tight">Ready to Benchmark?</h4>
                  <p className="text-slate-400 text-[11px] font-medium max-w-[200px] leading-relaxed">Fill in the role details to generate your AI salary insights.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h4 className="font-bold text-black mb-6 text-sm tracking-tight uppercase tracking-wider">Historical Trends</h4>
              <div className="space-y-3">
                {[
                  { role: "Software Eng.", loc: "California", sal: "$142k" },
                  { role: "Data Analyst", loc: "New York", sal: "$95k" },
                  { role: "Product Mgr.", loc: "Texas", sal: "$118k" },
                ].map((trend, i) => (
                  <div key={i} className="flex justify-between items-center text-[12px] p-4 bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-xl transition-all group cursor-default">
                    <div>
                      <p className="font-bold text-black tracking-tight group-hover:translate-x-0.5 transition-transform">{trend.role}</p>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{trend.loc}</p>
                    </div>
                    <span className="font-bold text-black text-sm">{trend.sal}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

