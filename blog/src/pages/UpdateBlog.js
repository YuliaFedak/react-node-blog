import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneBlog, updateOneBlog} from "../http/blogApi";
import {USER_ACCOUNT} from "../utils/consts";

const UpdateBlog = observer(() => {

    const {user} = useContext(Context)
    const history = useNavigate()
    const [blog, setBlog] = useState({})
    const {id} = useParams()
    useEffect(() => {
        fetchOneBlog(id).then(data => {
            setBlog(data);
            setTitle(data.title);
            setTopic(data.topic);
            setText(data.text);
            setFile(data.img);
        });
    }, [id]);

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [text, setText] = useState("")
    const [file, setFile] = useState(blog.img)
    console.log(file)
    const updateBlog = async (e) => {
        e.preventDefault(); // Зупиняємо стандартну поведінку форми
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('topic', topic);
            formData.append('text', text);
            formData.append("userId", user.user.id)
            formData.append('img', file);
            await updateOneBlog(id, formData);
            // Виконуємо необхідні дії після успішного оновлення, наприклад, перенаправлення на іншу сторінку
            history(USER_ACCOUNT);

        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const inputRef = useRef(null);

    const [isDragActive, setIsDragActive] = useState(false);
    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragActive(true);
    };

    const handleDragLeave = () => {
        setIsDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragActive(false);
        const img = e.dataTransfer.files[0];
        console.log("selected file", img);
        setFile(img);
    };



    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 52}}>
            <Card style={{width: "70%"}} className="p-5">
                <h2 className="mb-3 mt-2" style={{textAlign: "center"}}>Update article</h2>
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="formLabel">Title</Form.Label>
                            <Form.Control
                                className="form"
                                placeholder="Enter title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}

                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="formLabel">Category</Form.Label>
                            <br/>
                            <div className="selector">
                                <select id="categ" className="categories" value={topic} onChange={e => setTopic(e.target.value)}>
                                    <option >Fiction</option>
                                    <option >Non fiction</option>
                                    <option >Drama</option>
                                    <option >Poetry</option>
                                </select>
                            </div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="formLabel">Text</Form.Label>
                            <Form.Control
                                className="form"
                                placeholder="Enter text..."
                                as="textarea"
                                rows={5}
                                value={text}

                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <label htmlFor="images"
                               className="drop-container"
                               id="dropcontainer"
                               onClick={handleImageClick}
                               onDragOver={handleDragOver}
                               onDragEnter={handleDragEnter}
                               onDragLeave={handleDragLeave}
                               onDrop={handleDrop}
                        >
                            {file ?
                                <Image className="bookPhoto" src={typeof file === "string" ? `https://react-node-blog-nnpa.onrender.com/${file} ` : URL.createObjectURL(file)  } />
                                :
                                <div>
                                    <div className="drop-title">Add photo</div>
                                </div>
                            }


                            <input
                                type="file"
                                onChange={(e )=> setFile(e.target.files[0])}
                                style={{display: "none"}}
                                ref={inputRef}
                            />
                        </label>
                    </Col>
                </Row>

                <Button
                    onClick={updateBlog}
                    className="submit"

                    >
                    Update
                </Button>
            </Card>
        </Container>

    );
});

export default UpdateBlog;
