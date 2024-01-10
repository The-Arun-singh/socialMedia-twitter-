import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


// this component is a modal responsible for editing the user's profile information
const EditProfile = (props) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        location: "",
        dob: "",
        name: "",
    });
    // console.log(productData.category)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const EditProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        const req = userData
        try {
            const res = await fetch("http://localhost:8000/api/user/update", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(req)
            })
            const data = await res.json();
            setLoading(false);
            // console.log(res.ok)
            if (res && res.ok) {
                toast.success(data.message);
                props.getUser();
            } else if (data.error === "jwt expired") {
                // console.log(data);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }

    }

    return (
        <>
            {loading ? (<>
                <div className="row">
                    <div className="col-md-12 mt-2">
                        <div className="spinner-border text-primary" role='status'>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>) : (<>
                <Modal
                    {...props}
                    size="md"
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Edit Profile
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="w-100 p-3">
                                <Form className='p-2' onSubmit={EditProfile}>
                                    <FloatingLabel controlId="floatingTextarea" label="Name" className="mb-3" >
                                        <Form.Control type="text" onChange={e => setUserData({ ...userData, name: e.target.value })} required />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingTextarea" label="Location" className="mb-3" >
                                        <Form.Control type="text" onChange={e => setUserData({ ...userData, location: e.target.value })} required />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingTextarea" label="Date of Birth" className="mb-3" >
                                        <Form.Control type="date" onChange={e => setUserData({ ...userData, dob: e.target.value })} required />
                                    </FloatingLabel>
                                    <div className='float-end gap-2 d-flex my-3'>
                                        <Button variant='dark' onClick={props.onHide}>Cancle</Button>
                                        <Button variant="info" type="submit" onClick={props.onHide}>
                                            Edit
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>)}
        </>)

}

export default EditProfile