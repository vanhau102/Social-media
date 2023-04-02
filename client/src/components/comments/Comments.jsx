import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../httpRequest';
import { useState } from 'react';

function Comments({ postId }) {
    const [desc, setDesc] = useState('');

    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
            makeRequest.get('/comments?postId=' + postId).then((res) => {
                return res.data;
            }),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post('/comments', newComment);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['comments']);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc('');
    };

    return (
        <div className='comments'>
            <div className='write'>
                <img src={currentUser.profilePic} alt={currentUser.name} />
                <input
                    type='text'
                    placeholder='write a comment'
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {data?.map((comment) => (
                <div className='comment' key={comment.id}>
                    <img src={comment.profilePic} alt={comment.name} />
                    <div className='info'>
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Comments;
