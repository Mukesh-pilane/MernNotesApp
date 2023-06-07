import React, {useState, useEffect} from 'react'


import axios from 'axios'
import {Container} from '@mui/material'
import NoteCard from './NoteCard'
import Masonry from 'react-masonry-css'
import {makeStyles} from '@mui/styles'
import {useLocation, useParams} from 'react-router-dom';

const useStyles = makeStyles({
mymasonrygrid : {
 /* display: '-webkit-box', Not needed if autoprefixing */
 /* display: '-ms-flexbox', Not needed if autoprefixing */
  display: 'flex',
  marginLeft: '-30px', /* gutter size offset */
  width: 'auto'
},
mymasonrygrid_column :{
  paddingLeft: '30px',/* gutter size */
  backgroundClip: 'padding-box'
},
/* Style your items */
div :{ /* change div to reference your elements you put in <Masonry> */
  marginBottom: '30px'
}
})


export default function Home() {
  const classes = useStyles();
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')
    const baseURL= process.env.REACT_APP_BASE_URL
    const location = useLocation();
    const { label } = useParams()
    
      
    const getNotes = async (token) =>{
      const url = label==null?baseURL+'/notes/':baseURL+'/notes/Category/'+label
        const res = await axios.get(url, {
            headers:{Authorization: token}
        })
        setNotes(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [label])

    const deleteNote = async (id) =>{
        try {
            if(token){
                await axios.delete(baseURL + `/notes/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }
    
    const breakpoints={
      default:3,
      1100:2,
      700:1
    }

    return (
        <Container>

<Masonry
  breakpointCols={breakpoints}
  className={classes.mymasonrygrid}
  columnClassName={classes.mymasonrygrid_column}>
  {/* array of JSX items */}
           {
             notes.map(note =>(
            <div className={classes.div} key={note._id}>
              <NoteCard note={note}
              deleteNote={deleteNote}
              />
             </div>
             ))
           }

</Masonry>
        </Container>
    )
}