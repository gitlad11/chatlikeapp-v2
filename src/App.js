import React, { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import UserContext from './UserContext'
import MainHeader from './Components/MainHeader'
import MessageInput from './Components/MessageInput'
import Dialog from './Components/Dialog'
import Main from './Components/Main'
import Hamburger from './Components/hamburger'
//import { mainUser , messages, Message } from './Data'
import {Switch, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
//import { Redirect } from 'react-router-dom'
import axios from 'axios'
import history from './history'
import socket from './Socket'




function App() {  
  
  const [mainUser, setMainUser ] = useState()
  const [data , setData] = useState([])
  const [contactSelected, setContactSelected] = useState({})
  const [currentMessages , setCurrentMessages] = useState([])
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [filteredContacts, setFilterContacts] = useState([])
  const [darktheme, setDarkTheme] = useState(false)
  const [open , setOpen] = useState(false)

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

  useEffect(() => {

      if(mainUser || mainUser !== undefined){
        socket.emit('ehlo', mainUser.number)
      }

  },[mainUser, setMainUser])

  socket.on('seen', () => {
          socket.emit('getDialogs', { contacts : data })
  }) 

  //each time contactSelected, data, search is changing
  useEffect(() => {
    const curContact = data.find((d) => d._id === contactSelected._id)
    setCurrentMessages((curContact && curContact.messages) || [])
    filterContacts(data, search)
  }, [contactSelected, data, search])

   async function getDialogs(){
    await socket.emit('getDialog', { contacts : mainUser.friends })
      socket.on('dialogs', (friends) => {
      setData(friends)
      console.log('render')
  })
  }

  async function pushMessage(){
    socket.emit('messageSend', { from : mainUser, to : contactSelected, message : message })
    await setMessage('')
    getDialogs()
  }

  async function onMain(){
    setContactSelected({})
  }
  const onHam = () => {
    if(open){ setOpen(false)} else { setOpen(true) }
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
          history.push('/')               
    return (
        <div className="app">
        <Hamburger onShow={onHam} 
                open={open} />
                
        <Sidebar open={open} 
                user={mainUser} 
                search={search} 
                 setSearch={setSearch}
                 filteredContacts={filteredContacts}
                 setContactSelected={setContactSelected}/>
          { contactSelected._id ? (       
         <main className={darktheme== true ? 'dark' : 'light'}>
            <MainHeader onMain={onMain}
                        contactSelected={contactSelected}
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
