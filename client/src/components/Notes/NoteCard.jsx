import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {format} from 'timeago.js'
import {motion, AnimatePresence} from "framer-motion"

const NoteCard = ({note, deleteNote})=>{
  return(

    <motion.div
              exit={{
            scale:0
          }}
    initial={{
      scale:0.5
    }}
    animate={{
      scale:1
    }}
    
    >
    <Card elevation={1}>
    <CardHeader 
    action={
    <>
        <IconButton
      component={Link} to={"/edit/"+ note._id}
      aria-label="settings">
            <EditOutlinedIcon
            />
          </IconButton>
      <IconButton
      onClick={() => deleteNote(note._id)} 
      aria-label="settings">
            <DeleteIcon />
          </IconButton>
          </>
    }
    title={note.title}
    subheader={format(note.date)}
    />
    <CardContent>
    <Typography
    variant='body2'
    color='textSecondary'
    >
    {note.content}
    </Typography>
    </CardContent>
    </Card>
    </motion.div>

    )
}

export default NoteCard;