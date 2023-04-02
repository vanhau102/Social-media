import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../httpRequest';

import Post from '../post/Post';
import './posts.scss';

function Posts() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            makeRequest.get('/posts').then((res) => {
                return res.data;
            }),
    });
    return (
        <div className='posts'>
            {error
                ? ' Something went wrong!'
                : isLoading
                ? ' Loading...'
                : data.map((post, index) => <Post post={post} key={post.id} />)}
        </div>
    );
}

export default Posts;
