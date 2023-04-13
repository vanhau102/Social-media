import { Link } from 'react-router-dom';
import { useContext } from 'react';

import './navbar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { DarkModeContext } from '../../context/darkModeContext';

import { AuthContext } from '../../context/authContext';
import Search from '../Search/Search';

function Navbar() {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);

    console.log(currentUser);

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
                <Link to={`/profile/${currentUser.id}`} className='user link'>
                    <img
                        src={`/upload/${currentUser.profilePic}`}
                        alt='avatar'
                    />
                    <span>{currentUser.name}</span>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
