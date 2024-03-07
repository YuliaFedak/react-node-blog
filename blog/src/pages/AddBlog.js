import React, {useContext, useRef, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row,} from "react-bootstrap";
import {createBlog} from "../http/blogApi";
import {Context} from "../index";
import "../style/addBlog.css"
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {BLOG_ROUTE} from "../utils/consts";



const AddBlog = observer(({show, onHide}) => {
    const  [title, setTitle] = useState('')
    const  [topic, setTopic] = useState('')
    const  [text, setText] = useState('')
    const [file, setFile] = useState(null)
    const {user} =useContext(Context)
    const history = useNavigate()


    const addBlog = async () => {
        try {
            const formData = new FormData
            formData.append('title', title)
            formData.append('topic', topic)
            formData.append('text', text)
            formData.append('img', file)
            formData.append('userId', user.user.id)
            await createBlog(formData);
            history(BLOG_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    const inputRef = useRef(null)

    const [isDragActive, setIsDragActive] = useState(false);
    const handleImageClick = () => {
        inputRef.current.click()
    }
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
        const img = e.dataTransfer.files[0]
        console.log("selected file", img);
        setFile(e.dataTransfer.files[0])
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 52}}>
            <Card style={{width: "70%"}} className="p-5">
                <h2 className="mb-3 mt-2" style={{textAlign: "center"}}>Add article</h2>
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="formLabel">Title</Form.Label>
                            <Form.Control
                                className="form"
                                placeholder="Enter title..."
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="formLabel">Category</Form.Label>
                            <br/>
                            <div className="selector">
                            <select id="categ" className="categories" value={topic} onChange={(e) => setTopic(e.target.value)} >
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
                                onChange={e => setText(e.target.value)}
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
                                        <Image className="bookPhoto" src={URL.createObjectURL(file)}/>
                                :
                                <div>
                                    <div className="drop-title">Drop files here</div>
                                    <div style={{textAlign: "center"}}>or</div>
                                    <div className="drop-title">select file</div>
                                </div>
                            }
                                    <input
                                        type="file"
                                        onChange={(e)=> setFile(e.target.files[0])}
                                        style={{display: "none"}}
                                        ref={inputRef}
                                    />
                        </label>
                    </Col>
                </Row>

                <Button
                    className="submit"
                    onClick={addBlog}>
                    Submit
                </Button>
            </Card>
        </Container>
    );
});

export default AddBlog;