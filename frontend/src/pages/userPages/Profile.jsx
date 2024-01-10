import React, { useEffect, useState } from 'react'
import SideNavBar from '../../components/SideNavBar'
import '../../styles/StyleClasses.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import EditProfile from '../../components/EditProfile';
import UploadProfilePic from '../../components/UploadProfilePic';
import FeedCard from '../../components/FeedCard';


// this component renders the the profile page of the user whose id is in the params of the url.
const Profile = () => {
    const [editModalShow, setEditModalShow] = useState(false);
    const [uploadModalShow, setUploadModalShow] = useState(false);

    const [User, setUser] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('');

    const [allTweets, setAllTweets] = useState([]);

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedInUserState = useSelector(state => state.auth.user);
    if (loggedInUser === '') {
        setLoggedInUser(loggedInUserState);
    }

    const getUser = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then(response => response.json()).then(data => {
                if (data.error === "jwt expired") {
                    console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    setUser(data.user)
                }
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
    const getAllTweets = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/user/${id}/tweets`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then(response => response.json()).then(data => {
                if (data.error === "jwt expired") {
                    // console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    setAllTweets(data.allTweets)
                }
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const handleFollow = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/api/user/${id}/follow`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            const data = await res.json();
            console.log(res, data)
            if (res && res.ok) {
                toast.success(data.message);
                setLoggedInUser(data.loggedInUser);
                setUser(data.targetUser)
            } else if (data.error === "jwt expired") {
                // console.log(data);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };


    const handleUnfollow = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/api/user/${id}/unfollow`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            const data = await res.json();
            console.log(res, data);
            if (res && res.ok) {
                toast.success(data.message);
                setLoggedInUser(data.loggedInUser);
                setUser(data.targetUser)
            } else if (data.error === "jwt expired") {
                // console.log(data);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };
    console.log(loggedInUser, User)



    useEffect(() => {
        getAllTweets(id);
        getUser(id);

    }, [id])



    return (
        <div className='vh-100 d-flex align-items-center justify-content-center'>
            <div className=' d-flex home-width flex-sm-row justify-content-center main-container'>

                <SideNavBar profile />

                {User && (<div className=' feed-width scroll border-end border-dark p-2'>
                    <h4 className='text-start'>Profile</h4>
                    <div>
                        <div className="bg-info text-start p-3">
                            <div className='profile-pic d-flex'>
                                {User.profilePic ? <img src={User.profilePic} alt="profile" className='img-fluid rounded-circle' width={'108px'} /> : <i className="fa-regular fa-circle-user fs-1 p-1"></i>}
                            </div>
                        </div>
                        <div>
                            {loggedInUser._id === id ? (<>
                                <div className='gap-2 d-flex justify-content-end mt-2'>
                                    <Button variant='outline-info' onClick={() => setUploadModalShow(true)}>Upload/Change Profile Photo</Button>
                                    <Button variant='outline-dark' onClick={() => setEditModalShow(true)}>Edit</Button>
                                </div>
                            </>) : (<>
                                <div className='gap-2 d-flex justify-content-end mt-2'>
                                    {User.followers.includes(loggedInUser._id) ?
                                        <Button variant='dark' onClick={() => handleUnfollow(User._id)}>Unfollow</Button>
                                        :
                                        <Button variant='dark' onClick={() => handleFollow(User._id)}>Follow</Button>
                                    }
                                </div>
                            </>)}
                        </div>
                        <div className='text-start d-flex flex-column justify-content-start mt-2'>
                            <div className='my-3'>
                                <div className='fw-bold'>{User.name}</div>
                                <div className='fw-bold text-muted'>{User.userName}</div>
                            </div>
                            <div className='d-flex gap-4 mt-2'>
                                <div className='fw-semibold text-muted'>{User.dob ? User.dob : 'dob'}</div>
                                <div className='fw-semibold text-muted'>{User.location ? User.location : 'location'}</div>
                            </div>
                            <div className='fw-semibold text-muted'>Joined on {User.createdAt.split('T')[0]}</div>
                        </div>
                        <div className='d-flex mt-2 gap-2'>
                            <p className='fw-bold'>{User.following.length} following</p>
                            <p className='fw-bold'>{User.followers.length} followers</p>
                        </div>
                        <div className='mt-5'>
                            <h4>Tweets and Replies</h4>
                            <div className='mt-3'>
                                {/* <div className=' feed-width scroll border-end border-dark py-4 px-2'> */}
                                <div className='mt-2'>
                                    {allTweets && allTweets.map((tweet) => {
                                        return (
                                            <FeedCard key={tweet._id} tweet={tweet} getAllTweets={() => getAllTweets(id)} />
                                        )
                                    })}
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>)}
                <EditProfile
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                    getUser={() => getUser(id)}
                />
                <UploadProfilePic
                    show={uploadModalShow}
                    onHide={() => setUploadModalShow(false)}
                    getUser={() => getUser(id)}
                />
            </div>
        </div>
    )
}

export default Profile