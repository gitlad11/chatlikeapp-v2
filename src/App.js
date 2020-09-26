import React, { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import UserContext from './UserContext'
import MainHeader from './Components/MainHeader'
import MessageInput from './Components/MessageInput'
import Dialog from './Components/Dialog'
import Main from './Components/Main'
//import { mainUser , messages, Message } from './Data'
import {Switch, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
//import { Redirect } from 'react-router-dom'
import axios from 'axios'
import history from './history'
import socket from './Socket'




function App() {  
  
  const [data , setData] = useState([])
  const [mainUser, setMainUser ] = useState()
  const [contactSelected, setContactSelected] = useState({})
  const [currentMessages , setCurrentMessages] = useState([])
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [filteredContacts, setFilterContacts] = useState([])
  const [darktheme, setDarkTheme] = useState(false)


  //TO DO CREATE ICON WHEN MESSAGE IS TYPING
  //useEffect(() => {
    //console.log(message)
  //}, [message, setMessage])

useEffect(() => {
   async function fetch(){
    var token = localStorage.getItem("auth-token")
    if(token === null){
      localStorage.setItem("auth-token", "")
      token = ""
    }
    const tokenValid = await axios.post('/authenticate',
            null, { headers : 
              { "x-auth-token" : token } 
            })
            await setMainUser(tokenValid.data.user)
            await axios.post('/friends', tokenValid.data.user.friends)
            .then((res) => setData(res.data))
    }
    fetch()        
  }, [])

  //each time contactSelected, data, search is changing
  useEffect(() => {
    const curContact = data.find((d) => d._id === contactSelected._id)
    setCurrentMessages((curContact && curContact.messages) || [])
    filterContacts(data, search)
  }, [contactSelected, data, search])

  async function getDialogs(){
    socket.emit('getDialog', { contacts : mainUser.friends })
    socket.on('dialogs', (friends) => {
      setData(friends)
  })
  }

  async function pushMessage(){
    socket.emit('messageSend', { from : mainUser, to : contactSelected, message : message })
    setMessage('')
    getDialogs()
  }


  //comparing data and search state
  function filterContacts(data, search){
    const result = data.filter(({ contact }) => {
      return !search || contact.name.includes(search)
    })
    //set result of comparing in filter
    setFilterContacts(result)
  }
  
    if(mainUser || mainUser !== undefined){                          
    return (
        <div className="app">
        <Sidebar user={mainUser} 
                search={search} 
                 setSearch={setSearch}
                 filteredContacts={filteredContacts}
                 setContactSelected={setContactSelected}/>
          { contactSelected._id ? (       
         <main className={darktheme== true ? 'dark' : 'light'}>
            <MainHeader contactSelected={contactSelected}
                        darktheme={darktheme}
                        setDarkTheme={setDarkTheme}/>
            <Dialog mainUser = {mainUser}  messages={currentMessages}/>
            <MessageInput message={message}
                          setMessage={setMessage}
                          pushMessage={pushMessage}/>
        </main>
          ) : (
            <Main 
                  user={mainUser}
                  setContactSelected={setContactSelected}
                  />
          )}
        </div>  
    )} else {
        history.push('/login')
      return (
      <div className='app'>
        <Switch>
        <Route  path='/login' component={Login}/>
        <Route  path='/registration' component ={Register}/>
        </Switch>
      </div>
    )}
}

export default App;
