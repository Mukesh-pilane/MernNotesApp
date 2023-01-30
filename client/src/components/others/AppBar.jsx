import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import {useLocation, Link} from 'react-router-dom';
import {motion} from "framer-motion"

const Appbar = ({drawerWidth, handleDrawerToggle})=>{
  const location = useLocation();
    
  const heading =(path)=>{
    const array = location.pathname.split("/");
    let head=array[1]
    switch (head) {
              case '':
                return 'Notes';
                break;
              case 'create':
                return 'Create Notes';
                break;
              case 'edit_label':
                return 'Edit Labels'
              break
                default:
                return head.charAt(0).toUpperCase()+head.slice(1)+" Notes"
                break;
            }
  }  
  
  return( 
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
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

          
          <Typography 
          variant="h6" 
          noWrap 
          component="div"
          sx={{ flexGrow: 1}}
          >

          {
            heading(location.pathname)
          }
          </Typography>
                    <Avatar
          sx={{
            backgroundColor:"pink",
          }}
          >    {localStorage.getItem('user')[0]}</Avatar>
        </Toolbar>
      </AppBar>)
}

export default Appbar;