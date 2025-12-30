"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Zap, ArrowRight,Loader2 } from 'lucide-react';
import { API_URL } from "../../src/utils/api";


export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.replace("/dashboard");
        }
    }, [router]);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setIsLoading(true); 

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            
            if (res.ok) {
                document.cookie = `token=${data.token}; path=/; max-age=604800`;
                localStorage.setItem("token", data.token);
                router.replace("/dashboard");
            } else {
                setError(data.detail || "Login failed");
                setIsLoading(false); 
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false); 
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-[1000px] flex bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden m-4">

                <div className="hidden lg:flex w-1/2 bg-indigo-600 p-12 flex-col justify-between items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-32 -mt-32 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-700 rounded-full -ml-24 -mb-24 opacity-50" />

                    <div className="relative z-10 flex items-center gap-2">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
                            <Zap className="text-white w-5 h-5 fill-current" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">PrimeTrade</span>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                            Welcome back to <br /> your dashboard.
                        </h2>
                        <p className="text-indigo-100 text-lg mb-8 max-w-sm">
                            Log in to access or update your Tasks.
                        </p>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                                    U{i}
                                </div>
                            ))}
                            <div className="pl-6 text-sm text-indigo-100 flex items-center italic">
                                Join 10k+ users
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-indigo-200 text-sm">
                        © 2025 Primetrade Inc.
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16">
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <Zap className="text-white w-5 h-5 fill-current" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">PrimeTrade</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Login</h1>
                        <p className="text-slate-500 font-medium">Please enter your credentials to continue.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl border border-red-100 text-sm font-medium mb-6">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-slate-700">Password</label>
                                <Link href="#" className="text-xs text-indigo-600 hover:underline font-semibold">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading} 
                            className="group w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Login
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-600 text-sm font-medium">
                        Don’t have an account?{' '}
                        <Link href="/signup" className="text-indigo-600 hover:underline font-bold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}