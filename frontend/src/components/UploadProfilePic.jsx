import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// this component is responsible for rendering the upload profileimage modal and the related functionality.

const UploadProfilePic = (props) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState({
        preview: "",
        data: "",
    })
    // console.log(productData.category)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileSelect = (e) => {
        const img = {
            preview: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "",
            data: e.target.files[0]
        }
        setImage(img)
    }

    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);
        try {
            const res = await fetch("http://localhost:8000/uploadfile", {
                method: "POST",
                body: formData
            });
            const jsonRes = await res.json();
            return jsonRes;
        } catch (error) {
            // console.error("Error uploading file: ", error);
            throw error;
        }
    }

    const UploadProfilePic = async (e) => {
        e.preventDefault();
        setLoading(true);
        const imgRes = await handleImgUpload();
        // console.log(imgRes, imgRes.fileName);
        const req = {
            profilePic: `http://localhost:8000/files/${imgRes.fileName}`
        };
        try {
            const res = await fetch("http://localhost:8000/api/user/uploadProfilePic", {
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
                            Upload Profile Pic
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="w-100 p-3">
                                <div className='d-flex flex-column align-items-center justify-content-center p-3'>
                                    {image.preview ? (<>
                                        <img src={image.preview} alt="preview" className='rounded' width='100%' height="100%" />
                                    </>) : (<>
                                        <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                                        <div>Upload from your Computer</div>
                                    </>)}
                                </div>
                                <Form className='p-2' onSubmit={UploadProfilePic}>
                                    <FloatingLabel controlId="floatingTextarea" label="Upload file..." className="mb-3" >
                                        <Form.Control type='file' className='uploadfile' accept='.jpg, .png, .gif' onChange={e => handleFileSelect(e)} />
                                    </FloatingLabel>
                                    <div className='float-end gap-2 d-flex my-3'>
                                        <Button variant='dark' onClick={props.onHide}>Cancle</Button>
                                        <Button variant="info" type="submit" onClick={props.onHide}>
                                            Upload
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

export default UploadProfilePic