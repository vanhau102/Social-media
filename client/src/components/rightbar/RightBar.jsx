import './rightBar.scss';

function RightBar() {
    return (
        <div className='rightBar'>
            <div className='container'>
                <div className='item'>
                    <span>Suggestions For You</span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <span>Dino</span>
                        </div>
                        <div className='buttons'>
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <span>Dino</span>
                        </div>
                        <div className='buttons'>
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <span>Latest Activities </span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <p>
                                <span>Dino</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <p>
                                <span>Dino</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <p>
                                <span>Dino</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <p>
                                <span>Dino</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='item'>
                    <span>Online Friend</span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <div className='online' />
                            <span>Dino</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <div className='online' />
                            <span>Dino</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <div className='online' />
                            <span>Dino</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightBar;
