import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'


// this is the navbar component rendering a side navigation

const SideNavBar = ({ home, profile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log();
    const user = useSelector(state => state.auth.user);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <div className='nav-width navigation vh-100 align-self-center border-end border-dark px-2'>
            <div className='d-flex flex-column align-items-center justify-content-between h-100'>
                <div className='d-flex flex-column text-start'>
                    <div className='py-3 '>
                        <h1>
                            <i className="fa-brands fa-rocketchat text-info"></i>
                        </h1>
                    </div>
                    {home ? <div className='bg-info-subtle border border-info-subtle shadow-sm rounded-5 px-5 py-1 mb-2'>
                        <NavLink to={'/'} className='nav-link'><i className="fa-solid fa-house pe-2"></i>Home</NavLink>
                    </div> :
                        <div className=' shadow-sm rounded-5 px-5 py-1 mb-2'>
                            <NavLink to={'/'} className='nav-link'><i className="fa-solid fa-house pe-2"></i>Home</NavLink>
                        </div>}
                    {profile ?
                        <div className='bg-info-subtle border border-info-subtle shadow-sm rounded-5 px-5 py-1 mb-2'>
                            <NavLink to={'/Profile/' + user._id} className='nav-link'><i className="fa-solid fa-user pe-2"></i>Profile</NavLink>
                        </div> :
                        <div className=' shadow-sm rounded-5 px-5 py-1 mb-2'>
                            <NavLink to={'/profile/' + user._id} className='nav-link'><i className="fa-solid fa-user pe-2"></i>Profile</NavLink>
                        </div>
                    }

                    <div className='shadow-sm rounded-5 px-5 py-1 mb-2'>
                        <div className='nav-link' onClick={logout}><i className="fa-solid fa-right-from-bracket pe-2"></i>Logout</div>
                    </div>
                </div>
                <div className='d-flex'>
                    <div>
                        {user.profilePic ? <img src={user.profilePic} alt="profile" className='img-fluid rounded-circle p-1' width={'54px'} /> : <i className="fa-regular fa-circle-user fs-1 p-1"></i>}
                    </div>
                    <div className='nav-link text-start mb-3' onClick={() => navigate(`/profile/${user._id}`)}>
                        <h5 className='p-0 m-0'>{user.name}</h5>
                        <p className='p-0 m-0 fw-semibold'>{user.userName}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideNavBar