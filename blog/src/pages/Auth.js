import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Form, Container, Button, Row, Col, Image} from "react-bootstrap";
import {BLOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import "../style/auth.css"
import logo from '../static/registration.png'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(nickname, email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            console.log(user.isAuth)
            console.log(data)
            history(BLOG_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (


        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 52}} >

            <Row style={{width: "80%"}}>
                <Col md={6} className="formal">
                    <h2>{ isLogin ? "Sign in" : "Sign up"}</h2>
                    <Form className='formArea'>

                    {isLogin === false ?
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label className="formLabel">Username</Form.Label>
                            <Form.Control
                                value={nickname}
                                className="forms"
                                placeholder="Enter nickname"
                                onChange={ e => setNickname(e.target.value)} />
                        </Form.Group>

                        :
                        <div></div>
                    }
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label className="formLabel">E-mail</Form.Label>
                        <Form.Control
                            value={email}
                            className="forms"
                            type="email"
                            placeholder="Enter email"
                            onChange={ e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label className="formLabel">Password</Form.Label>
                        <Form.Control
                            value={password}
                            className="forms"
                            placeholder="Enter password"
                            type="password"
                            onChange={ e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button
                        className="mt-4 buttonForm"
                        onClick={click}
                    >
                        { isLogin ? "Sign in" : "Sign up"}
                    </Button>
                </Form>


                    {isLogin ?
                        <div className="text" style={{width: "auto", textAlign: "center"}}>Not registered?<NavLink
                            to={REGISTRATION_ROUTE}> Sign up!</NavLink>
                        </div>
                        :
                        <div className="text" style={{width: "auto", textAlign: "center"}}>Already registered?<NavLink
                            to={LOGIN_ROUTE}> Sign in!</NavLink>
                        </div>
                    }

                </Col>
                <Col md={6} className="d-flex justify-content-center align-items-center purple">
                    <Image src={logo}/>
                </Col>
            </Row>


        </Container>
    );
});

export default Auth;