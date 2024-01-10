import React from 'react'
import '../styles/StyleClasses.css';
import FeedContainer from '../components/FeedContainer';
import SideNavBar from '../components/SideNavBar';


// this is home page component rendering all the tweets
const Home = () => {
    return (
        <div className='vh-100 d-flex align-items-center justify-content-center'>
            <div className=' d-flex home-width flex-sm-row justify-content-center main-container'>

                <SideNavBar home />

                <div className=' feed-width scroll border-end border-dark py-4 px-2'>
                    <FeedContainer />
                </div>
            </div>
        </div>
    )
}

export default Home