import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


// this is a modal component used for creating reply for tweets
const ReplyTweet = ({ ...props }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState({
        preview: "",
        data: "",
    })
    const [tweet, setTweet] = useState('');
    // console.log(image)

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
        if (image.data) {
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
        } else return undefined;
    }

    const replyTweet = async (id) => {

        setLoading(true);
        const imgRes = await handleImgUpload();

        const req = {
            content: tweet,
            img: imgRes === undefined ? '' : `http://localhost:8000/files/${imgRes.fileName}`
        };
        try {
            const res = await fetch(`http://localhost:8000/api/tweet/${id}/reply`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(req)
            })
            const data = await res.json();
            console.log(res.ok)
            if (res && res.ok) {
                setLoading(false);
                toast.success(data.message);
                props.getAllTweets();

            } else if (data.error === "jwt expired") {
                console.log(data);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
                navigate('/login');
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.message);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        replyTweet(props.id);
        props.getAllTweets();
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
                <Modal {...props} size="md" >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Reply
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
                                <Form className='p-2' onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingTextarea" label="Upload file..." className="mb-3" >
                                        <Form.Control type='file' className='uploadfile' accept='.jpg, .png, .gif' onChange={e => handleFileSelect(e)} />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingTextarea"
                                        label="Tweet"
                                        className="mb-3"
                                    >
                                        <Form.Control as="textarea" onChange={e => setTweet(e.target.value)} required />
                                    </FloatingLabel>
                                    <div className='float-end gap-2 d-flex my-3'>
                                        <Button variant='dark' onClick={props.onHide}>Cancle</Button>
                                        <Button variant="info" type="submit" onClick={props.onHide}>
                                            Reply
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

export default ReplyTweet