import React,{useEffect, useState} from 'react';
import {Toolbar, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Box, Drawer, IconButton} from '@mui/material';
import {makeStyles} from '@mui/styles'
import {useNavigate, useLocation} from 'react-router-dom';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import axios from 'axios'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth =240;

const useStyles = makeStyles((theme) => {
  return{
  page:{
    background: '#f9f9f9',
    width: '100%',
  },
  drawer:{
    width: drawerWidth
  },
  drawerPaper:{
    width: drawerWidth
  },
  root:{
    display:'flex'
  },
  active:{
    background: '#f4f4f4'
  }
  }
})

const baseURL ="http://localhost:5000"

const SideBar = ({ mobileOpen ,handleDrawerToggle, update, setIsLogin}, props:Props)=>{
  
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  
  const [menu, setMenu] = useState([{
    text: '',
    Icon: '',
    path: '',
  }])
  
  useEffect(() =>{
        const getNote = async () =>{
            const token = localStorage.getItem('tokenStore')
          
                const res = await axios.get(baseURL+`/users/Categories`, {
                    headers: {Authorization: token}
                })
                const category= []
                res.data.map(item =>{
                  category.push({
                    text: item,
                    Icon: <LabelOutlinedIcon color="secondary" />,
                    path: "/" + item,
                  })
                })
                //console.log(category)
              setMenu(category)
            
        }
        getNote()
    },[update])
  
  const drawer=(
    <>
      <Toolbar>
      <Typography>
            Menu
      </Typography>
      </Toolbar>
    <Divider />
      <List>
          <div
         className={
            location.pathname==='/' ? classes.active : null
          }
          >
         <ListItem
          button
          onClick={()=>{
          navigate('/');
          }}
          
        >
        <ListItemIcon>
        {<SubjectOutlinedIcon color="secondary" />}
        </ListItemIcon>
         <ListItemText 
         primary='My Notes'/>
        </ListItem>
        </div>
                  <div
         className={
            location.pathname==='/create' ? classes.active : null
          }
          >
         <ListItem
          button
          onClick={()=>{
          navigate('/create');
          }}
        >
        <ListItemIcon>
        {<AddBoxOutlinedIcon color="secondary" />}
        </ListItemIcon>
         <ListItemText 
         primary='Create Notes'/>
        </ListItem>
        </div>
        <Divider 
        sx={{
            marginBottom:1,
            marginTop:1
          }}
          color="secondary"
        />
         <ListItem
        >
         <ListItemText 
         primary='Edit Label'/>
        <IconButton
                  button
          onClick={()=>{
          navigate('/edit_label');
          }}
        >
        <EditOutlinedIcon
        color="secondary"
        />
        </IconButton>
        </ListItem>
      {menu.map((item, index) =>{
        return(

    <div className={
            location.pathname===item.path ? classes.active : null
          }
          key={index}
          >
         <ListItem
          button
          onClick={()=>{
          navigate(item.path);
          }}
        >
        <ListItemIcon>
        {item.Icon}
        </ListItemIcon>
         <ListItemText 
         primary={item.text}/>
        </ListItem>
         </div>

        );
      })}
                <div
         className={
            location.pathname==='/edit_label' ? classes.active : null
          }
          >
         <ListItem
          button
          onClick={()=>{
          navigate('/edit_label');
          }}
          
        >
        <ListItemIcon>
        {<AddBoxOutlinedIcon color="secondary" />}
        </ListItemIcon>
         <ListItemText 
         primary='Create Label'/>
        </ListItem>
        </div>
              <Divider 
              sx={{
            marginBottom:1,
            marginTop:1
          }}
          color="secondary"
        />
       <ListItem
          button
          onClick={()=>{
          localStorage.clear()
        setIsLogin(false)
          }}
        >
        <ListItemIcon>
        <LogoutIcon color="secondary" />
        </ListItemIcon>
         <ListItemText 
         primary="Log out"/>
        </ListItem>
      </List>
      </>
      )
  
  const container = window !== undefined ? () => window().document.body : undefined;
  return(
          <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    )
}

export default SideBar;