import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Form, Container, Image, InputGroup, Nav} from "react-bootstrap";
import "../style/categoriesMenu.css"
import {Link} from "react-router-dom";
import {ONE_BLOG_ROUTE, ONE_CATEGORY_ROUTE} from "../utils/consts";

import facebook from "../static/facebook.png"
import telegram from "../static/telegram (1).png"
import viber from "../static/viber.png"
import linkedin from "../static/linkedin.png"
import {fetchTopFive} from "../http/blogApi";


const CategoriesMenu = observer(() => {

    const [blogs, setBlogs] = useState([])

    useEffect( () => {
        fetchTopFive().then(data => setBlogs(data))
    }, [])

    return (

        <div>
            <Container className="categoryContainer mb-3">
                <InputGroup className="form-search-place">
                    <Form.Control
                        className="form-search"
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    >

                    </Form.Control>
                    <InputGroup.Text type="submit" className="searchIcon" id="basic-addon2"><i className="fa fa-search" aria-hidden="true"></i></InputGroup.Text>

                </InputGroup>
            </Container>
            <Container className="categoryContainer mb-3">
                <h4>Share: </h4>
                <div>
                    <Link><Image className="networkingSite" src={facebook}/></Link>
                    <Link><Image className="networkingSite" src={telegram}/></Link>
                    <Link><Image className="networkingSite" src={viber}/></Link>
                    <Link><Image className="networkingSite" src={linkedin}/></Link>
                </div>
            </Container>
            <Container className="categoryContainer mb-3">
                <h4>Categories</h4>

                <Nav className="flex-column">
                    <Link  className="listItem"to={ONE_CATEGORY_ROUTE + "/Fiction"}>Fiction</Link>
                    <Link className="listItem" to={ONE_CATEGORY_ROUTE + "/Non fiction"}>Non fiction</Link>
                    <Link className="listItem" to={ONE_CATEGORY_ROUTE + "/Drama"}>Drama</Link>
                    <Link className="listItem" to={ONE_CATEGORY_ROUTE + "/Poetry"}>Poetry</Link>
                </Nav>
            </Container>
            <Container className="categoryContainer">
                <h4>Top 5 books</h4>
                <Nav className="flex-column">
                    {blogs.map( blog =>
                        <Link className="listItem mt-3" to={ONE_BLOG_ROUTE + "/" + blog.id}>{blog.title}</Link>
                    )}
                </Nav>
            </Container>
        </div>

    );
});

export default CategoriesMenu;