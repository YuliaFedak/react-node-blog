import React, { useContext, useRef, useState } from 'react';
import { Button, Card, Container, Form, Image } from "react-bootstrap";
import "../style/updateUser.css"
import { Context } from "../index";
import { updateOneUser } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { USER_ACCOUNT } from "../utils/consts";


const UpdateUser = observer(() => {

    const { user } = useContext(Context)
    const [nickname, setNickname] = useState(user.user.nickname)
    const [email, setEmail] = useState(user.user.email)
    const [password, setPassword] = useState(user.user.password)
    const [file, setFile] = useState(user.user.avatar)
    const history = useNavigate()

    console.log(typeof file)

    const updateUser = async (e) => {
        e.preventDefault(); // Зупиняємо стандартну поведінку форми
        try {
            const formData = new FormData();
            formData.append('nickname', nickname);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('avatar', file);
            const data = await updateOneUser(user.user.id, formData);
            // Виконуємо необхідні дії після успішного оновлення, наприклад, перенаправлення на іншу сторінку
            user.setUser(data);
            user.setIsAuth(true);
            history(USER_ACCOUNT);
            console.log('User updated successfully');
            console.log(user.user.nickname);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const inputRef = useRef(null);

    const [isDragActive, setIsDragActive] = useState(false);
    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragActive(true);
    };

    const handleDragLeave = () => {
        setIsDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragActive(false);
        const img = e.dataTransfer.files[0];
        console.log("selected file", img);
        setFile(img);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 52 }}>
            <Card className="updateUserImg">

                <Form >
                    <label htmlFor="images"
                           className="drop-container-update-user"
                           onClick={handleImageClick}
                           onDragOver={handleDragOver}
                           onDragEnter={handleDragEnter}
                           onDragLeave={handleDragLeave}
                           onDrop={handleDrop}

                    >
                        {file ?
                            <Image className="avatarPhoto" src={typeof file === "string" ? `https://react-node-blog-nnpa.onrender.com/${file} ` : URL.createObjectURL(file)  } />
                            :
                            <div>
                                <div className="drop-title">Add photo</div>
                            </div>
                        }
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                            ref={inputRef}
                        />
                    </label>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="formLabel">Username</Form.Label>
                        <Form.Control
                            className="form"
                            required
                            placeholder="Enter username"
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="formLabel">Email</Form.Label>
                        <Form.Control
                            className="form"
                            required
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="formLabel">Password</Form.Label>
                        <Form.Control
                            className="form"
                            required
                            placeholder="Enter password!"
                            value={password}
                            type="password"
                            onChange={e => setPassword(e.target.value)}

                        />
                    </Form.Group>
                    <Button className="updateUserButton" type="submit" onClick={updateUser}>Update</Button>
                </Form>
                <Card.Body>

                </Card.Body>
            </Card>
        </Container>
    );
});

export default UpdateUser;
