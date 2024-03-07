import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {fetchBlog} from "../http/blogApi";
import {observer} from "mobx-react-lite";

import BlogList from "../components/BlogList";
import {fetchUser} from "../http/userApi";
import { Col, Container, Row} from "react-bootstrap";
import CategoriesMenu from "../components/categoriesMenu";
import Pages from "../components/pages";



const Blog = observer(() => {
    const { blog } = useContext(Context);
    const { user } = useContext(Context);


    useEffect(() => {
        fetchBlog(blog.page, 5).then(data => {
            blog.setBlog(data.rows);
            blog.setTotalCountBlogs(data.count)
        });
        fetchUser().then(data => user.setUsers(data));
    }, [blog.page]);



    return (
        <Container>
            <Row className="mt-5">
                <Col md={9}>
                    <BlogList/>
                    <Pages/>
                </Col>
                <Col md={3}>
                    <CategoriesMenu/>
                </Col>

            </Row>
        </Container>

    );
});

export default Blog;