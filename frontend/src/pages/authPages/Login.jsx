import '../../styles/StyleClasses.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function to login the user 
    const login = async (credentials) => {
        // console.log(credentials);
        try {
            await fetch("http://localhost:8000/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            }).then(res => {
                // console.log(res);
                return res.json();
            }).then(data => {
                // console.log(data);
                if (data.message === 'User successfully logedIn') {
                    toast.success(data.message)
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    dispatch({ type: 'LOGIN', payload: data.user });
                    navigate("/");
                } else {
                    toast.error(data.message)
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    dispatch({ type: 'LOGOUT' });
                    navigate("/login");
                }
            })

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(credentials);
        e.target.reset();
    };
    return (<>
        <div className='vh-100 bg-dark d-flex justify-content-center align-items-center p-3'>
            <div className='rounded d-flex flex-column flex-sm-row'>
                <div className='bg-info d-flex justify-content-center align-items-center p-5'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p className='text-light fw-semibold fs-4 px-4'>Welcome Back</p>
                        <i class="fa-brands fa-rocketchat logo-icon"></i>
                    </div>
                </div>
                <div className='bg-light p-5 box'>
                    <div className='text-start'>
                        <Form className='p-2' onSubmit={handleSubmit}>
                            <h3 className='mb-3'>Login</h3>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                                <Form.Control type="email" placeholder="Enter email" onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" >
                                <Form.Control type="password" placeholder="Password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
                            </FloatingLabel>
                            <div>
                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>
                            </div>
                            <p className='my-2'>Don't have an account? <NavLink to={'/register'}>Register here</NavLink></p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Login