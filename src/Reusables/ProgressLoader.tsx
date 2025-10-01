import { TrendingUp } from "lucide-react";

const ProgressLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="flex flex-col items-center gap-6">
                {/* Spinner with Icon */}
                <div className="relative inline-flex">
                    <svg className="animate-spin" width="80" height="80" viewBox="0 0 80 80">
                        <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="#2e7d32"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="164.93"
                            strokeDashoffset="41.23"
                            strokeLinecap="round"
                            opacity="0.3"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="#2e7d32"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="164.93"
                            strokeDashoffset="82.47"
                            strokeLinecap="round"
                            style={{ animation: "dash 1.5s ease-in-out infinite" }}
                        />
                    </svg>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <TrendingUp
                            size={32}
                            className="text-green-700"
                            style={{ animation: "pulse 2s ease-in-out infinite" }}
                        />
                    </div>
                </div>

                {/* Loading Text */}
                <p className="text-green-700 font-medium text-base animate-pulse">
                    Loading your dashboard...
                </p>

                {/* Optional bouncing dots */}
                <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 bg-green-600 rounded-full"
                            style={{
                                animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}
                </div>

                {/* CSS Animations */}
                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.6; transform: scale(0.95); }
                    }
                    
                    @keyframes dash {
                        0% { stroke-dashoffset: 164.93; }
                        50% { stroke-dashoffset: 41.23; }
                        100% { stroke-dashoffset: 164.93; }
                    }

                    @keyframes bounce {
                        0%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-8px); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ProgressLoader;
