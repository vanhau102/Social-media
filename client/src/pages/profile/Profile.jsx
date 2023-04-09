import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { makeRequest } from '../../httpRequest';

import { AuthContext } from '../../context/authContext';
import Posts from '../../components/posts';
import './profile.scss';
import Update from '../../components/update/Update';

function Profile() {
    const [openUpdate, setOpenUpdate] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const userId = parseInt(useLocation().pathname.split('/')[2]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            makeRequest.get('/users/find/' + userId).then((res) => {
                return res.data;
            }),
    });
    const { isLoading: rIsLoading, data: relationshipsData } = useQuery({
        queryKey: ['relationships'],
        queryFn: () =>
            makeRequest
                .get('/relationships?followerUserId=' + userId)
                .then((res) => {
                    return res.data;
                }),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (follow) => {
            if (follow)
                return makeRequest.delete(
                    '/relationships?followerUserId=' + userId
                );
            return makeRequest.post('/relationships', { userId });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['relationships']);
            },
        }
    );

    const handleFollow = async (e) => {
        e.preventDefault();
        mutation.mutate(relationshipsData?.includes(currentUser.id));
    };

    return (
        <div className='profile'>
            {isLoading ? (
                'Loading'
            ) : (
                <>
                    <div className='images'>
                        <img
                            src={'/upload/' + data.coverPic}
                            alt=''
                            className='cover'
                        />
                        <img
                            src={'/upload/' + data.profilePic}
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
                                <span>{data?.name}</span>
                                <div className='info'>
                                    <div className='item'>
                                        <PlaceIcon /> <span>{data?.city}</span>
                                    </div>
                                    <div className='item'>
                                        <LanguageIcon />{' '}
                                        <span>{data?.website}</span>
                                    </div>
                                </div>
                                {rIsLoading ? (
                                    'Loading'
                                ) : userId === currentUser.id ? (
                                    <button onClick={() => setOpenUpdate(true)}>
                                        Update
                                    </button>
                                ) : (
                                    <button onClick={handleFollow}>
                                        {relationshipsData?.includes(
                                            currentUser.id
                                        )
                                            ? 'Following'
                                            : 'Follow'}
                                    </button>
                                )}
                            </div>
                            <div className='right'>
                                <EmailOutlinedIcon />
                                <MoreVertIcon />
                            </div>
                        </div>
                        <Posts userId={userId} />
                    </div>
                </>
            )}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </div>
    );
}

export default Profile;
