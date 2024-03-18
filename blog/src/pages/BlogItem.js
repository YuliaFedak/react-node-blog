import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchOneBlog, updateLike} from "../http/blogApi";
import { Card, Col, Container, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import Comments from "../components/comments";
import "../style/blogItem.css"
import CategoriesMenu from "../components/categoriesMenu";
import {Context} from "../index";
import {fetchUser} from "../http/userApi";
import like from "../static/like.png"
import dislike from "../static/dislike.png"


const BlogItem = observer(() => {
    const {user} = useContext(Context)
    const [blog, setBlog] = useState("")
    const [likes, setLikes] = useState(0)
    const [counter, setCounter] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [counterDis, setCounterDis] = useState(0)

    const {id} = useParams()
    useEffect( () => {
        fetchOneBlog(id).then(data => {
            setBlog(data)
            setLikes(data.like !== null ? parseInt(data.like) : 0)
            setDislikes(data.dislike !== null ? parseInt(data.dislike) : 0)
        })
        fetchUser().then(data => user.setUsers(data))
    }, [id, user])


    const AddLike = async () => {
        const newLikes = counter === 0 ?  likes + 1: likes - 1;
        const newCounter = counter === 0 ? 1 : 0;
        setLikes(newLikes);
        setCounter(newCounter)
        // Створити новий об'єкт FormData з актуальними значеннями
        const formData = new FormData();
        formData.append('like', newLikes);
        formData.append('dislike', dislikes);
        // Викликати функцію оновлення лайків з новими даними
        await updateLike(id, formData);
    }

    const AddDislike = async () => {
        const newDislikes = counterDis === 0 ?  dislikes + 1: dislikes - 1;
        const newCounterDis = counterDis === 0 ? 1 : 0;
        setDislikes(newDislikes);
        setCounterDis(newCounterDis)
        const formData = new FormData();
        formData.append('like', likes);
        formData.append('dislike', newDislikes);
        // Викликати функцію оновлення лайків з новими даними
        await updateLike(id, formData);
    }

    console.log(counter)


    return (
        <Container className="mt-5">
            <Row>
                <Col md={9}>
                    <Card className="oneBlog">
                        <Card.Body>

                            <Card.Title className="mt-2 oneBlogTitle">{blog.title}</Card.Title>

                            <Card.Text className="mt-4">
                                <Card.Img src={"https://react-node-blog-nnpa.onrender.com/" + blog.img} className="oneBlogImg"/>
                                { blog.text ?
                                    blog.text.split('\n').map( (paragraph, index) =>
                                        <p key={index}>{paragraph}</p>
                                    )
                                    :
                                    null}
                            </Card.Text>
                            <Card.Title className="mt-2 oneBlogArticleAuthor">The author of the article: {user.users.find((userItem) => userItem.id === blog.userId)?.nickname || null}</Card.Title>
                            <div className="d-inline-flex mt-3">
                                <div className="me-3"><button className="button-like" onClick={AddLike}><Image className="like me-2" src={like}/></button>{likes}</div>
                                <div><button className="button-like" onClick={AddDislike}><Image className="dislike me-2" src={dislike}/></button>{dislikes}</div>
                            </div>
                        </Card.Body>

                        <hr/>
                        <Comments/>
                    </Card>

                </Col>
                <Col md={3}>
                    <CategoriesMenu/>
                </Col>
            </Row>



        </Container>
    );
});

export default BlogItem;
