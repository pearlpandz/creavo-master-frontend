import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LanIcon from '@mui/icons-material/Lan';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const menu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Networks', icon: <LanIcon />, path: '/networks' },
    { text: 'Licenses', icon: <VpnKeyIcon />, path: '/licenses' },
    { text: 'Subscriptions', icon: <SubscriptionsIcon />, path: '/subscriptions' },
    // { text: 'Reports', icon: <BarChartIcon />, path: '/' },
    // { text: 'Settings', icon: <SettingsIcon />, path: '/' },
    // { text: 'Support', icon: <HeadsetMicIcon />, path: '/' },
];

export default function Sidebar({ open }) {
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <Box
            sx={{
                opacity: open ? 1 : 0,
                width: open ? 220 : 0,
                // transition: '0.3s',
                overflow: 'hidden',
                bgcolor: 'primary.main',
                color: 'white',
                height: '100vh',
                position: 'fixed',
                zIndex: 1200,
                p: open ? 2 : 0,
            }}
        >
            {/* <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Distributor Hub
            </Typography> */}
            <List>
                {menu.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        sx={{
                            mb: 1, borderRadius: 2, bgcolor: item.path === location.pathname ? 'primary.dark' : 'inherit', cursor: 'pointer',
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>

                        <ListItemText primary={item.text} />

                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
