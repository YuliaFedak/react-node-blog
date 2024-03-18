import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Image,} from "react-bootstrap";
import "../style/comment.css"
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {countComments, createComment, fetchComment} from "../http/blogApi";
import anonim from "../static/anonim.png"
import * as PropTypes from "prop-types";
import Reply from "./reply";
import {fetchUser} from "../http/userApi";

function CustomToggle(props) {
    return null;
}

CustomToggle.propTypes = {
    eventKey: PropTypes.string,
    children: PropTypes.node
};
const Comments = observer(() => {
    const {user} = useContext(Context)
    const {blog} = useContext(Context)
    const history = useNavigate()
    const {id} = useParams()
    const [comment, setComment] = useState('')


    const addComment = () => {
        const formData = new FormData
        formData.append("comment", comment)
        formData.append("userId", user.user.id)
        formData.append("blogId", id)
        createComment(formData).then()
    }

    useEffect(()=> {
        fetchComment(id).then(data => blog.setComment(data))
        countComments(id).then(data => blog.setTotalCount(data))

    }, [])

    useEffect( () => {
        fetchUser().then(data => user.setUsers(data))
    }, [id])


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
        <div>
            <Form className="commentBox">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="commentFormLabel">Comments ({blog.totalCount})</Form.Label>
                    <Form.Control
                        className="form"
                        placeholder="Write a comment..."
                        as="textarea"
                        rows={5}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                </Form.Group>
                { user.isAuth ?
                    <Button className="commentButton" onClick={addComment}>Reply</Button>
                    :
                    <Button className="commentButton" onClick={() => history(LOGIN_ROUTE)}>Sign in</Button>
                }
            </Form>

            <Container>
                {blog.comments.map((comment) => {
                    const foundUser = user.users.find((user) => user.id === comment.userId);
                    const avatarSrc = foundUser && foundUser.avatar ? `http://localhost:7000/${foundUser.avatar}` : anonim;
                    const userNickname = foundUser ? foundUser.nickname : null;
                    const commentDate = foundUser ? new Date(foundUser.createdAt).toLocaleDateString("en-US", options) : null;
                    return (
                        <div className="oneCommentBox" key={comment.id}>
                            <Image className="commentImg" src={avatarSrc}/>

                        <div className="commentOwner">{userNickname}</div>
                        <div className="commentDate">
                            {commentDate}
                        </div>
                        <p className="comment">{comment.comment}</p>


                        <Reply commentId={comment.id}/>
                    </div>)
                })}
            </Container>

        </div>


    );
});

export default Comments;