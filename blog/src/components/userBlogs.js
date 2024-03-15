import {Button, Card, CardGroup, Image, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import "../style/userBlogs.css"
import {useNavigate} from "react-router-dom";
import {BLOG_ROUTE, USER_ACCOUNT} from "../utils/consts";
import bin from "../static/trash.png"
import {useEffect, useState} from "react";
import {deleteBlog} from "../http/blogApi";
import {set} from "mobx";


const UserBlogs = observer(({blogs}) => {
    const history = useNavigate()

    const [show, setShow] = useState(false);
    const [id, setId] = useState(0)

    const handleClose = () => {
        setShow(false);
    }
    /*const handleShow = () => setShow(true);*/

    const handleDeleteBlog = async () => {
        await deleteBlog(id)
        history(BLOG_ROUTE)
    }

    return (
        <CardGroup style={{marginLeft: 30}}>
            {blogs.map(blog =>
                <Card className="mb-5 userBlogsCard" key={blog.id}>
                    <Card.Img className="userBlogImg" variant="top" src={"https://react-node-blog-nnpa.onrender.com/" + blog.img} />
                    <Card.Body>
                        <div className="d-inline-flex mt-4">
                            <Button onClick={() => history(USER_ACCOUNT + "/"+ blog.id)} className="buttonUpdateBlog">Update</Button>
                            <Button className="delete" onClick={() => {setShow(true); setId(blog.id)}}><Image className="bin" src={bin}/></Button>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Remove article</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Do you want to remove your article?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleDeleteBlog}>Delete</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>


                    </Card.Body>

                </Card>

            )}

        </CardGroup>
    );
});

export default UserBlogs;
