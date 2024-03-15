import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Button, Card, Container, Form, Image, useAccordionButton} from "react-bootstrap";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useNavigate, useParams} from "react-router-dom";
import {createReply, fetchReplies} from "../http/blogApi";
import anonim from "../static/anonim.png";
import "../style/reply.css"


const Reply = ({commentId}) => {
    const {user} = useContext(Context)
    const {id} = useParams()
    const history = useNavigate()
    function ContextAwareToggle({ children, eventKey, callback }) {

        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey),
        );


        return (
            <button
                type="button"
                className="buttonReply"
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }

    const [reply, setReply] = useState('')
    const [replies, setReplies] = useState([])
    const addReply = () => {
        const formData = new FormData
        formData.append("reply", reply)
        formData.append('userId', user.user.id)
        formData.append("blogId", id)
        formData.append("commentId", commentId)
        createReply(formData).then()
    }

    useEffect(() => {
        fetchReplies(commentId).then(data => setReplies(data))
    }, [])

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC"
    }

    return (
        <Accordion defaultActiveKey="0">
            <Container className="replyContainer">
                {replies.map(reply => {
                    const foundUser = user.users.find((user) => user.id === reply.userId);
                    const avatarSrc = foundUser && foundUser.avatar ? `https://react-node-blog-nnpa.onrender.com/${foundUser.avatar}` : anonim;
                    const userNickname = foundUser ? foundUser.nickname : null;
                    const commentDate = foundUser ? new Date(reply.createdAt).toLocaleDateString("en-US", options) : null;
                    return (
                        <div className="oneCommentBox" key={reply.id}>
                            <Image className="commentImg" src={avatarSrc}/>

                            <div className="commentOwner">{userNickname}</div>
                            <div className="commentDate">
                                {commentDate}
                            </div>
                            <p className="comment">{reply.reply}</p>

                        </div>)
                })}
            </Container>
            <Card>
                <Card.Header style={{backgroundColor: "white", borderBottom: 0}}>
                    <ContextAwareToggle  eventKey="1">Reply</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Form className="commentBox">
                            <Form.Group className="mb-3">
                                <Form.Control
                                    className="form"
                                    placeholder="Write a reply"
                                    as="textarea"
                                    rows={3}
                                    value={reply}
                                   onChange={e => setReply(e.target.value)}
                                />
                            </Form.Group>
                            { user.isAuth ?
                                <Button className="commentButton" onClick={addReply}>Reply</Button>
                                :
                                <Button className="commentButton" onClick={() => history(LOGIN_ROUTE)}>Sign in</Button>
                            }
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

        </Accordion>
    );
}

export default Reply;
