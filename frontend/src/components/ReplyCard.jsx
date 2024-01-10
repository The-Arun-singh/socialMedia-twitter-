import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ReplyTweet from './ReplyTweet';
import { toast } from 'react-toastify';


// this component is responsible for handling the display of the reply tweet and also simultaneously implementing all the required functionality like like, dislike, reply, retweets, etc.
const ReplyCard = ({ tweet, getTweet }) => {
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);


    const like = tweet?.likes.filter(u => u === user._id);
    console.log(tweet, user);


    const handleLike = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/tweet/${id}/like`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(response => response.json()).then(data => {
                if (data.error === "jwt expired") {
                    // console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    // console.log(data);
                    if (getTweet) {
                        getTweet();
                    }
                }
            })
        } catch (error) {
            console.error(error);
        }
    };
    const handleDislike = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/tweet/${id}/dislike`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(response => response.json()).then(data => {
                if (data.error === "jwt expired") {
                    // console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    // console.log(data);
                    if (getTweet) {
                        getTweet();
                    }
                }
            })
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleRetweet = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/tweet/${id}/retweet`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(response => response.json()).then(data => {
                if (data.error === "jwt expired") {
                    console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    // console.log(data);
                    if (getTweet) {
                        getTweet();
                    }
                }
            })
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/tweet/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then(response => console.log(response));
            if (getTweet) {
                getTweet();
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (<>
        {tweet &&
            <div className='rounded mt-1 border-bottom border-top'>
                {tweet.retweetedBy.length > 0 ? <div className='text-muted text-start ps-5'><i className="fa-solid fa-retweet pe-2"></i>retweeted by : {tweet.retweetedBy[0].name}</div> : <> </>}
                <div className='d-flex '>
                    {tweet.image ? <div>profilePic</div> : <i className="fa-regular fa-circle-user fs-2 ps-2 pt-4"></i>}
                    <div className='ms-2 text-start d-flex flex-column '>
                        <div className='d-flex w-100 gap-2 ms-2 mt-1 justify-content-lg-start'>
                            <div className='d-flex'>
                                <NavLink to={`/profile/${tweet.tweetedBy._id}`} className='nav-link fw-semibold m-0'>{tweet.tweetedBy.name} -</NavLink>
                                <p className='text-muted m-0'>{tweet.createdAt}</p>
                            </div>
                            {tweet.tweetedBy._id === user._id ? <span className='ms-3' onClick={() => handleDelete(tweet._id)}><i className="fa-solid fa-trash-can" style={{ color: "#ad0000" }}></i></span> : <></>}
                        </div>
                        <div>
                            <div onClick={() => navigate(`/tweet/${tweet._id}`)}>
                                <p className='px-2 text-muted'>{tweet.content}</p>
                                {tweet.img !== '' ? <div className='d-flex justify-content-center'>
                                    <img src={tweet.img} alt='tweet' className='img-fluid rounded' width={'320px'} />
                                </div> : <></>}
                            </div>
                        </div>
                        <div className='d-flex p-2'>
                            {like.length !== 0 ? (
                                <div className='d-flex gap-1 justify-content-center align-items-center px-1 pe-2' onClick={() => handleDislike(tweet._id)}><i className="fa-solid fa-heart " style={{ color: "#bd0000" }}></i>{tweet.likes.length}</div>
                            ) : (
                                <div className='d-flex gap-1 justify-content-center align-items-center px-1 pe-2' onClick={() => handleLike(tweet._id)}><i className="fa-regular fa-heart " style={{ color: "#bd0000" }}></i>{tweet.likes.length}</div>
                            )}
                            <div className='d-flex gap-1 justify-content-center align-items-center px-1 pe-2'><i className="fa-regular fa-message text-info" onClick={() => setModalShow(true)}></i>{tweet.replies.length}</div>
                            <div className='d-flex gap-1 justify-content-center align-items-center px-1' onClick={() => handleRetweet(tweet._id)}><i className="fa-solid fa-retweet text-success"></i>{tweet.retweetedBy.length}</div>
                            <ReplyTweet
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                id={tweet._id}
                                getTweet={getTweet}
                            />
                        </div>
                    </div>
                </div>
            </div>

        }
    </>)
}

export default ReplyCard