// FormWrapper.tsx
import React from "react";
import { Box, Typography, useTheme, alpha, Paper } from "@mui/material";
import { TrendingUp, Shield, Lock } from "lucide-react";

interface FormWrapperProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, description, children }) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Left Side - Brand Section */}
            <Box
                sx={{
                    flex: 0.4,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: theme.palette.primary.contrastText,
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 0,
                    justifyContent: "center",
                    p: 6,
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Decorative background elements */}
                <Box
                    sx={{
                        position: "absolute",
                        width: "400px",
                        height: "400px",
                        background: `radial-gradient(circle, ${alpha("#ffffff", 0.1)} 0%, transparent 70%)`,
                        borderRadius: "50%",
                        top: "-10%",
                        right: "-10%",
                        animation: "float 8s ease-in-out infinite",
                        "@keyframes float": {
                            "0%, 100%": { transform: "translateY(0px) scale(1)" },
                            "50%": { transform: "translateY(-30px) scale(1.05)" }
                        }
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        width: "250px",
                        height: "250px",
                        background: `radial-gradient(circle, ${alpha("#ffffff", 0.08)} 0%, transparent 70%)`,
                        borderRadius: "50%",
                        bottom: "10%",
                        left: "10%",
                        animation: "float 6s ease-in-out infinite reverse"
                    }}
                />

                {/* Logo and branding */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        background: alpha("#ffffff", 0.15),
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 4,
                        boxShadow: `0 8px 32px ${alpha("#000000", 0.1)}`
                    }}
                >
                    <TrendingUp size={48} color="#ffffff" />
                </Box>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                        textAlign: "center",
                        textShadow: `0 2px 10px ${alpha("#000000", 0.2)}`
                    }}
                >
                    {title || "Welcome!"}
                </Typography>

                <Typography
                    variant="h6"
                    maxWidth="450px"
                    textAlign="center"
                    sx={{
                        color: alpha("#ffffff", 0.95),
                        mb: 4,
                        lineHeight: 1.6,
                        fontWeight: 400
                    }}
                >
                    {description || "Securely login and manage your account with ease."}
                </Typography>

                {/* Feature badges */}
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Shield size={20} color={alpha("#ffffff", 0.9)} />
                        <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.9) }}>
                            Bank-level Security
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Lock size={20} color={alpha("#ffffff", 0.9)} />
                        <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.9) }}>
                            256-bit Encryption
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Right Side - Form Section */}
            <Box
                sx={{
                    flex: 0.6,
                    minWidth: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.palette.background.default,
                    p: 6, // ✅ match padding with left for balance
                }}
            >
                <Paper
                    elevation={isLight ? 3 : 8}
                    sx={{
                        width: "100%",
                        maxWidth: 450,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 3,
                        p: 5,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: isLight
                            ? `0 8px 40px ${alpha(theme.palette.primary.main, 0.08)}`
                            : `0 8px 40px ${alpha("#000000", 0.5)}`
                    }}
                >
                    {children}
                </Paper>
            </Box>
        </Box>
    );
};

export default FormWrapper;