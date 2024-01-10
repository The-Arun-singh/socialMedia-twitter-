import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import FeedCard from '../components/FeedCard';
import { toast } from 'react-toastify';
import SideNavBar from '../components/SideNavBar';
import ReplyCard from '../components/ReplyCard';


// this component renders the page for a specific tweet and all its replies.
const Tweet = () => {
    const [tweet, setTweet] = useState(null);
    const { id } = useParams();
    console.log(id, tweet);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTweet = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/tweet/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then(response => response.json()).then(data => {
                if (data.error === "jwt expired") {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    console.log(data);
                    setTweet(data.tweet)
                }
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getTweet(id);
    }, [id])

    return (<>

        <div className='vh-100 d-flex align-items-center justify-content-center'>
            <div className=' d-flex home-width flex-sm-row justify-content-center main-container'>

                <SideNavBar />

                <div className=' feed-width scroll border-end border-dark py-4 px-2'>
                    <div>
                        <FeedCard tweet={tweet} getAllTweets={() => getTweet(id)} />
                    </div>
                    <div className='mt-2'>
                        <h4>Replies</h4>
                        {tweet && tweet.replies.map((reply) => <ReplyCard key={reply._id} tweet={reply} getTweet={() => getTweet(tweet._id)} />)}
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default Tweet