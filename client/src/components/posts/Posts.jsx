import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../httpRequest';

import Post from '../post/Post';
import './posts.scss';

function Posts({ userId }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getPosts = () => {
            makeRequest.get('/posts?userId=' + userId).then((res) => {
                setData(res.data);
            });
        };
        getPosts();
    }, [userId, data]);
    return (
        <div className='posts'>
            {data && data.map((post) => <Post post={post} key={post.id} />)}
        </div>
    );
}

export default Posts;
