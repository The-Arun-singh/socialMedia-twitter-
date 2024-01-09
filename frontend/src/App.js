import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/authPages/Login';
import Home from './pages/Home';
import Register from './pages/authPages/Register';
import MyProfile from './pages/userPages/MyProfile';
import Tweet from './pages/Tweets';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

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
        <Route exact path={'/myProfile'} element={<MyProfile />} />
        <Route exact path={'/Tweet'} element={<Tweet />} />
      </Routes>
    </>)
  };


  return (
    <div className="App">
      <BrowserRouter>
        <DynamicRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
