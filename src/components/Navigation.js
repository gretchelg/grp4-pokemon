import { useState } from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['home', 'login', 'gallery', 'leaderboard', 'dashboard'];

export default function Navigation(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} 
        sx={{ 
            textAlign: 'center',
            color: '#3C5AA6',
            backgroundColor: '#C5D9DB', 
            }}>
            <NavLink to="/" >
                <Typography variant="h6" sx={{ my: 2 }}>
                Pokemon
                </Typography>
            </NavLink>
        <Divider />
        <List>
            {navItems.map((item) => (
            <ListItem key={item} disablePadding>
                <NavLink to={`./${item}`}>
                    <ListItemButton 
                    sx={{ 
                        textAlign: 'center',
                        }}>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </NavLink>    
                
            </ListItem>
            ))}
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const menuStyles = {
        backgroundColor: "white",
    };

return (
    <Box sx={{ display: 'flex'}}>
    <CssBaseline /> 
    <AppBar component="nav" position="relative" style={{ backgroundColor: 'rgba(197, 217, 219,0.9)'}}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
        <NavLink to="/" >
            <Typography
                variant="h6"
                component="div"
                sx={{ 
                    flexGrow: 1, 
                    display: { xs: 'none', sm: 'block' },
                    color: '#3C5AA6',
                }}
            >
                Pokemon
            </Typography>
        </NavLink>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (

            <NavLink to={`./${item}`}>
                <Button key={item} sx={{ color: '#3C5AA6'}}>
                {item}
                </Button>
            </NavLink>    
            ))}
        </Box>
        </Toolbar>        
    </AppBar>

    <Box component="nav">
        <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        PaperProps={{
            sx: {
              // Override the Paper component styles here
            backgroundColor: '#C5D9DB',
            textDecoration: 'none',
            },
            styles: menuStyles,
        }}
        >
        {drawer}
        </Drawer>
    </Box>
    </Box>
);
}
