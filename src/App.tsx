import {alpha, Avatar, Box, CssBaseline, Divider, Typography, useTheme} from "@mui/material";
import {AuthenticationProvider, useAuthentication} from "./contexts/AuthContext.tsx";
import {Main, StyledDrawer, UserProfile} from "./utils/styles.tsx";
import PaidIcon from '@mui/icons-material/Paid';
import SavingsIcon from '@mui/icons-material/Savings';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import {Outlet} from "react-router-dom";
import List from "@mui/material/List";
import React, {useEffect} from "react";
import {useRouteProgress} from "./contexts/RouteProgressContext.tsx";
import ProgressLoader from "./Reusables/ProgressLoader.tsx";
import {HomeIcon} from "lucide-react";
import {NavItem} from "./components/Drawer/NavItem.tsx";
import {SecondaryNavItem} from './components/Drawer/SecondaryNavItem.tsx';
import {UserProvider, useUser} from "./contexts/UserContext.tsx";
import {TokenProvider} from "./contexts/TokenContext.tsx";
import {SnackbarProvider} from "./contexts/SnackbarAlertContext.tsx";
import {useLocation} from "react-router-dom";
import {ThemeProvider} from "./contexts/ThemeContext.tsx";
import {Header} from "./components/Header/Header.tsx";


function CategoryIcon() {
    return null;
}

function App() {
    const theme = useTheme();
    const {isAuthenticated} = useAuthentication();
    const [drawerWidth, setDrawerWidth] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const {isMounted} = useRouteProgress();
    const {user} = useUser()
    const location = useLocation();


    const handleDrawerOpen = () => {
        setOpen(true)
        setDrawerWidth(280);
    };
    const handleDrawerClose = () => {
        setOpen(false)
        setDrawerWidth(0);
    };

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= theme.breakpoints.values.md);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, [theme.breakpoints.values.md]);

    useEffect(() => {
        setDrawerWidth(isAuthenticated ? 280 : 0);
        if (!isMobile) handleDrawerOpen();
    }, [isAuthenticated, isMobile]);


    const handleOverlayClick = () => {
        if (isMobile) {
            handleDrawerClose();
        }
    };
    type NavItem = {
        text: string;
        icon: React.ReactNode;
        path: string;
        roles?: string[]; // Array of roles that can access this item
    }


    const navItems: NavItem[] = [
        {
            text: 'Dashboard',
            icon: <HomeIcon/>,
            path: '/dashboard',
            roles: ['admin', 'user']
        },
        {
            text: 'categories',
            icon: <CategoryIcon/>,
            path: '/categories',
            roles: ['admin', 'user']
        },
        {
            text: 'transactions',
            icon: <PaidIcon/>,
            path: '/transactions',
            roles: ['admin', 'user']
        },
        {
            text: 'Budgets',
            icon: <SavingsIcon/>,
            path: '/budgets',
            roles: ['admin', 'user']
        }
    ]
    const secondaryNavItems: NavItem[] = [
        {
            text: 'Settings',
            icon: <SettingsIcon/>,
            path: '/settings',
        },
        {
            text: 'Help & Support',
            icon: <HelpIcon/>,
            path: '/help',
        },
    ]

    const filteredNavItems = navItems.filter((item) => {
        console.log("is authenticated?",isAuthenticated);

        return true;
    });
    console.log("is authenticated?",isAuthenticated);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", m: 0, p: 0 }}>
        <CssBaseline/>
            {isAuthenticated && (
                <>
                <Header 
                    open={open} 
                    drawerWidth={drawerWidth} 
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
                <StyledDrawer
                    variant={isMobile ? "temporary" : "persistent"}
                    anchor="left"
                    open={open}
                    onClose={handleDrawerClose}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <UserProfile>
                        <Avatar
                            sx={{
                                width: 48,
                                height: 48,
                                border: `2px solid ${alpha("#fff", 0.3)}`,
                                background: alpha("#fff", 0.2),
                                color: "white",
                                fontWeight: 600,
                            }}
                            src={user?.username}
                        >
                            {user?.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box
                            sx={{display: "flex", flexDirection: "column", minWidth: 0}}
                        >
                            <Box
                                sx={{display: "flex", flexDirection: "column", gap: 1}}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{fontWeight: 600, lineHeight: 1.2, color: "white"}}
                                    noWrap
                                >
                                    {user?.username || "User"}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{opacity: 0.8, lineHeight: 1.2, color: "white"}}
                                    noWrap
                                >
                                    {user?.email}
                                </Typography>
                            </Box>

                        </Box>
                    </UserProfile>

                    {/* Main Navigation */}
                    <List sx={{mt: 2}}>
                        {filteredNavItems.map((item) => (
                            <NavItem
                                key={item.text}
                                item={item}
                                location={location}
                                onClick={isMobile ? handleDrawerClose : undefined}
                            />
                        ))}
                    </List>

                    <Divider sx={{borderColor: alpha("#fff", 0.1), my: 2, mx: 2}}/>

                    {/* Secondary Navigation */}
                    <List>
                        {secondaryNavItems.map((item) => (
                            <SecondaryNavItem
                                key={item.text}
                                item={item}
                                location={location}
                            />
                        ))}
                    </List>
                </StyledDrawer>
                </>
            )}

            <Box sx={{ display: "flex", flex: 1 }}>
                <Main
                    open={open}
                    drawerWidth={drawerWidth}
                    onClick={isMobile && open ? handleOverlayClick : undefined}
                >
                    {isMounted ? <Outlet/> : <ProgressLoader/>}
                </Main>
            </Box>
        </Box>
    )
}

export function AppWrapper() {
    return <AuthenticationProvider>
        <TokenProvider>
            <UserProvider>
                <ThemeProvider>
                    <SnackbarProvider>
                        <App/>
                    </SnackbarProvider>
                </ThemeProvider>
            </UserProvider>
        </TokenProvider>
    </AuthenticationProvider>;
}
