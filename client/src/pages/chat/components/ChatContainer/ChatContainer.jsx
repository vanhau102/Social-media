import ChatInput from '../ChatInput/ChatInput';
import './chatContainer.scss';

function ChatContainer() {
    return (
        <div className='chatContainer'>
            <div className='chat-header'>
                <div className='user-details'>
                    <div className='avatar'>
                        <img
                            // src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt=''
                        />
                    </div>
                    <div className='username'>
                        <h3>Dino</h3>
                    </div>
                </div>
                {/* <Logout /> */}
            </div>
            <div className='chat-messages'>
                {/* {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
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
                })} */}
            </div>
            <ChatInput />
        </div>
    );
}

export default ChatContainer;
