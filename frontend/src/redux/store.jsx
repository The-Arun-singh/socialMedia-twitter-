import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';


// this is store for the reducers and all the components collectes data they need from here.
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    // devTools: process.env.NODE_ENV === 'development',  // enable redux dev tools in development mode
});

export default store;