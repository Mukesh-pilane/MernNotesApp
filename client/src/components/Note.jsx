import React from 'react'
import Home from './Notes/Notes'
import CreateNote from './Notes/CreateNote'
import EditNote from './Notes/EditNote'
import EditLabel from './Labels/EditLabel'
import {Routes, Route, useLocation} from 'react-router-dom'
import Layout from './Layout';
import {motion, AnimatePresence} from "framer-motion"


export default function Notes({setIsLogin}) {
  const [update, setUpdate]= React.useState(false)
  const location = useLocation();
  
    return (
 
        <AnimatePresence exitBeforeEnter>
        <Layout setIsLogin={setIsLogin} update={update} key={location.pathname}>
        <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/:label" element={<Home  />} exact /> 
                <Route path="/create" element={<CreateNote />} exact />
                <Route path="/edit/:id"
                component={EditNote} element={<EditNote />} exact />
                <Route path="/edit_label"
                component={EditLabel} element={<EditLabel update={update} setUpdate={setUpdate}/>} exact />
        </Routes>
        </Layout>
        </AnimatePresence>
    )
}