import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import
{
  Typography,  
  TextField, 
  Button,
  Container,
  Box,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {makeStyles} from '@mui/styles'


const useStyles = makeStyles({
  field:{
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
})

const baseURL = process.env.REACT_APP_BASE_URL

const CreateNote = ()=> {
  const classes = useStyles();
  const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        category: ''
    })
 const [menu, setMenu] = useState(["None"
    ])   
    const navigate = useNavigate()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date, category} = note;
                const newNote = {
                    title, content, date, category
                }
                await axios.post(baseURL+'/notes', newNote, {
                    headers: {Authorization: token}
                })
                return navigate('/')
            }
        } catch (err) {
            console.log(err.response)
           // window.location.href = "/";
        }
    }

useEffect(() =>{
        const getNote = async () =>{
            const token = localStorage.getItem('tokenStore')
          
                const res = await axios.get(baseURL+`/users/Categories`, {
                    headers: {Authorization: token}
                })
                if(res.data.length>0){
                  res.data.unshift("None")
                 setMenu(res.data)
                }
                
        }
        getNote()
    },[])
  
  
  return (
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
     <Typography
     variant= "h6"
     color = "textSecondary"
     component= "h2"
     gutterBottom
     >
     Create Note
     </Typography>
     <Box component="form" 
     onSubmit={createNote} 
          noValidate sx={{ mt: 1 }}>
     <TextField
     className= {classes.field}
     placeholder="title"
     label= "title"
     name='title'
     variant= 'standard'
     fullWidth
     value={note.title}
     onChange={onChangeInput}
     />

    <TextField
     className= {classes.field}
     placeholder="content"
     label= "content"
     multiline
     rows={4}
     name='content'
     fullWidth
     value={note.content}
     variant= 'standard'
     onChange={onChangeInput}
     />
 
     <TextField
        id="datetime-local"
        label="Deadline"
        type="datetime-local"
        name='date'
        InputLabelProps={{
          shrink: true,
        }}
        variant='standard'
        className={classes.field}
        fullWidth
        value={note.date}
        onChange={onChangeInput}
      />


  <Select
    id="demo-simple-select"
    value={note.category}
    onChange={onChangeInput}
    fullWidth
    variant='standard'
    name='category'
  >
    {menu.map((item, index) =>{
        return(<MenuItem value={item} key={index}>{item}</MenuItem>)
    })
    }
  </Select>
     <Button
     className={classes.field}
     type='submit'
     variant="contained"
     color="secondary"
     disableElevation
     >
     Create
     </Button>
     </Box>
     </Box>
     </Container>
  );
}

export default CreateNote;
