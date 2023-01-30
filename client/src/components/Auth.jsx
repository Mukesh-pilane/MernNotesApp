import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert'
import  {useState} from 'react'
import axios from 'axios';

const baseURL = 'http://localhost:5000'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
         Keeper
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn({setIsLogin}) {
//state variables
  const [user, setUser] = useState({name: '',email: '',password: '' })
  const [err, setErr] = useState('')
  const [onLogin, setOnLogin] = useState(false)
  const [passwordErr, setPasswordErr] = useState({
    flag:false,
    des:''
  });
  const [emailErr, setEmailErr] = useState({
    flag:false,
    des:''
  });
  const [usernameErr, setUserNameErr] = useState({
    flag:false,
    des:''
  })
  
  //Email, password and username validation
 const validateEmail = (mail)=>{
 if(mail.length===0){
   setEmailErr({flag:true, des:'Please fill this field'})
   return false
 }
 else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)))
  {
    setEmailErr({flag:true, des:'Please Enter valid email address'})
    return false
  }else{
    return true
  }
};
 const validateUserName = (name)=>{
     if(name.length===0){
   setUserNameErr({flag:true, des:'Please fill this field'});
   return false;
 }else{
   return true;
 };
  };
 const validatePassword = (pass)=>{
  if(pass.length===0){
   setPasswordErr({flag:true, des:'Please fill this field'});
   return false;
  }else if(pass.length < 8){
   setPasswordErr({
     flag:true, des:'password must be atleast of 8 character'
   })
   return false
 }else if(!(pass.match(/[a-z]/g))){
   setPasswordErr({
     flag:true,
     des: 'Password must contain lowercase letter'
   })
   return false
 }else if(!(pass.match(/[A-Z]/g))){
   setPasswordErr({
     flag:true,
     des: 'Password must contain uppercase letter'
   })
   return false
 }else if(!(pass.match(/[0-9]/g))){
   setPasswordErr({
     flag:true,
     des: 'Password must contain a number'
   })
   return false
 }
 else{
   return true
 }
  };
 
 //Err reomver
  const removeErr = (field)=>{
    switch (field) {
      case 'password':
        setPasswordErr({flag:false,des:''});
        break;
      case 'name':
        setUserNameErr({flag:false,des:''})
        break;
      case 'email':
        setEmailErr({flag:false,des:''})
        break;
      default:
      break;
    }
  }
  
  //input change handler
  const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
        setErr('')
        removeErr(name);
    }
  
  // login handler
  const handlelogin = async (event) => {
    
    event.preventDefault();
        setEmailErr({flag:false, des:''});
        setPasswordErr({flag:false, des:''});
        setErr('')
        //setUser({name: '',email: '',password: '' });
        let email = user.email.trim(' ');
        let password = user.password.trim(' ');
        
        validateEmail(email);
        validatePassword(password);
        
      if(validateEmail(email) && validatePassword(password)){
      try {
            const res = await axios.post(baseURL +'/users/login',{
                email,
                password
            })
            localStorage.setItem('tokenStore', res.data.token)
            localStorage.setItem('user', res.data.user)
            setIsLogin(true)
            
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
      }
  };
  
  // register handler
  const handleregister = async event =>{
        event.preventDefault()
        setEmailErr({flag:false, des:''});
        setUserNameErr({flag:false, des:''});
        setPasswordErr({flag:false, des:''});
        setErr('')
        //setUser({name: '',email: '',password: '' });
        
        let email = user.email.trim(' ');
        let username = user.name.trim(' ');
        let password = user.password.trim(' ');
        
        validateEmail(email);
        validateUserName(username);
        validatePassword(password);
        
       if(validateEmail(email) && validateUserName(username) && validatePassword(password)){
        try {
            const res = await axios.post(baseURL + '/users/register',{
                username,
                email,
                password
            })
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }}

    }


  return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          
      {!onLogin ?     
      //Login Form
      (
        <>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" 
          onSubmit={handlelogin} 
          noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
              error={emailErr.flag}
              helperText={emailErr.des}
              value={user.email}
              onChange={onChangeInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant='standard'
              error={passwordErr.flag}
              helperText={passwordErr.des}
              value={user.password}
              onChange={onChangeInput} 
            />
            {
            err !==''&& <Alert severity="error">{err}</Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>
                <Link href="#" variant="body2"
                onClick={() =>{ 
                setOnLogin(true)
                setEmailErr({flag:false, des:''});
                setPasswordErr({flag:false, des:''});
                setErr('')
                setUser({name: '',email: '',password: '' });
                }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </>
          )
          :
         // Register Form
          (<>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleregister} noValidate sx={{ mt: 1 }}>
           <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="name"
              autoComplete="username"
              variant = 'standard'
              error={usernameErr.flag}
              helperText={usernameErr.des}
              value={user.name}
              onChange={onChangeInput}              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant= 'standard'
              error={emailErr.flag}
              helperText={emailErr.des}
              value={user.email}
              onChange={onChangeInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant= 'standard'
              error={passwordErr.flag}
              helperText={passwordErr.des}
              value={user.password}
              onChange={onChangeInput}
            />
            {
            err !==''&& <Alert severity="error">{err}</Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2"
                onClick={() =>{
                setOnLogin(false)
                setEmailErr({flag:false, des:''});
                setUserNameErr({flag:false, des:''});
                setPasswordErr({flag:false, des:''});
                setErr('')  
                setUser({name: '',email: '',password: '' });
                }}>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          < />
          )
      }
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}