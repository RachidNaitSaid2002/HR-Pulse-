"use client";

import { useToast } from "@/lib/toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-5 py-4 rounded-xl shadow-xl shadow-slate-200/50 flex items-center gap-3 min-w-[280px] animate-in slide-in-from-right duration-500 bg-white border ${toast.type === "success"
            ? "border-emerald-100 text-emerald-500"
            : toast.type === "error"
              ? "border-rose-100 text-rose-500"
              : "border-slate-100 text-black"
            }`}
        >
          {toast.type === "success" && (
            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {toast.type === "error" && (
            <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          {toast.type === "info" && (
            <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          <p className="text-[12px] font-bold tracking-tight flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-slate-300 hover:text-black transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

