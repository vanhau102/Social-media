import { Link } from 'react-router-dom';

import register from './register.scss';
function Register() {
    return (
        <div className='register'>
            <div className='cart'>
                <div className='left'>
                    <h1>Register</h1>
                    <form>
                        <input type='text' placeholder='Username' />
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Password' />
                        <input type='text' placeholder='Name' />
                        <button>Register</button>
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
