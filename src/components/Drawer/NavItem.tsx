import {alpha, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ChevronRight, Link} from "lucide-react";

export const NavItem = ({
                     item,
                     location,
                     onClick,
                 }: {
    item: any;
    location: any;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
    const isSelected = location.pathname === item.path;
    const [loading, setLoading] = React.useState(true);

    return (
        <ListItem disablePadding>
            <ListItemButton
                component={Link}
                to={item.path}
                selected={isSelected}
                onClick={onClick} // ✅ safe now
                sx={{
                    borderRadius: "12px",
                    margin: (theme) => theme.spacing(0.5, 1.5),
                    padding: (theme) => theme.spacing(1, 1.5),
                    transition: "all 0.2s ease-in-out",
                    color: "white !important",
                    "&:hover": {
                        background: alpha("#fff", 0.15),
                        transform: "translateX(4px)",
                    },
                    "&.Mui-selected": {
                        background: alpha("#fff", 0.25),
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        "& .MuiListItemIcon-root": {
                            color: "white",
                        },
                        "& .MuiListItemText-primary": {
                            fontWeight: 600,
                            color: "white",
                        },
                        "&:hover": {
                            background: alpha("#fff", 0.3),
                        },
                    },
                }}
            >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    primary={item.text}
                    sx={{
                        "& .MuiTypography-root": {
                            fontWeight: isSelected ? 600 : 400,
                            color: "inherit",
                        },
                    }}
                />
                {isSelected && <ChevronRight size={16} />}
            </ListItemButton>
        </ListItem>
    );
};