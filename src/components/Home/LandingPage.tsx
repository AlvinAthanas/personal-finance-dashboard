import { Box, Container, Typography, Button, Grid, Card, CardContent, Paper, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TrendingUp, PieChart, Shield, Zap, Target, Wallet, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext.tsx";

const LandingPage = () => {
    const navigate = useNavigate();
    const {theme, muiTheme} = useTheme();
    const primaryColor = muiTheme.palette.primary.main;
    const secondaryColor = muiTheme.palette.secondary.main;
    const backgroundColor = muiTheme.palette.background.default;
    // const accentColor = muiTheme.palette.secondary.light;
    const textPrimary = muiTheme.palette.text.primary;
    const textSecondary = muiTheme.palette.text.secondary;
    const paperBg = muiTheme.palette.background.paper;

    // Green finance theme colors

    const features = [
        {
            icon: <PieChart size={40} />,
            title: "Smart Budgeting",
            description: "Track expenses and create budgets that adapt to your spending patterns"
        },
        {
            icon: <TrendingUp size={40} />,
            title: "Investment Tracking",
            description: "Monitor your portfolio performance and get insights on your investments"
        },
        {
            icon: <Target size={40} />,
            title: "Financial Goals",
            description: "Set and achieve your financial goals with personalized recommendations"
        },
        {
            icon: <Shield size={40} />,
            title: "Bank-Level Security",
            description: "Your data is encrypted and protected with industry-leading security"
        },
        {
            icon: <Zap size={40} />,
            title: "Real-Time Sync",
            description: "Automatic synchronization across all your devices and accounts"
        },
        {
            icon: <Wallet size={40} />,
            title: "Multi-Account Support",
            description: "Connect and manage multiple bank accounts in one place"
        }
    ];

    const stats = [
        { value: "100K+", label: "Active Users" },
        { value: "$2B+", label: "Money Managed" },
        { value: "99.9%", label: "Uptime" },
        { value: "4.9/5", label: "User Rating" }
    ];

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: backgroundColor }}>
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: paperBg,
                    borderBottom: `1px solid ${alpha(primaryColor, 0.1)}`,
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    backdropFilter: "blur(10px)",
                    boxShadow: theme === "light"
                        ? "0 2px 8px rgba(0,0,0,0.05)"
                        : "0 2px 8px rgba(0,0,0,0.3)"
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 2
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#ffffff"
                                }}
                            >
                                <TrendingUp size={24} />
                            </Box>
                            <Typography variant="h5" fontWeight="700" sx={{ color: primaryColor }}>
                                FinanceFlow
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/signin")}
                                sx={{
                                    borderColor: primaryColor,
                                    color: primaryColor,
                                    px: 3,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: "600",
                                    "&:hover": {
                                        borderColor: secondaryColor,
                                        backgroundColor: alpha(primaryColor, 0.08)
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/signup")}
                                sx={{
                                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                                    color: "#ffffff",
                                    px: 3,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: "600",
                                    boxShadow: `0 4px 15px ${alpha(primaryColor, 0.3)}`,
                                    "&:hover": {
                                        boxShadow: `0 6px 20px ${alpha(primaryColor, 0.4)}`,
                                        transform: "translateY(-2px)"
                                    }
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid size={{xs:12, md:6}}>
                        <Box>
                            <Typography
                                variant="h2"
                                fontWeight="700"
                                sx={{
                                    mb: 3,
                                    lineHeight: 1.2,
                                    color: textPrimary
                                }}
                            >
                                Take Control of Your
                                <Box component="span" sx={{ color: primaryColor }}> Financial Future</Box>
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 4,
                                    lineHeight: 1.6,
                                    color: textSecondary,
                                    fontWeight: 400
                                }}
                            >
                                Smart budgeting, investment tracking, and financial planning all in one powerful dashboard
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ChevronRight />}
                                    onClick={() => navigate("/signup")}
                                    sx={{
                                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                                        color: "#ffffff",
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 3,
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        fontWeight: "600",
                                        boxShadow: `0 6px 20px ${alpha(primaryColor, 0.3)}`,
                                        "&:hover": {
                                            boxShadow: `0 8px 25px ${alpha(primaryColor, 0.4)}`,
                                            transform: "translateY(-2px)"
                                        }
                                    }}
                                >
                                    Start Free Trial
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate("/signin")}
                                    sx={{
                                        borderColor: primaryColor,
                                        color: primaryColor,
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 3,
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        fontWeight: "600",
                                        "&:hover": {
                                            backgroundColor: alpha(primaryColor, 0.08),
                                            borderColor: secondaryColor
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>

                            {/* Stats */}
                            <Grid container spacing={3}>
                                {stats.map((stat, index) => (
                                    <Grid size={{xs:6, sm:3}} key={index}>
                                        <Box>
                                            <Typography
                                                variant="h4"
                                                fontWeight="700"
                                                sx={{ color: primaryColor, mb: 0.5 }}
                                            >
                                                {stat.value}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: textSecondary }}>
                                                {stat.label}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid size={{xs:12, md:6}}>
                        <Box
                            sx={{
                                position: "relative",
                                height: 500,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {/* Decorative elements */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    width: "300px",
                                    height: "300px",
                                    background: `radial-gradient(circle, ${alpha(primaryColor, 0.15)} 0%, transparent 70%)`,
                                    borderRadius: "50%",
                                    top: "10%",
                                    right: "10%",
                                    animation: "float 6s ease-in-out infinite",
                                    "@keyframes float": {
                                        "0%, 100%": { transform: "translateY(0px)" },
                                        "50%": { transform: "translateY(-20px)" }
                                    }
                                }}
                            />
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    background: paperBg,
                                    border: `1px solid ${alpha(primaryColor, 0.2)}`,
                                    maxWidth: 400,
                                    boxShadow: theme === "light"
                                        ? `0 20px 60px ${alpha(primaryColor, 0.15)}`
                                        : `0 20px 60px ${alpha("#000", 0.4)}`
                                }}
                            >
                                <Box sx={{ textAlign: "center", mb: 3 }}>
                                    <TrendingUp size={60} color={primaryColor} />
                                </Box>
                                <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: textPrimary }}>
                                    Your Financial Dashboard
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="body2" sx={{ color: textSecondary }}>
                                            Total Balance
                                        </Typography>
                                        <Typography variant="body2" fontWeight="600" sx={{ color: primaryColor }}>
                                            $45,230.00
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            background: alpha(primaryColor, 0.2),
                                            overflow: "hidden"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "75%",
                                                height: "100%",
                                                background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Typography variant="caption" sx={{ color: textSecondary }}>
                                    Portfolio growing 12% this month
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Features Section */}
            <Box sx={{ backgroundColor: alpha(primaryColor, 0.03), py: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        fontWeight="700"
                        align="center"
                        sx={{ color: textPrimary, mb: 2 }}
                    >
                        Everything You Need to Succeed
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ mb: 6, color: textSecondary, maxWidth: 700, mx: "auto" }}
                    >
                        Powerful tools and insights to help you make smarter financial decisions
                    </Typography>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid size={{xs:12, sm:6, md:4}} key={index}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        backgroundColor: paperBg,
                                        border: `1px solid ${alpha(primaryColor, 0.1)}`,
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: theme === "light"
                                                ? `0 12px 30px ${alpha(primaryColor, 0.15)}`
                                                : `0 12px 30px ${alpha("#000", 0.4)}`,
                                            borderColor: alpha(primaryColor, 0.3)
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box
                                            sx={{
                                                width: 70,
                                                height: 70,
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: alpha(primaryColor, 0.1),
                                                color: primaryColor,
                                                mb: 2
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" fontWeight="600" sx={{ mb: 1, color: textPrimary }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: textSecondary, lineHeight: 1.6 }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        textAlign: "center",
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                        color: "#ffffff",
                        boxShadow: `0 20px 60px ${alpha(primaryColor, 0.3)}`
                    }}
                >
                    <Typography variant="h3" fontWeight="700" sx={{ mb: 2 }}>
                        Ready to Transform Your Finances?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
                        Join thousands of users who are already taking control of their financial future
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/signup")}
                        sx={{
                            backgroundColor: "#ffffff",
                            color: primaryColor,
                            px: 5,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            "&:hover": {
                                backgroundColor: alpha("#ffffff", 0.9),
                                transform: "translateY(-2px)"
                            }
                        }}
                    >
                        Start Your Free Trial
                    </Button>
                </Paper>
            </Container>

            {/* Footer */}
            <Box
                sx={{
                    backgroundColor: alpha(primaryColor, 0.05),
                    py: 4,
                    borderTop: `1px solid ${alpha(primaryColor, 0.1)}`
                }}
            >
                <Container maxWidth="xl">
                    <Typography variant="body2" align="center" sx={{ color: textSecondary }}>
                        © {new Date().getFullYear()} FinanceFlow. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;