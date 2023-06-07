import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import Notes from "./components/Note"
import Auth from "./components/Auth"
import Loader from './components/others/Loader'

function App() {
  const [isLogin, setIsLogin] = useState(null)
  const baseURL = process.env.REACT_APP_BASE_URL
  useEffect(() =>{
    const checkLogin = async () =>{
      const token = localStorage.getItem('tokenStore');
      if(token){
        const verified = await axios.get(baseURL + '/users/verify',{
          headers:{ Authorization: token}
        })
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()
      }else{
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])
  
  const render =()=>{
    if(isLogin==null){
      return (
        <Loader />
        )
    }else if(isLogin){
      return <Notes setIsLogin={setIsLogin} /> 
    }else{
     return <Auth setIsLogin={setIsLogin} />
    }
  }
  return (
            <Router>
    <div className="App">
      {
        render()
      }
  
    </div>
            </Router>
  );
}

export default App;
