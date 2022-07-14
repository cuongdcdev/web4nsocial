import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NEAR_ICON_IMG } from '../utils';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', '<b style="color:red">Logout</b>'];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" id="header">
            <Container maxWidth="xl">
                <Toolbar disableGutters>


                    <Box sx={{ flexGrow: 1 }}>

                    </Box>
                    <img src={NEAR_ICON_IMG} className="logo-img" />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        color="#212121"
                        href=""
                        sx={{
                            mr: 2,
                            display: 'flex',
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <a href="/">
                            W4Social </a>
                    </Typography>


                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
