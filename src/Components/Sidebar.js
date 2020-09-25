import React , {useEffect} from 'react'
import SideHeader from './SideHeader'
import Contact from './Contact'



function Sidebar(props){
    const user = props.user
    const search = props.search
    const setSearch = props.setSearch
    const filteredContacts = props.filteredContacts
    const setContactSelected = props.setContactSelected

    const onSearch = (event) =>{
        setSearch(event.target.value)
    }

	return(
		<aside>
            <SideHeader setContactSelected={setContactSelected}
                        user={user}/>
                <div className="search">
                    <input 
                    onChange = {onSearch}
                    value={search}
                    type="text" 
                    placeholder="Search or start a new chat"
                    />
                </div>

                <div className="contact-boxes">
                {filteredContacts.map((friend) => (
                    <Contact friend={friend}
                             key={friend._id}
                             messages = {friend.messages}
                             setContactSelected={setContactSelected}
                             />
                    ))}
                </div>
        </aside>
		)
}
export default Sidebar