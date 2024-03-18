import React, {useContext, useEffect, useState} from 'react';
import {Button, Card,  Col, Container, Row} from "react-bootstrap";
import "../style/userAccount.css"
import anonim from "../static/anonim.png"
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {USER_ACCOUNT, USER_ACCOUNT_UPDATE} from "../utils/consts";
import UserBlogs from "../components/userBlogs";
import {fetchAllBlogByUserId} from "../http/blogApi";
import {observer} from "mobx-react-lite";




const UserAccount = observer(() => {

    const { user } = useContext(Context);
    const history = useNavigate();
    const userId = user.user.id;
    const [userBlogs, setUserBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

                const result = await fetchAllBlogByUserId(userId);
                setUserBlogs(result.data); // Оновити стан блогів
        };
        fetchData();


    }, [userId]);



    console.log(user.user.avatar)


    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Card className="accountCard">
                        {user.user.avatar ?
                            <Card.Img className="accountAvatar" variant="top" src={"https://react-node-blog-nnpa.onrender.com/" + user.user.avatar} />
                            :
                            <Card.Img className="accountImg" variant="top" src={anonim} />
                        }
                        <Card.Body>
                            <div className="accountInformation">
                                <h5>Username:</h5>
                                <div className="information">{user.user.nickname}</div>
                            </div>
                            <div className="accountInformation">
                                <h5>Email:</h5>
                                <div className="information">{user.user.email}</div>
                            </div>
                            <div className="accountInformation">
                                <h5>Password:</h5>
                                <div className="point">&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</div>
                            </div>
                            <br/>
                            <br/>
                            <center>
                                <Button className=" accountButton" onClick={() => history(USER_ACCOUNT + USER_ACCOUNT_UPDATE)}>Update</Button>
                            </center>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <UserBlogs blogs={userBlogs}/>
                </Col>
            </Row>
        </Container>
    );
});

export default UserAccount;
