import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import profile from './profile.scss';
import Posts from '../../components/posts';

function Profile() {
    return (
        <div className='profile'>
            <div className='images'>
                <img
                    src='https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    alt=''
                    className='cover'
                />
                <img
                    src='https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
                    alt=''
                    className='profilePic'
                />
            </div>
            <div className='profileContainer'>
                <div className='uInfo'>
                    <div className='left'>
                        <a href='http://facebook.com' className='link'>
                            <FacebookTwoToneIcon fontSize='medium' />
                        </a>
                        <a href='http://facebook.com' className='link'>
                            <InstagramIcon fontSize='medium' />
                        </a>
                        <a href='http://facebook.com' className='link'>
                            <TwitterIcon fontSize='medium' />
                        </a>
                        <a href='http://facebook.com' className='link'>
                            <LinkedInIcon fontSize='medium' />
                        </a>
                        <a href='http://facebook.com' className='link'>
                            <PinterestIcon fontSize='medium' />
                        </a>
                    </div>
                    <div className='center'>
                        <span>Dino K</span>
                        <div className='info'>
                            <div className='item'>
                                <PlaceIcon /> <span>Vietnam</span>
                            </div>
                            <div className='item'>
                                <LanguageIcon /> <span>dino.dev</span>
                            </div>
                        </div>
                        <button>Follow</button>
                    </div>
                    <div className='right'>
                        <EmailOutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
                <Posts />
            </div>
        </div>
    );
}

export default Profile;
