import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {fetchAllBlogByTopic} from "../http/blogApi";
import {Col, Container, Row} from "react-bootstrap";
import BlogList from "../components/BlogList";
import CategoriesMenu from "../components/categoriesMenu";
import {Context} from "../index";

const CategoryBlog = ()=> {
    const {topic} = useParams()
    const {blog} = useContext(Context)


    useEffect(() => {
        fetchAllBlogByTopic(topic).then(data => blog.setBlog(data))
    })

    return (
        <Container>
            <Row className="mt-5">
                <Col md={9}>
                    <BlogList/>
                </Col>
                <Col md={3}>
                    <CategoriesMenu/>
                </Col>
            </Row>
        </Container>
    );
};

export default CategoryBlog;