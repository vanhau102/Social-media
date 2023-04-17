import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import './navbar.scss';
import { DarkModeContext } from '../../context/darkModeContext';

import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../httpRequest';
import { logout } from '../../store/userSlice';

function Navbar() {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { toggle, darkMode } = useContext(DarkModeContext);
    const handleLogout = async () => {
        const res = await makeRequest.post('/auth/logout');
        if (res.status === 200) {
            dispatch(logout());
            navigate('/login');
        }
    };
    return (
        <div className='navbar'>
            <div className='left'>
                <Link to='/' className='link'>
                    <span>DinoSocial</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggle} />
                ) : (
                    <DarkModeOutlinedIcon onClick={toggle} />
                )}
                <GridViewOutlinedIcon />
                <Search />
            </div>
            <div className='right'>
                <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <LogoutOutlinedIcon onClick={handleLogout} />
                <Link to={`/profile/${user.id}`} className='user link'>
                    <img src={`/upload/${user.profilePic}`} alt='avatar' />
                    <span>{user.name}</span>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
