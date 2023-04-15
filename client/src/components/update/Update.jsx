import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeRequest } from '../../httpRequest';
import { replaceUserData } from '../../store/userSlice';

import './update.scss';

function Update({ user, setOpenUpdate }) {
    const [coverPic, setCoverPic] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [texts, setTexts] = useState({
        name: '',
        city: '',
        website: '',
    });

    const dispatch = useDispatch();

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await makeRequest.post('/upload', formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (user) => {
            makeRequest.put('/users', user).then((res) => {
                if (res.status === 200) {
                    dispatch(replaceUserData(res.data[0]));
                }
            });
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleClick = async (e) => {
        e.preventDefault();
        let coverPicURL = coverPic ? await upload(coverPic) : user.coverPic;
        let profilePicURL = profilePic
            ? await upload(profilePic)
            : user.profilePic;
        mutation.mutate({
            ...texts,
            coverPic: coverPicURL,
            profilePic: profilePicURL,
        });

        setTexts('');
        setCoverPic(null);
        setProfilePic(null);
        setOpenUpdate(false);
    };

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };
    return (
        <div className='update'>
            <div className='wrapper'>
                <h2>Update</h2>
                <form>
                    <input
                        type='file'
                        onChange={(e) => setCoverPic(e.target.files[0])}
                    />
                    <input
                        type='file'
                        onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                    <input type='text' name='name' onChange={handleChange} />
                    <input type='text' name='city' onChange={handleChange} />
                    <input type='text' name='website' onChange={handleChange} />
                    <button className='up' onClick={handleClick}>
                        Update
                    </button>
                </form>

                <button className='close' onClick={() => setOpenUpdate(false)}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Update;
