import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import moment from 'moment';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Comments from '../comments/Comments';
import './post.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../httpRequest';
import { AuthContext } from '../../context/authContext';
function Post({ post }) {
    const [commentOpen, setCommentOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['likes', post.id],
        queryFn: () =>
            makeRequest.get('/likes?postId=' + post.id).then((res) => {
                return res.data;
            }),
    });
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete('/likes?postId=' + post.id);
            return makeRequest.post('/likes', { postId: post.id });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['likes']);
            },
        }
    );

    const handleLike = async (e) => {
        e.preventDefault();
        mutation.mutate(data?.includes(currentUser.id));
    };
    console.log(data);
    return (
        <div className='post'>
            <div className='container'>
                <div className='user'>
                    <div className='userInfo'>
                        <img src={post.profilePic} alt={post.name} />
                        <div className='details'>
                            <Link to={post.userID} className='link'>
                                <span className='name'>{post.name}</span>
                            </Link>
                            <span className='date'>
                                {moment(post.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className='content'>
                    <p>{post.desc}</p>
                    <img src={`./upload/${post.img}`} alt='' />
                </div>
                <div className='info'>
                    <div className='item'>
                        {isLoading ? (
                            'Loading'
                        ) : data?.includes(currentUser.id) ? (
                            <FavoriteOutlinedIcon
                                style={{ color: 'red' }}
                                onClick={handleLike}
                            />
                        ) : (
                            <FavoriteBorderOutlinedIcon onClick={handleLike} />
                        )}
                        {data?.length} Like
                    </div>
                    <div
                        className='item'
                        onClick={() => setCommentOpen(!commentOpen)}
                    >
                        <TextsmsOutlinedIcon />
                        12 Comments
                    </div>
                    <div className='item'>
                        <ShareOutlinedIcon />
                        12 Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id} />}
            </div>
        </div>
    );
}

export default Post;
