import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './register.scss';

function Register() {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
    });
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', inputs);
        } catch (err) {
            setErr(err.response.data);
        }
    };

    return (
        <div className='register'>
            <div className='cart'>
                <div className='left'>
                    <h1>Register</h1>
                    <form>
                        <input
                            type='text'
                            placeholder='Username'
                            name='username'
                            onChange={handleChange}
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            placeholder='Name'
                            name='name'
                            onChange={handleChange}
                        />
                        {err && <span>{err}</span>}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
                <div className='right'>
                    <h1>Dino Social.</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Vero minus veniam dolorem eveniet explicabo
                        adipisci molestiae sapiente possimus distinctio nobis,
                        quam repellendus fuga necessitatibus corporis provident
                        ut libero eum. Aliquam?
                    </p>
                    <span>Do you have an account ?</span>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
