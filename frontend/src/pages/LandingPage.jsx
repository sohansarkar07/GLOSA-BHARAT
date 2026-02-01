import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    Leaf,
    ShieldCheck,
    Zap,
    ArrowRight,
    Globe,
    Cpu,
    Trophy,
    Navigation,
    Sun,
    Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import WhitepaperModal from '../components/WhitepaperModal';

const LandingPage = () => {
    const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.classList.contains('dark') ||
            window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300 relative overflow-hidden">
            {/* Indian Theme Background Elements */}
            <div className="chakra-bg" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 opacity-50 z-[60]" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 opacity-50 z-[60]" />

            <WhitepaperModal isOpen={isWhitepaperOpen} onClose={() => setIsWhitepaperOpen(false)} />

            {/* Header / Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border-color)] px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
                            <Navigation className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-[var(--text-primary)] leading-none">GLOSA-BHARAT</h1>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mt-1">Smart Mobility Infrastructure</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[var(--text-secondary)]">
                        <a href="#" className="hover:text-blue-600 transition-colors">Atmanirbhar Bharat</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Digital India</a>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-800" />}
                        </button>
                        <Link to="/dashboard" className="bg-slate-900 dark:bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-200">
                            Open Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-4 py-1.5 rounded-full mb-6 border border-orange-100 dark:border-orange-900/30">
                            <Trophy className="h-3 w-3 text-orange-600" />
                            <span className="text-[10px] font-black text-orange-700 dark:text-orange-400 uppercase tracking-widest">Atmanirbhar Bharat Initiative</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black text-[var(--text-primary)] leading-[1.1] mb-8">
                            Empowering <span className="text-blue-600">Smart Cities</span> with Intelligent Traffic
                        </h1>

                        <p className="text-lg text-[var(--text-secondary)] font-medium max-w-xl mb-10 leading-relaxed">
                            Green Light Optimal Speed Advisory (GLOSA) implementation for urban India. Reduce fuel imports, slash emissions, and transform mobility with indigenous AI.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-20 text-center">
                            <Link to="/dashboard" className="group bg-blue-600 text-white px-8 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                                Start Simulation <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={() => setIsWhitepaperOpen(true)}
                                className="bg-[var(--bg-card)] border-2 border-[var(--border-color)] text-[var(--text-primary)] px-8 py-5 rounded-2xl text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                            >
                                View Technical Docs
                            </button>
                        </div>

                        <div className="flex items-center gap-12 opacity-40 grayscale dark:invert dark:opacity-60">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Aatmanirbhar_Bharat_Logo.png" alt="Make in India" className="h-12" />
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Digital_India_logo.svg/1200px-Digital_India_logo.svg.png" alt="Digital India" className="h-10" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Decorative Background for Image */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-green-100 rounded-[3rem] blur-3xl opacity-30 -z-10 animate-pulse" />

                        <div className="bg-[var(--bg-card)] p-4 rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-[var(--border-color)] relative overflow-hidden group min-h-[500px]">
                            <img
                                src="https://images.unsplash.com/photo-1545147980-c9d3e0e8b78e?auto=format&fit=crop&q=80&w=1500"
                                alt="Smart City Infrastructure"
                                className="w-full h-[500px] object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-1000"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1500";
                                }}
                            />
                            {/* Overlay UI elements to make it look "techy" */}
                            <div className="absolute top-10 left-10 glass-panel bg-[var(--bg-card)]/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-[var(--border-color)]">
                                <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Live Telemetry</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-bold text-[var(--text-primary)]">45.2 KM/H (Advisory)</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto mt-32 grid md:grid-cols-4 gap-6">
                    {[
                        { img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", title: "Eco-Conscious", desc: "Estimated fuel saving of ~15% in pilot cities by reducing idle time." },
                        { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400", title: "Precision AI", desc: "LSTM-based neural networks predicting signal phases with 98% accuracy." },
                        { img: "https://images.unsplash.com/photo-1451187530224-ad81d940fd89?auto=format&fit=crop&q=80&w=400", title: "Gov-Grade", desc: "Built on high-compliance secure analytics for national infrastructure." },
                        { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400", title: "Scalable", desc: "Ready for deployment across Tier-1 and Tier-2 Indian smart cities." }
                    ].map((f, i) => (
                        <div key={i} className="group p-8 rounded-3xl border border-[var(--border-color)] hover:border-blue-100 hover:bg-blue-50/30 transition-all bg-[var(--bg-card)]">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 shadow-md shadow-slate-200">
                                <img
                                    src={f.img}
                                    alt={f.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400";
                                    }}
                                />
                            </div>
                            <h3 className="text-lg font-black text-[var(--text-primary)] mb-2">{f.title}</h3>
                            <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Impact Footer Segment */}
            <section className="bg-[var(--bg-card)] py-20 border-y border-[var(--border-color)]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black text-[var(--text-primary)] mb-8 tracking-tight">Contributing to India's Global Excellence in Smart Mobility</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <p className="text-3xl font-black text-blue-600 mb-1 tracking-tight">20%</p>
                            <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Congestion Reduction</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-green-600 mb-1 tracking-tight">1.2M</p>
                            <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">CO2 Tons Reduced</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-orange-600 mb-1 tracking-tight">100+</p>
                            <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Smart Junctions</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-purple-600 mb-1 tracking-tight">9+ Cities</p>
                            <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Pilot Deployments</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[var(--bg-card)] py-12 px-6 border-t border-[var(--border-color)] text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer dark:invert">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="India Emblem" className="h-10" />
                        <div className="h-8 w-px bg-slate-300 mx-1"></div>
                        <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Ministry of Smart Cities</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-bold max-w-lg mx-auto">
                        Developed as part of the National Mobility Initiative.
                        © 2026 Smart Infrastructure India. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
