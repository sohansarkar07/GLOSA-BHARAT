import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Play,
    RefreshCw,
    Settings,
    Camera,
    Cpu,
    Zap,
    Truck,
    Users,
    Clock,
    TrendingUp,
    Brain,
    Package,
    Target,
    MapPin,
    AlertCircle,
    Sun,
    Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import MapComponent from '../components/MapComponent';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [junctions, setJunctions] = useState([]);
    const [selectedJunction, setSelectedJunction] = useState(null);
    const [advisory, setAdvisory] = useState(null);
    const [stats, setStats] = useState(null);
    const [isConnected, setIsConnected] = useState(true);
    const [mockPosition, setMockPosition] = useState({ lat: 28.6140, lng: 77.2185 });
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.classList.contains('dark') ||
            window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const iconMap = {
        Users, Clock, TrendingUp, Brain, Package, Target, Truck, MapPin
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchJunctions = async () => {
            try {
                const res = await axios.get('/api/junctions');
                setJunctions(res.data);
                if (res.data.length > 0) setSelectedJunction(res.data[0]);
            } catch (err) {
                console.error("Error fetching junctions", err);
                setIsConnected(false);
            }
        };
        fetchJunctions();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/stats');
                setStats(res.data);
                setIsConnected(true);
            } catch (err) {
                console.error("Error fetching stats", err);
                setIsConnected(false);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!selectedJunction) return;

        const interval = setInterval(async () => {
            try {
                setMockPosition(prev => {
                    const newLat = prev.lat + (selectedJunction.lat - prev.lat) * 0.05;
                    const newLng = prev.lng + (selectedJunction.lng - prev.lng) * 0.05;
                    return { lat: newLat, lng: newLng };
                });

                const res = await axios.post('/api/advisory', {
                    junctionId: selectedJunction.id,
                    lat: mockPosition.lat,
                    lng: mockPosition.lng,
                    timestamp: Date.now() / 1000
                });
                setAdvisory(res.data);
            } catch (err) {
                console.error("Error fetching advisory", err);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [selectedJunction, mockPosition]);

    const statusMap = {
        'online': 'status-online',
        'active': 'status-active',
        'operational': 'status-operational',
        'monitoring': 'status-monitoring'
    };

    const iconStatusMap = {
        'Cameras': Camera,
        'AI System': Cpu,
        'Traffic Lights': Zap,
        'Fleet': Truck
    };

    const trafficMetrics = stats?.trafficStats || [
        { label: 'Total Vehicles Processed', value: '2,847', change: '+12.5%', icon: 'Users' },
        { label: 'Average Wait Time', value: '18.3s', change: '-25.2%', icon: 'Clock' },
        { label: 'System Efficiency', value: '87.4%', change: '+8.1%', icon: 'TrendingUp' },
        { label: 'AI Accuracy', value: '96.8%', change: '+2.3%', icon: 'Brain' },
    ];

    const deliveryMetrics = stats?.deliveryStats || [
        { label: 'Active Deliveries', value: '24', change: '+15.2%', icon: 'Package' },
        { label: 'On-Time Delivery Rate', value: '94.2%', change: '+5.8%', icon: 'Target' },
        { label: 'Fleet Utilization', value: '78.5%', change: '+12.3%', icon: 'Truck' },
        { label: 'AI Route Efficiency', value: '23.7%', change: '+8.9%', icon: 'MapPin' },
    ];

    const systemStatus = stats?.systemStatus || [
        { label: 'Cameras', status: 'online' },
        { label: 'AI System', status: 'active' },
        { label: 'Traffic Lights', status: 'operational' },
        { label: 'Fleet', status: 'monitoring' },
    ];

    const renderContent = () => {
        if (activeTab === 'dashboard') {
            return (
                <>
                    {/* Header Section */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Smart Traffic & Delivery Dashboard</h1>
                            <p className="text-[var(--text-secondary)] font-medium">AI-powered traffic control and delivery management system</p>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-bold transition-colors">
                                <span className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-md text-[var(--text-secondary)]">
                                    <Clock className="h-3 w-3" /> {currentTime.toLocaleTimeString([], { hour12: true })} | {currentTime.toLocaleDateString()}
                                </span>
                                <span className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${isConnected ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400' : 'bg-red-50 dark:bg-red-600/10 text-red-600'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-blue-500 animate-pulse' : 'bg-red-500'}`} />
                                    {isConnected ? 'LIVE TELEMETRY ACTIVE' : 'SYSTEM OFFLINE'}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                title="Toggle Theme"
                            >
                                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>
                            <button
                                onClick={() => { console.log("Starting simulation manual override..."); }}
                                className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                            >
                                <Play className="h-4 w-4 fill-current" /> Start
                            </button>
                            <button
                                onClick={async () => {
                                    const res = await axios.get('/api/stats');
                                    setStats(res.data);
                                }}
                                className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                            >
                                <RefreshCw className="h-4 w-4" /> Refresh
                            </button>
                            <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" onClick={() => setActiveTab('settings')}>
                                <Settings className="h-5 w-5" />
                            </button>
                        </div>
                    </header>

                    {/* System Status Section */}
                    <section className="mb-8">
                        <h2 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-widest mb-4">System Status</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {systemStatus.map((item, idx) => {
                                const Icon = iconStatusMap[item.label] || AlertCircle;
                                return (
                                    <div key={idx} className="metric-card">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg shadow-sm transition-colors">
                                                <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <span className="text-sm font-bold text-[var(--text-primary)]">{item.label}</span>
                                        </div>
                                        <span className={`status-badge ${statusMap[item.status] || 'bg-slate-100'}`}>{item.status}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Traffic Control Performance Section */}
                    <section className="mb-8">
                        <h2 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-widest mb-4">Traffic Control Performance</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {trafficMetrics.map((metric, idx) => {
                                const Icon = iconMap[metric.icon] || AlertCircle;
                                return (
                                    <div key={idx} className="metric-card">
                                        <div>
                                            <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 tracking-wider">{metric.label}</p>
                                            <div className="flex items-baseline gap-2">
                                                <h3 className="text-2xl font-black text-[var(--text-primary)]">{metric.value}</h3>
                                                <span className={`text-[10px] font-bold ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                                    {metric.change}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full transition-colors`}>
                                            <Icon className={`h-5 w-5 text-blue-500`} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Maps & GLOSA Logic Integration */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 space-y-6">
                            <section className="gov-card">
                                <h2 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-widest mb-4">Real-time Intersection Visualization</h2>
                                <MapComponent
                                    junction={selectedJunction}
                                    vehiclePosition={mockPosition}
                                    distance={advisory?.distance || 500}
                                    signalStatus={advisory?.signalStatus || 'IDLE'}
                                />
                            </section>
                        </div>

                        <div className="space-y-6">
                            <section className="gov-card border-none bg-indigo-900 text-white overflow-hidden relative">

                                <h2 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-6 px-2">Driver Advisory Feed</h2>

                                <div className="flex flex-col items-center justify-center p-4 text-center">
                                    <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center mb-6 transition-all duration-500 shadow-lg ${advisory?.signalStatus === 'GREEN' ? 'bg-green-600 shadow-green-900/50' : advisory?.signalStatus === 'RED' ? 'bg-red-600 shadow-red-900/50' : 'bg-amber-600 shadow-amber-900/50'}`}>
                                        <span className="text-[10px] font-black opacity-80 uppercase">{advisory?.signalStatus || 'WAIT'}</span>
                                        <span className="text-5xl font-black">{advisory ? Math.round(advisory.secondsToChange) : "--"}</span>
                                        <span className="text-[10px] font-black opacity-60">SEC</span>
                                    </div>

                                    <div className="space-y-4 w-full">
                                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 self-stretch">
                                            <p className="text-[9px] font-bold text-white/60 uppercase mb-1">Recommended Speed</p>
                                            <p className="text-2xl font-black">{advisory?.recommendedSpeed || '--'} <span className="text-sm font-bold opacity-60">KM/H</span></p>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={advisory?.message}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-white dark:bg-slate-50 p-3 rounded-xl shadow-xl flex items-center gap-3"
                                            >
                                                <AlertCircle className="h-5 w-5 text-indigo-600 shrink-0" />
                                                <p className="text-xs font-bold text-slate-900 text-left leading-tight">{advisory?.message || "Syncing with intersection..."}</p>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Delivery Management Performance Section */}
                    <section>
                        <h2 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-widest mb-4">Delivery Management Performance</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
                            {deliveryMetrics.map((metric, idx) => {
                                const Icon = iconMap[metric.icon] || AlertCircle;
                                return (
                                    <div key={idx} className="metric-card">
                                        <div>
                                            <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 tracking-wider">{metric.label}</p>
                                            <div className="flex items-baseline gap-2">
                                                <h3 className="text-2xl font-black text-[var(--text-primary)]">{metric.value}</h3>
                                                <span className={`text-[10px] font-bold text-green-500`}>
                                                    {metric.change}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full transition-colors`}>
                                            <Icon className={`h-5 w-5 text-blue-500`} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </>
            );
        }

        if (activeTab === 'camera') {
            return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">Live Camera Grid</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="gov-card p-0 overflow-hidden group border-[var(--border-color)]">
                                <div className="aspect-video bg-slate-900 dark:bg-black/40 relative flex items-center justify-center transition-colors">
                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded animate-pulse uppercase">Live</div>
                                    <div className="absolute top-3 right-3 text-white text-[10px] font-bold opacity-60 uppercase tracking-widest">CAM-{i.toString().padStart(3, '0')}</div>
                                    <Camera className="h-10 w-10 text-slate-700 dark:text-slate-600 animate-pulse" />
                                    <div className="absolute bottom-3 left-3 text-white text-[10px] font-mono opacity-80">LAT: 28.61{i} | LNG: 77.21{i}</div>
                                </div>
                                <div className="p-4 bg-[var(--bg-card)]">
                                    <h3 className="text-sm font-bold text-[var(--text-primary)]">Junction Sector {i}</h3>
                                    <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Operational Monitor</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            );
        }

        if (activeTab === 'settings') {
            return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">System Configuration</h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Real-time AI Processing', desc: 'Enable multi-thread AI inference for traffic objects', active: true },
                            { label: 'Historical Data Insights', desc: 'Sync with weekly traffic patterns for predictive routing', active: true },
                            { label: 'Cloud Synchronization', desc: 'Auto-backup system logs to secure government cloud', active: false },
                            { label: 'Developer Debug Mode', desc: 'Enable verbose logging for API and AI service', active: false },
                        ].map((s, idx) => (
                            <div key={idx} className="gov-card flex items-center justify-between transition-colors">
                                <div>
                                    <h3 className="text-sm font-black text-[var(--text-primary)]">{s.label}</h3>
                                    <p className="text-xs text-[var(--text-secondary)] font-medium">{s.desc}</p>
                                </div>
                                <div className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${s.active ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.active ? 'right-1' : 'left-1'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setActiveTab('dashboard')} className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black dark:hover:bg-blue-700 transition-all">Save Changes</button>
                </motion.div>
            );
        }

        if (activeTab === 'simulation') {
            return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">Traffic Simulation Engine</h2>
                            <p className="text-[var(--text-secondary)] text-sm font-medium">Real-time geospatial tracking of simulated entities</p>
                        </div>
                        <button onClick={() => setActiveTab('dashboard')} className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">Return to Overview</button>
                    </div>
                    <div className="gov-card p-0 overflow-hidden border-2 border-blue-100 dark:border-blue-900/30 shadow-xl">
                        <MapComponent
                            junction={selectedJunction}
                            vehiclePosition={mockPosition}
                            distance={advisory?.distance || 500}
                            signalStatus={advisory?.signalStatus || 'IDLE'}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="gov-card">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Node</h3>
                            <p className="text-lg font-black text-slate-800">{selectedJunction?.name || 'RAJPATH CROSSING'}</p>
                        </div>
                        <div className="gov-card">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Active Entity</h3>
                            <p className="text-lg font-black text-blue-600">SMART_VEHICLE_01</p>
                        </div>
                        <div className="gov-card">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Link Status</h3>
                            <p className="text-lg font-black text-green-600 uppercase tracking-tight">Optimized</p>
                        </div>
                    </div>
                </motion.div>
            );
        }

        // Placeholder for other modules
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-[70vh] text-center"
            >
                <div className="bg-blue-50 p-6 rounded-3xl mb-6">
                    <Cpu className="h-12 w-12 text-blue-600 animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                    {activeTab.replace('-', ' ')} Module
                </h2>
                <p className="text-slate-500 max-w-md font-medium">
                    This advanced module is currently being synchronized with the national smart city grid. Live telemetry will be available shortly.
                </p>
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className="mt-8 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-all"
                >
                    Return to Overview
                </button>
            </motion.div>
        );
    };

    return (
        <div className="dashboard-container">
            <Sidebar isConnected={isConnected} activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="main-content relative overflow-hidden min-h-screen">

                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;
