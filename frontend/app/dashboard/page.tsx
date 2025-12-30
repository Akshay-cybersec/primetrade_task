"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../src/utils/api";
import {
    LogOut,
    Plus,
    Search,
    Trash2,
    Edit3,
    Check,
    X,
    LayoutDashboard,
    User as UserIcon,
    Filter,
    Zap
} from "lucide-react";

interface Task {
    id: string;
    title: string;
    description: string;
}

interface UserProfile {
    username: string;
    email: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", description: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window === "undefined") return;

        const cookieToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!cookieToken) {
            router.replace("/login");
        } else {
            setToken(cookieToken);
        }
    }, [router]);
    useEffect(() => {
        if (!token) return;
        fetchInitialData();
    }, [token]);



    const fetchInitialData = async () => {
        setLoading(true);
        await Promise.all([fetchTasks(), fetchProfile()]);
        setLoading(false);
    };

    const fetchProfile = async () => {
        const res = await fetch(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
            const data = await res.json();
            setUser(data);
        }
    };

    const fetchTasks = async () => {
        const res = await fetch(`${API_URL}/tasks/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
            const data: Task[] = await res.json();
            setTasks(data);
        } else {
            router.replace("/login");
        }
    };

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title) return;

        const res = await fetch(`${API_URL}/tasks/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setForm({ title: "", description: "" });
            fetchTasks();
        }
    };

    const updateTask = async (id: string) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setEditId(null);
            setForm({ title: "", description: "" });
            fetchTasks();
        }
    };

    const deleteTask = async (id: string) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) fetchTasks();
    };

    const logout = () => {
        document.cookie = "token=; path=/; max-age=0";
        router.replace("/login");
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-6 flex items-center gap-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-tight">PrimeTrade</span>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <button className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold transition-all">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                            {user?.username?.charAt(0).toUpperCase() || <UserIcon size={18} />}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-slate-900 truncate">{user?.username || 'Loading...'}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-4 md:p-10 max-w-5xl">
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Task Overview</h1>
                        <p className="text-slate-500 font-medium">Manage and track your internship tasks.</p>
                    </div>

                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="text-black placeholder-gray-500 w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </header>

                <section className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-200 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Plus className="text-indigo-600" size={20} /> New Task
                    </h2>
                    <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4">
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="text-black placeholder-gray-500 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="md:col-span-6">
                            <input
                                type="text"
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="text-black placeholder-gray-500 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                            />
                        </div>
                        <button className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                            <Plus size={18} /> Add
                        </button>
                    </form>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Your Tasks</h2>
                        <span className="bg-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-full font-bold">
                            {filteredTasks.length} Total
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center py-20 text-slate-400">
                            <div className="animate-spin mb-4"><Zap size={40} /></div>
                            <p className="font-medium">Loading your tasks...</p>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-300">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <Search size={30} />
                            </div>
                            <p className="text-slate-500 font-medium">No tasks match your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredTasks.map((task) => (
                                <div key={task.id} className="group bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    {editId === task.id ? (
                                        <div className="flex-1 w-full space-y-3">
                                            <input
                                                type="text"
                                                value={form.title}
                                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                                className="w-full px-4 py-2 bg-slate-50 border border-indigo-200 rounded-lg outline-none ring-2 ring-indigo-500/10 font-bold"
                                            />
                                            <textarea
                                                value={form.description}
                                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                                className="w-full px-4 py-2 bg-slate-50 border border-indigo-200 rounded-lg outline-none"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{task.description}</p>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                                        {editId === task.id ? (
                                            <>
                                                <button onClick={() => updateTask(task.id)} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                                                    <Check size={20} />
                                                </button>
                                                <button onClick={() => setEditId(null)} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                                                    <X size={20} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setEditId(task.id);
                                                        setForm({ title: task.title, description: task.description });
                                                    }}
                                                    className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                    title="Edit task"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                    title="Delete task"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}