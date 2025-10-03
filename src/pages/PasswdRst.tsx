import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    InputAdornment,
    TextField,
    Typography,
    Link as MuiLink,
} from "@mui/material";
import { Mail, ArrowLeft } from "lucide-react";
import { useTheme } from "@mui/material";
import { useSnackbar } from "../contexts/SnackbarAlertContext";
import { Link } from "react-router-dom";
import postData from "../utils/AxioPost";
import { BASE_URL } from "../utils/BaseUrl";
import FormWrapper from "./FormWrapper";
import {useToken} from "../contexts/TokenContext.tsx";
import {useAuthentication} from "../contexts/AuthContext.tsx";

const PasswdRst: React.FC = () => {
    const theme = useTheme();
    const {token, setToken, setBearerToken} = useToken();
    const {setAuthenticated} = useAuthentication();
    const { showSnackbar } = useSnackbar();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!email) {
            showSnackbar("Please enter your email address", "warning");
            return;
        }

        setLoading(true);

        const payload = { email, attempt: "reset-password" };

        try {
            const response = await postData(`${BASE_URL}/reset-password`, payload, token, null, setAuthenticated, setToken, setBearerToken);

            if (response?.status) {
                showSnackbar("Password reset link sent to your email!", "success");
                setEmail("");
            } else {
                showSnackbar("Email not found. Please try again.", "error");
            }
        } catch (error) {
            showSnackbar("Something went wrong. Try again later.", "error");
        }

        setLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <FormWrapper
            title="Reset Your Password"
            description="Enter your email address and we'll send you a link to reset your password."
        >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                    variant="h4"
                    fontWeight="700"
                    sx={{ color: theme.palette.text.primary, mb: 1 }}
                >
                    Forgot Password?
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    No worries, we’ll help you reset it.
                </Typography>
            </Box>

            {/* Email Field */}
            <TextField
                fullWidth
                placeholder="Email address"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                        },
                    },
                }}
            />

            {/* Reset Button */}
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
                    boxShadow: `0 4px 15px ${
                        theme.palette.mode === "light"
                            ? "rgba(46, 125, 50, 0.3)"
                            : "rgba(102, 187, 106, 0.3)"
                    }`,
                    "&:hover": {
                        boxShadow: `0 6px 20px ${
                            theme.palette.mode === "light"
                                ? "rgba(46, 125, 50, 0.4)"
                                : "rgba(102, 187, 106, 0.4)"
                        }`,
                        transform: "translateY(-2px)",
                    },
                    "&:disabled": {
                        background: theme.palette.action.disabledBackground,
                    },
                }}
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1 }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    OR
                </Typography>
            </Divider>

            {/* Back to login */}
            <Box sx={{ textAlign: "center" }}>
                <MuiLink
                    component={Link}
                    to="/login"
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        fontWeight: 600,
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    <ArrowLeft size={18} /> Back to Login
                </MuiLink>
            </Box>
        </FormWrapper>
    );
};

export default PasswdRst;
