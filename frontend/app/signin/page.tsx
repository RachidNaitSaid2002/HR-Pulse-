"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/Input";
import { useToast } from "@/lib/toast";
import { authApi } from "@/lib/api";

export default function SignIn() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const data = await authApi.signin(formData);
      localStorage.setItem("token", data.access_token);
      showToast("Welcome back!", "success");
      router.push("/predict");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid email or password";
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white relative">
      {/* ElevenLabs Vignette Influence (via globals.css ::before) */}

      <div className="relative w-full max-w-[400px] animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black shadow-lg mb-6">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-400 font-medium text-xs">
            Enter your credentials to access the platform
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                error={errors.email}
                autoComplete="email"
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.password}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-black text-white rounded-full font-bold text-sm tracking-tight transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-[12px] text-slate-400 font-medium">
              Don't have an account?{" "}
              <Link href="/signup" className="text-black font-bold hover:underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

