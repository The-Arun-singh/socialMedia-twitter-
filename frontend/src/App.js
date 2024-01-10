import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/authPages/Login';
import Home from './pages/Home';
import Register from './pages/authPages/Register';
import Profile from './pages/userPages/Profile';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Tweet from './pages/Tweet';

function App() {

  const DynamicRouter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      // const authToken = JSON.stringify(localStorage.getItem('token'));
      const authToken = localStorage.getItem('token');
      // console.log(localStorage.getItem('token'));

      if (authToken !== null && authToken !== undefined) {
        const userData = JSON.parse(localStorage.getItem('user'));
        dispatch({ type: 'LOGIN', payload: userData });
        navigate('/');
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: 'LOGOUT' });
        navigate("/login");
        toast.error("User logged out");
      }
    }, [])

    return (<>
      <Routes>
        <Route exact path={'/'} element={<Home />} />
        <Route exact path={'/login'} element={<Login />} />
        <Route exact path={'/register'} element={<Register />} />
        <Route exact path={'/profile/:id'} element={<Profile />} />
        <Route exact path={'/tweet/:id'} element={<Tweet />} />
      </Routes>
    </>)
  };


  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <DynamicRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
