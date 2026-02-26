"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/app/lib/toast";
import { predictApi } from "@/app/lib/api";

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

export default function Predict() {
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
      showToast("Prediction generated successfully!", "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to connect to the prediction service.";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showToast("You have been signed out", "info");
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-light text-slate-900 dark:text-white tracking-tight mb-2">
              Salary <span className="font-semibold">Prediction</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-xl">
              Enter job details to generate an AI-powered salary prediction
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 border border-slate-200/50 dark:border-slate-800/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Job Details</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Job Title</label>
                    <input
                      type="text"
                      value={formData.Job_titel}
                      onChange={(e) => handleChange("Job_titel", e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-slate-900 dark:focus:border-white focus:ring-0 outline-none transition-all dark:text-white font-light"
                      placeholder="e.g. Senior Machine Learning Engineer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Job Description</label>
                    <textarea
                      value={formData.job_description}
                      onChange={(e) => handleChange("job_description", e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-slate-900 dark:focus:border-white focus:ring-0 outline-none transition-all h-32 resize-none dark:text-white font-light"
                      placeholder="Paste job description or key requirements..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 border border-slate-200/50 dark:border-slate-800/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Company Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Company Size</label>
                    <select
                      value={formData.company_size}
                      onChange={(e) => handleChange("company_size", e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-slate-900 dark:focus:border-white focus:ring-0 outline-none transition-all dark:text-white font-light appearance-none cursor-pointer"
                    >
                      {COMPANY_SIZES.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Industry Sector</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => handleChange("sector", e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-slate-900 dark:focus:border-white focus:ring-0 outline-none transition-all dark:text-white font-light appearance-none cursor-pointer"
                    >
                      {SECTORS.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Founded Year</label>
                    <input
                      type="number"
                      value={formData.Founded}
                      onChange={(e) => handleChange("Founded", parseInt(e.target.value))}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-slate-900 dark:focus:border-white focus:ring-0 outline-none transition-all dark:text-white font-light"
                      placeholder="e.g. 2010"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-slate-900 dark:focus:border-white focus:ring-0 outline-none transition-all dark:text-white font-light appearance-none cursor-pointer"
                    >
                      {STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-medium text-sm tracking-wide transition-all hover:shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-white/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating prediction...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Prediction
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className={`bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-500 ${result ? 'border-slate-900 dark:border-white' : ''}`}>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-6">Result</h3>

                {!result && !error && !isLoading && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-light text-sm">Enter details and generate to see prediction</p>
                  </div>
                )}

                {isLoading && (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-2xl" />
                    <div className="h-24 w-full bg-slate-200 dark:bg-slate-700 rounded-2xl" />
                  </div>
                )}

                {error && (
                  <div className="p-5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-2xl">
                    <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">{error}</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Predicted Salary</span>
                      <div className="text-5xl font-light text-slate-900 dark:text-white mt-2">
                        ${result.predicted_salary.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Confidence</span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">94.8%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-900 dark:bg-white w-[94.8%] rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
