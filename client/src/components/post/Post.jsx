import { Link } from 'react-router-dom';

import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Comments from '../comments/Comments';
import { useState } from 'react';
function Post({ post }) {
    const [commentOpen, setCommentOpen] = useState(false);
    const liked = false;

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
                            <span className='date'>1 minute ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className='content'>
                    <p>{post.desc}</p>
                    <img src={post.img} alt={post.name} />
                </div>
                <div className='info'>
                    <div className='item'>
                        {liked ? (
                            <FavoriteOutlinedIcon />
                        ) : (
                            <FavoriteBorderOutlinedIcon />
                        )}
                        12 Like
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
                {commentOpen && <Comments />}
            </div>
        </div>
    );
}

export default Post;
