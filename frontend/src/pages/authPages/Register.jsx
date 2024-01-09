import '../../styles/StyleClasses.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';


const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    // function to register the user

    const createUser = async () => {
        try {
            await fetch("http://localhost:8000/api/auth/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            }).then(res => res.json()).then(res => {
                console.log(res);
                toast.success(res.message)
            })
            navigate('/login');
        } catch (error) {
            console.error(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        createUser();
        e.target.reset();
    };




    return (<>
        <div className='vh-100 bg-dark d-flex justify-content-center align-items-center p-3'>
            <div className='rounded d-flex flex-column flex-sm-row'>
                <div className='bg-info d-flex justify-content-center align-items-center p-5'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p className='text-light fw-semibold fs-4 px-5 pb-3 '>Join Us</p>
                        <i class="fa-brands fa-rocketchat logo-icon"></i>
                    </div>
                </div>
                <div className='bg-light p-5 box'>
                    <div className='text-start'>
                        <Form className='p-2' onSubmit={handleSubmit}>
                            <h3 className='mb-3'>Register</h3>
                            <FloatingLabel controlId="floatingInput" label="Name" className="mb-3" >
                                <Form.Control type="text" placeholder="Name" onChange={e => setUserData({ ...userData, name: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="UserName" className="mb-3" >
                                <Form.Control type="text" placeholder="@username" onChange={e => setUserData({ ...userData, userName: '@' + e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                                <Form.Control type="email" placeholder="Enter email" onChange={e => setUserData({ ...userData, email: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" >
                                <Form.Control type="password" placeholder="Password" onChange={e => setUserData({ ...userData, password: e.target.value })} />
                            </FloatingLabel>
                            <div>
                                <Button variant="dark" type="submit">
                                    Register
                                </Button>
                            </div>
                            <p className='my-2'>Already have an account? <NavLink to={'/login'}>Login here</NavLink></p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Register