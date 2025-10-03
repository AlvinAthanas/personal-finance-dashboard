import { Box, Typography } from '@mui/material';
import { TrendingUp } from 'lucide-react';

const ProgressLoader = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to bottom right, #f8fafc, #d1fae5)',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                {/* Spinner with Icon */}
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        style={{ animation: 'spin 1.5s linear infinite' }}
                    >
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
                            style={{ animation: 'dash 1.5s ease-in-out infinite' }}
                        />
                    </svg>

                    {/* Center Icon */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TrendingUp
                            size={32}
                            color="#2e7d32"
                            style={{ animation: 'pulse 2s ease-in-out infinite' }}
                        />
                    </Box>
                </Box>

                {/* Loading Text */}
                <Typography
                    sx={{
                        color: '#2e7d32',
                        fontWeight: 500,
                        fontSize: '1rem',
                        animation: 'fadeInOut 1.5s ease-in-out infinite',
                    }}
                >
                    Loading your dashboard...
                </Typography>

                {/* Bouncing dots */}
                <Box sx={{ display: 'flex', gap: 0.75 }}>
                    {[0, 1, 2].map((i) => (
                        <Box
                            key={i}
                            sx={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#16a34a',
                                borderRadius: '50%',
                                animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}
                </Box>

                {/* CSS Animations */}
                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    @keyframes pulse {
                        0%, 100% { 
                            opacity: 1; 
                            transform: scale(1); 
                        }
                        50% { 
                            opacity: 0.6; 
                            transform: scale(0.95); 
                        }
                    }
                    
                    @keyframes dash {
                        0% { stroke-dashoffset: 164.93; }
                        50% { stroke-dashoffset: 41.23; }
                        100% { stroke-dashoffset: 164.93; }
                    }

                    @keyframes bounce {
                        0%, 80%, 100% { 
                            transform: translateY(0); 
                        }
                        40% { 
                            transform: translateY(-8px); 
                        }
                    }

                    @keyframes fadeInOut {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
            </Box>
        </Box>
    );
};

export default ProgressLoader;