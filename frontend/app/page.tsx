"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ScrollAnimation } from "./components/ScrollAnimation";
import { ParallaxBackground } from "./components/ParallaxBackground";
import { MagneticButton } from "./components/MagneticButton";
import { LiveTicker } from "./components/LiveTicker";
import {
  Zap,
  BarChart3,
  ShieldCheck,
  Puzzle,
  Headphones,
  Clock,
  ArrowRight,
  Search,
  Cpu,
  CheckCircle2
} from "lucide-react";

const FEATURES = [
  {
    title: "Smart Predictions",
    desc: "AI-powered salary predictions based on job title, company size, and location.",
    icon: Zap,
    color: "slate"
  },
  {
    title: "Real-time Data",
    desc: "Millions of salary data points updated in real-time from across the industry.",
    icon: Clock,
    color: "slate"
  },
  {
    title: "Market Analysis",
    desc: "Comprehensive insights to help you stay competitive in talent acquisition.",
    icon: BarChart3,
    color: "slate"
  },
  {
    title: "Secure & Private",
    desc: "Enterprise-grade encryption ensures your data stays protected at all times.",
    icon: ShieldCheck,
    color: "slate"
  },
  {
    title: "Easy Integration",
    desc: "Seamlessly integrate with your existing HR tools and workflows.",
    icon: Puzzle,
    color: "slate"
  },
  {
    title: "Expert Support",
    desc: "24/7 dedicated support team ready to help you succeed.",
    icon: Headphones,
    color: "slate"
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <div className="min-h-screen bg-white selection:bg-black/5 transition-colors duration-500">
      {/* Dynamic Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "py-3 bg-white/80 backdrop-blur-xl border-b border-indigo-100 shadow-lg shadow-indigo-100/20"
        : "py-6 bg-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-3.5 h-3.5 bg-white rounded-sm transform rotate-45" />
            </div>
            <span className="text-lg font-bold text-black tracking-tight uppercase">HR Pulse</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/signin" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
              Login
            </Link>
            <MagneticButton>
              <Link href="/signup" className="px-6 py-2.5 text-[11px] font-bold text-white bg-black rounded-full shadow-lg hover:shadow-xl hover:shadow-black/20 transition-all block uppercase tracking-widest">
                Get Started
              </Link>
            </MagneticButton>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pb-20 px-6 pt-20 overflow-hidden">
          <ParallaxBackground />

          <div className="relative max-w-5xl mx-auto text-center z-10">
            <ScrollAnimation>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-lg shadow-indigo-500/10 text-[11px] font-semibold text-indigo-600 mb-10 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                Powered by High-Precision AI
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={100}>
              <h1 className="text-5xl md:text-8xl font-bold text-black mb-8 leading-[0.95] tracking-tight">
                Beyond Payroll.<br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Intelligent HR</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-indigo-100/50 -z-10" />
                </span>
                <br />for People.
              </h1>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Automate your workforce management with precision. We analyze performance, market cycles, and growth in one unified platform.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
                <MagneticButton>
                  <Link href="/signup" className="group relative px-10 py-5 bg-black text-white rounded-full font-bold text-sm tracking-tight shadow-2xl hover:shadow-2xl hover:shadow-black/20 transition-all block overflow-hidden">
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-3">
                      Try for Free Now
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </span>
                  </Link>
                </MagneticButton>
                <Link href="/signin" className="group px-8 py-4.5 bg-white text-black font-semibold text-sm rounded-full flex items-center gap-3 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                  <span>View demo</span>
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </span>
                </Link>
              </div>
            </ScrollAnimation>

            {/* Social Proof Stats */}
            <ScrollAnimation delay={400}>
              <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
                {[
                  { value: "99.5%", label: "Accuracy" },
                  { value: "50k+", label: "Companies" },
                  { value: "10M+", label: "Data Points" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-indigo-400" />
                    <span className="text-sm font-bold text-slate-600">{stat.value}</span>
                    <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            <div className="max-w-6xl mx-auto px-4">
              <ScrollAnimation>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100/50 bg-white group">
                  <div className="flex items-center gap-4 px-6 py-4 bg-slate-50/80 backdrop-blur-sm border-b border-slate-100">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500" />
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500" />
                      </div>
                      <div className="flex-1 max-w-[280px] mx-auto h-7 bg-white/80 rounded-lg flex items-center px-3 border border-slate-100/50 backdrop-blur-sm shadow-inner">
                        <div className="flex items-center gap-2 w-full">
                          <div className="lock text-[10px] text-slate-300">🔒</div>
                          <div className="text-[9px] font-medium text-slate-400 tracking-wide font-mono">hrpulse.app/dashboard</div>
                        </div>
                      </div>
                    </div>
                    <div className="relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.01]">
                      <Image
                        src="/page1.png"
                        alt="Dashboard Mockup"
                        width={1800}
                        height={1000}
                        className="w-full h-auto"
                        priority
                      />
                    </div>
                  </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        <LiveTicker />

        {/* How it Works Section */}
        <section className="py-28 px-6 bg-slate-50/30 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="absolute top-20 left-[15%] w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-[15%] w-64 h-64 bg-purple-100/30 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-6 shadow-sm">
                  How It Works
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
                  Seamlessly simple process.
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium">
                  Our AI engine handles the complexity of market analysis for you.
                </p>
              </div>
            </ScrollAnimation>

            {/* Steps with connecting line */}
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-200" />

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Input Role Details",
                    desc: "Job title, company size, and sector. Simply click and select.",
                    icon: Search,
                    number: "01"
                  },
                  {
                    title: "AI Analysis",
                    desc: "We process millions of industry data points instantly.",
                    icon: Cpu,
                    number: "02"
                  },
                  {
                    title: "Get Insights",
                    desc: "Receive deep benchmark reports and market competitiveness scores.",
                    icon: CheckCircle2,
                    number: "03"
                  }
                ].map((step, i) => (
                  <ScrollAnimation key={i} delay={i * 150}>
                    <div className="relative text-center group">
                      {/* Step number */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-8xl font-bold text-slate-100/50 -z-10 select-none">
                        {step.number}
                      </div>
                      
                      {/* Icon circle */}
                      <div className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-slate-200/50 border border-slate-100 group-hover:-translate-y-2 transition-transform duration-300">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <step.icon size={26} className="text-black relative z-10" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-black mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[260px] mx-auto">{step.desc}</p>
                      
                      {/* Arrow connector for mobile */}
                      {i < 2 && (
                        <div className="md:hidden flex justify-center mt-6">
                          <ArrowRight className="text-slate-300" size={20} />
                        </div>
                      )}
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>

            {/* CTA */}
            <ScrollAnimation delay={400}>
              <div className="text-center mt-16">
                <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors">
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-white via-indigo-50/30 to-white">
          <div className="max-w-7xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 tracking-tight">
                  Built for modern HR.
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium">
                  Enterprise-grade tools for high-performance teams.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((item, i) => (
                <ScrollAnimation key={i} delay={i * 100}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all cursor-default group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-6 border border-indigo-100 group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:border-transparent transition-all">
                        <item.icon className="text-indigo-600 group-hover:text-white transition-colors" size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-black mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Proof Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto border border-slate-100 rounded-[3rem] p-12 md:p-20 relative overflow-hidden bg-white shadow-lg">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 to-purple-500/10 rounded-full translate-y-[-50%] translate-x-[30%]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 rounded-full translate-y-[30%] translate-x-[-30%]" />
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-[1.1] tracking-tight">
                  Trusted by<br />
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">world class teams.</span>
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                    <div className="text-4xl font-bold mb-1 tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">99.5%</div>
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Prediction Accuracy</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                    <div className="text-4xl font-bold mb-1 tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">50k+</div>
                    <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Data Points Processed</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                      <Zap size={22} />
                    </div>
                    <div className="text-xl font-bold tracking-tight">HR Pulse Engine</div>
                  </div>
                  <div className="space-y-5 mb-10">
                    {[
                      "Industry Standard Precision",
                      "100+ Real-time Sources",
                      "Enterprise Security (SOC2)",
                      "Developer-first API"
                    ].map((t, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-xs font-bold text-white/70">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                        </div>
                        {t}
                      </div>
                    ))}
                  </div>
                  <Link href="/signup" className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-bold text-center text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] block">
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <div className="w-3.5 h-3.5 bg-white rounded-sm transform rotate-45" />
                </div>
                <span className="text-lg font-bold tracking-tight uppercase">HR Pulse</span>
              </div>
              <p className="text-slate-500 max-w-xs text-sm font-medium leading-relaxed">
                The future of HR. Combining high-end artificial intelligence with human-centric design.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black">Product</h4>
              <div className="flex flex-col gap-2 text-xs font-bold text-slate-400">
                <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Integrations</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">API</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black">Company</h4>
              <div className="flex flex-col gap-2 text-xs font-bold text-slate-400">
                <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Careers</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 HR Pulse. Designed for intelligence.</p>
            <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

