import {Spinner} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {check} from "./http/userApi";
import {Context} from "./index";
import {observer} from "mobx-react-lite";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await check();
                if (data) {
                    user.setUser(data);
                    user.setIsAuth(true);
                    console.log(data)
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]); // Додано порожній масив залежностей

    if (loading) {
        return <Spinner animation={"grow"} />;
    }
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
});


export default App;
