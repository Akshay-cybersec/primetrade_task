"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ListTodo, 
  ShieldCheck, 
  LayoutDashboard 
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans">

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
      
      <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px] z-0" />

      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Primetrade</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <Link href="/login" className="hover:text-indigo-600 transition-colors">Login</Link>
          <Link href="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-6 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Task Management Reimagined
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Organize your work <span className="text-indigo-600">effortlessly.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Primetrade Tasks is the modern todo list designed for high-performing teams and individuals. Stay focused, track progress, and hit your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/signup" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group">
              Start Building for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-white border border-slate-200 hover:border-indigo-600 text-slate-700 font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center">
              View Demo
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 w-full relative">
          <div className="bg-white rounded-[32px] shadow-2xl shadow-indigo-100 p-4 md:p-8 border border-slate-100 relative overflow-hidden">

            <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-indigo-600" /> My Tasks
              </h4>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { text: "Implement Signup UI", status: true },
                { text: "Connect API to Backend", status: false },
                { text: "User Feedback Analysis", status: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${item.status ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border ${item.status ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'} flex items-center justify-center`}>
                      {item.status && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-sm font-semibold ${item.status ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{item.text}</span>
                  </div>
                  <div className="h-2 w-12 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${item.status ? 'bg-indigo-600 w-full' : 'bg-indigo-300 w-1/3'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 bg-indigo-900 text-white p-6 rounded-3xl shadow-2xl hidden md:block max-w-[180px]">
            <p className="text-xs font-medium text-indigo-300 mb-1">Weekly Growth</p>
            <p className="text-2xl font-bold">+24%</p>
            <div className="mt-2 h-1 w-full bg-indigo-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-400 w-3/4" />
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Secure by Design</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">Your data is encrypted and protected with enterprise-grade security protocols.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Real-time Dashboard</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">Watch your productivity grow with live updates and analytics on your task completion.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Zap className="text-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Blazing Fast</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">Built with Next.js 15 for a seamless, lag-free experience across all devices.</p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 text-center text-slate-400 text-sm border-t border-slate-100">
        <p>© 2025 Primetrade Task Manager. Created for Internship Assessment.</p>
      </footer>
    </div>
  );
}