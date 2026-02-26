import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-slate-900/10">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-medium text-slate-900 dark:text-white">HR Pulse</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/signin" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-medium text-white dark:text-slate-900 bg-slate-900 dark:bg-white rounded-xl hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/20 transition-all">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-slate-50 dark:bg-slate-950">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-slate-200/50 dark:from-slate-800/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/30 dark:from-slate-800/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-brand-500/5 dark:from-brand-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
            
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-slate-400/30 dark:bg-slate-500/20 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }} />
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-slate-400/20 dark:bg-slate-500/15 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '8s' }} />
            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-slate-400/25 dark:bg-slate-500/20 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }} />
            <div className="absolute top-2/3 left-1/4 w-2.5 h-2.5 bg-slate-400/20 dark:bg-slate-500/15 rounded-full animate-float" style={{ animationDelay: '3s', animationDuration: '9s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-slate-400/30 dark:bg-slate-500/20 rounded-full animate-float" style={{ animationDelay: '4s', animationDuration: '5s' }} />
            
            <div className="absolute top-[20%] left-[10%] w-px h-24 bg-gradient-to-b from-transparent via-slate-300/30 dark:via-slate-600/20 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute top-[40%] right-[15%] w-px h-32 bg-gradient-to-b from-transparent via-slate-300/20 dark:via-slate-600/15 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            <div className="absolute bottom-[30%] left-[20%] w-px h-20 bg-gradient-to-b from-transparent via-slate-300/25 dark:via-slate-600/20 to-transparent animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
            
            <div className="absolute top-[15%] right-[25%] w-32 h-32 border border-slate-300/20 dark:border-slate-600/20 rounded-full animate-float-rotate" style={{ animationDuration: '12s' }} />
            <div className="absolute bottom-[20%] left-[15%] w-24 h-24 border border-slate-300/15 dark:border-slate-600/15 rounded-full animate-float-rotate" style={{ animationDuration: '15s', animationDelay: '2s' }} />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-300/5 dark:border-slate-700/10 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-300/5 dark:border-slate-700/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 text-xs font-medium text-slate-600 dark:text-slate-300 mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
              </span>
              AI-Powered Salary Prediction
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-slate-900 dark:text-white mb-8 leading-[1.15] tracking-tight">
              Predict salaries with
              <span className="block font-semibold">precision intelligence</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Make data-driven hiring decisions. Our machine learning model analyzes job details, company metrics, and market trends to predict competitive salary ranges.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-medium text-sm tracking-wide transition-all hover:shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-white/20 active:scale-[0.98]">
                Start predicting
              </Link>
              <Link href="/signin" className="px-8 py-4 text-slate-600 dark:text-slate-300 rounded-2xl font-medium text-sm transition-colors hover:text-slate-900 dark:hover:text-white">
                Sign in
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Machine Learning",
                  desc: "Advanced neural networks trained on millions of data points for accurate predictions.",
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                },
                {
                  title: "Market Insights",
                  desc: "Real-time compensation data across industries, locations, and experience levels.",
                  icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                },
                {
                  title: "Secure & Private",
                  desc: "Your data is encrypted and never shared. Enterprise-grade security standards.",
                  icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                }
              ].map((item, i) => (
                <div key={i} className="group bg-white dark:bg-slate-900/50 rounded-3xl p-8 shadow-sm shadow-slate-200/30 dark:shadow-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white dark:bg-slate-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light mb-10 max-w-xl mx-auto">
              Join thousands of HR professionals making smarter hiring decisions with AI-powered insights.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-medium text-sm tracking-wide transition-all hover:shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-white/20 active:scale-[0.98]">
              Create free account
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2026 HR Pulse. Built for modern HR teams.</p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
