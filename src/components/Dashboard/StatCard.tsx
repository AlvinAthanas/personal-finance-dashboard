import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface StatsCardProps {
    title: string;
    value: number;
    trend?: "up" | "down";
    percentage?: number;
    icon: React.ReactNode;
    color?: string;
    gradient?: [string, string];
}

const StatsCard: React.FC<StatsCardProps> = ({
                                                 title,
                                                 value,
                                                 trend,
                                                 percentage,
                                                 icon,
                                                 gradient = ["#42a5f5", "#478ed1"],
                                             }) => {
    return (
        <Card
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 3,
                boxShadow:
                    "rgba(145, 158, 171, 0.2) 0px 0px 2px, rgba(145, 158, 171, 0.28) 0px 12px 24px -4px",
                backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                color: "#fff",
                minHeight: 160,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                    transform: "translateY(-4px)",
                },
            }}
        >
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* Top Row */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    {/* Icon */}
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "12px",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 28,
                        }}
                    >
                        {icon}
                    </Box>

                    {/* Trend Indicator */}
                    {percentage !== undefined && percentage !== 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                px: 1.5,
                                py: 0.5,
                                borderRadius: "12px",
                                backgroundColor: trend === "up" ? "rgba(0, 200, 83, 0.9)" : "rgba(229, 57, 53, 0.9)",
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                        >
                            {trend === "up" ? (
                                <ArrowUpwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            ) : (
                                <ArrowDownwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            )}
                            {percentage}%
                        </Box>
                    )}
                </Box>

                {/* Bottom Content */}
                <Box>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, letterSpacing: 0.5 }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        ${value.toLocaleString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
