import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopNav({ onMenuClick }) {
    return (
        <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={onMenuClick} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Distributor Hub
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>N</Avatar>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>Name</Typography>
                    </Box>
                    <Button color="primary" variant="outlined" size="small">Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
