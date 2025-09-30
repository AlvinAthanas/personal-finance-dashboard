import {alpha, Drawer, styled} from "@mui/material";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        background: `linear-gradient(180deg, ${
            theme.palette.primary.main
        } 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
        color: "white",
        border: "none",
        boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
                'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
            pointerEvents: "none",
        },
        // Responsive behavior
        [theme.breakpoints.down("md")]: {
            width: "280px !important",
            position: "fixed",
            zIndex: theme.zIndex.drawer,
        },
    },
}));