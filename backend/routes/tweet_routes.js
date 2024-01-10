import express from 'express';
import { authorization } from '../middlewares/authorization.js';
import { createTweetHandler, deleteTweetHandler, getAllTweetsHandler, getTweetHandler, retweetHandler, tweetDislikesHandler, tweetLikesHandler, tweetReplyHandler } from '../controllers/tweet_handler.js';

// all the routes for tweets

const tweetRouter = express.Router();

tweetRouter.post('/api/tweet', authorization, createTweetHandler);

tweetRouter.put('/api/tweet/:id/like', authorization, tweetLikesHandler);
tweetRouter.put('/api/tweet/:id/dislike', authorization, tweetDislikesHandler);

tweetRouter.post('/api/tweet/:id/reply', authorization, tweetReplyHandler);
tweetRouter.put('/api/tweet/:id/retweet', authorization, retweetHandler);

tweetRouter.get('/api/tweet/:id', getTweetHandler);
tweetRouter.get('/api/tweet', getAllTweetsHandler);

tweetRouter.delete('/api/tweet/:id', authorization, deleteTweetHandler);

export default tweetRouter; 