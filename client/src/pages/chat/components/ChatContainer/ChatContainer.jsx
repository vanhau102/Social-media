import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '../../../../httpRequest';
import ChatInput from '../ChatInput/ChatInput';
import './chatContainer.scss';

function ChatContainer({ currentChat }) {
    const user = useSelector((state) => state.user.currentUser);
    const [messages, setMessages] = useState([]);
    const handleSendMsg = (msg) => {
        makeRequest.post('/messages', {
            message: msg,
            receiverId: currentChat.id,
        });
    };

    useEffect(() => {
        makeRequest
            .get('/messages?receiverId=' + currentChat.id)
            .then((res) => {
                setMessages(res.data);
            });
    }, [currentChat]);
    return (
        <div className='chatContainer'>
            <div className='chat-header'>
                <div className='user-details'>
                    <div className='avatar'>
                        <img src={`/upload/${currentChat.profilePic}`} alt='' />
                    </div>
                    <div className='username'>
                        <h3>{currentChat?.name}</h3>
                    </div>
                </div>
                {/* <Logout /> */}
            </div>
            <div className='chat-messages'>
                {messages.map((message) => {
                    return (
                        <div key={message.id}>
                            <div
                                className={`message ${
                                    user.id === message.senderId
                                        ? 'sended'
                                        : 'recieved'
                                }`}
                            >
                                <div className='content '>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    );
}

export default ChatContainer;
