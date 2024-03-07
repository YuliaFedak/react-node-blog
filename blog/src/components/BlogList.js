import React, {useContext, useEffect} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ONE_BLOG_ROUTE} from "../utils/consts";
import "../style/blogList.css"


const BlogList = observer(() => {
    const history = useNavigate()
    const {blog} = useContext(Context)
    return (
            <div>
                {blog.blogs.map( blog =>
                    <Card key={blog.id} className="card" >
                        <Card.Body>
                            <Row className="items">
                                <Col md={8} className="flex-row">

                                    <Card.Subtitle className="mt-2" style={{fontSize: 30, fontFamily: "cursive"}}>{blog.title}</Card.Subtitle>
                                    <Card.Text className="topic">
                                        {blog.topic}
                                    </Card.Text>
                                    <Card.Text>

                                        {
                                            blog.text.split("\n")[0]

                                        }
                                    </Card.Text>
                                    <div className="button-container">
                                        <Button className="buttonRead" onClick={() => history(ONE_BLOG_ROUTE + "/" + blog.id)}>Read more... </Button>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="d-flex align-content-end align-items-center">
                                        <Card.Img variant="top" className="cardImg" src={"http://localhost:7000/" + blog.img} />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}
            </div>
    );
});


export default BlogList;