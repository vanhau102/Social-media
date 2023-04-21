import { useContext, useEffect, useState } from 'react';

import './chats.scss';
import Navbar from '../../components/navbar';
import { DarkModeContext } from '../../context/darkModeContext';
import Contacts from './components/Contacts';
import { makeRequest } from '../../httpRequest';
import ChatContainer from './components/ChatContainer';

function Chats() {
    const { darkMode } = useContext(DarkModeContext);
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        makeRequest('/users/follow').then((res) => {
            setContacts(res.data);
        });
    }, []);
    return (
        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
            <Navbar />
            <div className='chats-container'>
                <div className='chats-content'>
                    <Contacts contacts={contacts} />
                    {/* {currentChat === undefined ? (
                    <Welcome />
                    ) : (
                        <ChatContainer
                        currentChat={currentChat}
                        socket={socket}
                        />
                    )} */}
                    <ChatContainer
                    // currentChat={currentChat}
                    // socket={socket}
                    />
                </div>
            </div>
        </div>
    );
}

export default Chats;
