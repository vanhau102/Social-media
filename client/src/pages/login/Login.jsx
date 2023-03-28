import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import login from './login.scss';

export default function Login() {
    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        login();
    };

    return (
        <div className='login'>
            <div className='cart'>
                <div className='left'>
                    <h1>Hello World!</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Vero minus veniam dolorem eveniet explicabo
                        adipisci molestiae sapiente possimus distinctio nobis,
                        quam repellendus fuga necessitatibus corporis provident
                        ut libero eum. Aliquam?
                    </p>
                    <span>Don't you have an account ?</span>
                    <Link to='/register'>
                        <button>Register</button>
                    </Link>
                </div>
                <div className='right'>
                    <h1>Login</h1>
                    <form>
                        <input type='text' placeholder='Username' />
                        <input type='password' placeholder='Password' />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
