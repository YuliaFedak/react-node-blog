import React, {useContext} from 'react';
import { Container, Image, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Link, NavLink} from "react-router-dom";
import {BLOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ADD_BLOG_ROUTE, USER_ACCOUNT} from "../utils/consts";
import "../style/navBar.css"
import book from "../static/book.png"



const NavBar = observer(() => {
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)

    }
    return (
        <Navbar className="navbars" style={{ background: "linear-gradient(101deg, #8D08F5 16.26%, rgba(64, 6, 110, 0.48) 152.06%, rgba(77, 20, 122, 0.00) 158.41%)",
        }} data-bs-theme="dark">
            <Container>
                <NavLink to={BLOG_ROUTE} style={{textDecoration: "none", color: "white", fontSize: 22}}>BookBlog <Image src={book} style={{width: 35}}/></NavLink>
                {user.isAuth === true ?

                    <Nav className="ml-auto">
                        <Link
                            className="buttonNav"
                            to={USER_ACCOUNT}
                            >
                            My account
                        </Link>
                        <Link
                            to={ADD_BLOG_ROUTE}
                            className="buttonNav"
                        >
                            Add article
                        </Link>
                        <Link
                            to={LOGIN_ROUTE}
                            className="buttonNav"
                            onClick={logOut}
                        >
                            Sign out</Link>

                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Link
                            className="buttonNav"
                            to={LOGIN_ROUTE}
                        >
                            Sign in
                        </Link>
                        <Link
                            to={REGISTRATION_ROUTE}
                            className="buttonNav"
                        >
                            Sign up
                        </Link>
                    </Nav>

                }
            </Container>
        </Navbar>

    );
});

export default NavBar;