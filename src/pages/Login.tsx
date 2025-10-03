import { Button, TextField, Typography, Box, InputAdornment, IconButton, Divider, Link as MuiLink } from "@mui/material";
import React, { useState } from "react";
import { useSnackbar } from "../contexts/SnackbarAlertContext";
import postData from "../utils/AxioPost.ts";
import { BASE_URL } from "../utils/BaseUrl.ts";
import { useToken } from "../contexts/TokenContext.tsx";
import { useAuthentication } from "../contexts/AuthContext.tsx";
import FormWrapper from "./FormWrapper.tsx";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const { showSnackbar } = useSnackbar();
    const { token, setBearerToken, setToken } = useToken();
    const { setAuthenticated } = useAuthentication();
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    interface loginInfo {
        email: string;
        password: string;
    }

    const [loginInfo, setLoginInfo] = useState<loginInfo>({
        email: "",
        password: ""
    });

    const onEmailInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginInfo({ ...loginInfo, email: e.target.value });
    };

    const onPasswordInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginInfo({ ...loginInfo, password: e.target.value });
    };

    const onSubmit = async () => {
        if (!loginInfo.email || !loginInfo.password) {
            showSnackbar("Please fill in all fields", "warning");
            return;
        }

        setLoading(true);
        const payload = {
            email: loginInfo.email,
            password: loginInfo.password,
            attempt: "login"
        };

        const response = await postData(
            `${BASE_URL}/authenticate`,
            payload,
            token,
            null,
            setAuthenticated,
            setToken,
            setBearerToken
        );

        setLoading(false);

        if (!response.status) {
            showSnackbar("Login failed: Wrong username or password!", "error");
        } else {
            showSnackbar("Welcome back!", "success");
        }

        setLoginInfo({
            email: "",
            password: ""
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <FormWrapper
            title="Welcome Back!"
            description="Login to access your personal finance dashboard and take control of your financial future."
        >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                    variant="h4"
                    fontWeight="700"
                    sx={{
                        color: theme.palette.text.primary,
                        mb: 1
                    }}
                >
                    Sign In
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                >
                    Enter your credentials to access your account
                </Typography>
            </Box>

            {/* Email Field */}
            <TextField
                fullWidth
                placeholder="Email address"
                label="Email"
                type="email"
                value={loginInfo.email}
                onChange={onEmailInput}
                onKeyPress={handleKeyPress}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Mail size={20} color={theme.palette.text.secondary} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                        }
                    }
                }}
            />

            {/* Password Field */}
            <TextField
                fullWidth
                placeholder="Password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={loginInfo.password}
                onChange={onPasswordInput}
                onKeyPress={handleKeyPress}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock size={20} color={theme.palette.text.secondary} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} color={theme.palette.text.secondary} />
                                ) : (
                                    <Eye size={20} color={theme.palette.text.secondary} />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                        }
                    }
                }}
            />

            {/* Forgot Password Link */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
                <MuiLink
                    component={Link}
                    to="/forgot-password"
                    variant="body2"
                    sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        fontWeight: 500,
                        "&:hover": {
                            textDecoration: "underline"
                        }
                    }}
                >
                    Forgot password?
                </MuiLink>
            </Box>

            {/* Login Button */}
            <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={onSubmit}
                disabled={loading}
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: theme.palette.primary.contrastText,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: `0 4px 15px ${theme.palette.mode === "light"
                        ? "rgba(46, 125, 50, 0.3)"
                        : "rgba(102, 187, 106, 0.3)"}`,
                    "&:hover": {
                        boxShadow: `0 6px 20px ${theme.palette.mode === "light"
                            ? "rgba(46, 125, 50, 0.4)"
                            : "rgba(102, 187, 106, 0.4)"}`,
                        transform: "translateY(-2px)"
                    },
                    "&:disabled": {
                        background: theme.palette.action.disabledBackground
                    }
                }}
            >
                {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1 }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    OR
                </Typography>
            </Divider>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Don't have an account?{" "}
                    <MuiLink
                        component={Link}
                        to="/signup"
                        sx={{
                            color: theme.palette.primary.main,
                            textDecoration: "none",
                            fontWeight: 600,
                            "&:hover": {
                                textDecoration: "underline"
                            }
                        }}
                    >
                        Sign up for free
                    </MuiLink>
                </Typography>
            </Box>
        </FormWrapper>
    );
};

export default Login;