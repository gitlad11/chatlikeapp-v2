import React, { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import UserContext from './UserContext'
import MainHeader from './Components/MainHeader'
import MessageInput from './Components/MessageInput'
import Dialog from './Components/Dialog'
import { mainUser , messages, Message } from './Data'


function App() {  
  const [data , setData] = useState(messages)
  const [contactSelected, setContactSelected] = useState({})
  const [currentMessages , setCurrentMessages] = useState([])
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [filteredContacts, setFilterContacts] = useState([])

  //TO DO CREATE ICON WHEN MESSAGE IS TYPING
  //useEffect(() => {
    //console.log(message)
  //}, [message, setMessage])

  //each time contactSelected, data, search is changing
  useEffect(() => {
    const curContact = data.find((d) => d.contact.id === contactSelected.id)
    setCurrentMessages((curContact && curContact.messages) || [])
    filterContacts(data, search)
  }, [contactSelected, data, search])

  //creating new message
  function pushMessage(){
    const index = data.findIndex((d) => d.contact.id === contactSelected.id)
    const newData = Object.assign([], data, {
      [index]:{
        contact: contactSelected,
        messages: [...data[index].messages, new Message(true, message, new Date())]
      }
    })

    setData(newData)
    setMessage('')
  }
  //comparing data and search state
  function filterContacts(data, search){
    const result = data.filter(({ contact }) => {
      return !search || contact.name.includes(search)
    })
    //set result of comparing in filter
    setFilterContacts(result)
  }
  
  //const user = { "id" : "1" ,
              //"number" : "87058651253",
              //"avatar" : "",
              //"friends" : [{'id' : "2", "number" : "8798776311" ,"messages" : [{"id" : "12"}]
                                    //},
                           //{"id" : "3", "number" : "1837264832"}, "messages" : []]
            //}
  //const messages = [{"id": "12", "from" : "8798776311" , "to" : "1837264832", "text" : "Hey yo" , "seen" : false},
                    //{ "id" : "14", "from" : "1837264832" , "to" : "8798776311", "text" : "fck yo", "seen" : false},
                    //{ "id" : "16", "from" : "87058651253", "to" : "8798776311", "text" : "Call me", "seen" : true}]          
    return (
        <div className="app">
        <Sidebar user={mainUser} 
                search={search} 
                 setSearch={setSearch}
                 filteredContacts={filteredContacts}
                 setContactSelected={setContactSelected}/>
         <main>
            <MainHeader contactSelected={contactSelected} />
            <Dialog messages={currentMessages}/>
            <MessageInput message={message}
                          setMessage={setMessage}
                          pushMessage={pushMessage}/>
        </main> 
        </div>  
    )
}

export default App;