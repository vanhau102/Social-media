import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '../../../../httpRequest';
import ChatInput from '../ChatInput/ChatInput';
import './chatContainer.scss';

function ChatContainer({ currentChat, socket }) {
    const user = useSelector((state) => state.user.currentUser);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const handleSendMsg = (msg) => {
        makeRequest.post('/messages', {
            message: msg,
            receiverId: currentChat.id,
        });

        socket.current.emit('send-msg', {
            from: user.id,
            to: currentChat.id,
            message: msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
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
                {messages.map((message, index) => {
                    return (
                        <div key={index} ref={scrollRef}>
                            <div
                                className={`message ${
                                    message.fromSelf ? 'sended' : 'recieved'
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
