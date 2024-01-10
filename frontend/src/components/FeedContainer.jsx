
import Button from 'react-bootstrap/Button';
import FeedCard from './FeedCard';
import CreateTweet from './CreateTweet';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// this component fetches all the tweets and then using FeedCard component renders the feed of all the tweets.
const FeedContainer = () => {
    const [modalShow, setModalShow] = useState(false);
    const [allTweets, setAllTweets] = useState([]);
    console.log(allTweets);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAllTweets = async () => {
        try {
            await fetch('http://localhost:8000/api/tweet', {
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
                    setAllTweets(data.tweets)
                }
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllTweets();
    }, [])


    return (<>
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className=''>Home</h4>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Tweet
                </Button>
            </div>
            <div className='mt-2'>
                {allTweets.map((tweet) => {
                    return (
                        <FeedCard key={tweet._id} tweet={tweet} getAllTweets={getAllTweets} />
                    )
                })}
            </div>
        </div>
        <CreateTweet
            show={modalShow}
            onHide={() => setModalShow(false)}
            getAllTweets={getAllTweets}
        />
    </>)
}

export default FeedContainer