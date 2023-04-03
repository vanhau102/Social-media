import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { makeRequest } from '../../httpRequest';

import { AuthContext } from '../../context/authContext';
import Posts from '../../components/posts';
import './profile.scss';

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const userId = parseInt(useLocation().pathname.split('/')[2]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            makeRequest.get('/users/find/' + userId).then((res) => {
                return res.data;
            }),
    });

    return isLoading ? (
        'Loading'
    ) : (
        <div className='profile'>
            <div className='images'>
                <img src={data?.coverPic} alt='' className='cover' />
                <img src={data?.profilePic} alt='' className='profilePic' />
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
                        <span>{data?.name}</span>
                        <div className='info'>
                            <div className='item'>
                                <PlaceIcon /> <span>{data?.city}</span>
                            </div>
                            <div className='item'>
                                <LanguageIcon /> <span>{data?.website}</span>
                            </div>
                        </div>
                        {userId === currentUser.id ? (
                            <button> Update</button>
                        ) : (
                            <button>Follow</button>
                        )}
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
