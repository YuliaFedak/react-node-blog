import {
    BLOG_ROUTE,
    ADD_BLOG_ROUTE,
    LOGIN_ROUTE,
    ONE_BLOG_ROUTE,
    REGISTRATION_ROUTE,
    ONE_CATEGORY_ROUTE,
    USER_ACCOUNT, USER_ACCOUNT_UPDATE
} from "./utils/consts";

import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import BlogItem from "./pages/BlogItem";
import AddBlog from "./pages/AddBlog";
import CategoryBlog from "./pages/CategoryBlog";
import UserAccount from "./pages/UserAccount";
import UpdateUser from "./pages/UpdateUser";
import UpdateBlog from "./pages/UpdateBlog"

export const authRoutes = [
    {
        path: ADD_BLOG_ROUTE,
        Component: AddBlog
    },
    {
        path: USER_ACCOUNT,
        Component: UserAccount
    },
    {
        path: USER_ACCOUNT + USER_ACCOUNT_UPDATE,
        Component: UpdateUser
    },
    {
        path: USER_ACCOUNT + "/:id",
        Component: UpdateBlog
    }
]
export const publicRoutes = [
    {
        path: BLOG_ROUTE,
        Component: Blog
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ONE_BLOG_ROUTE + "/:id",
        Component: BlogItem
    },
    {
        path: ONE_CATEGORY_ROUTE + "/:topic",
        Component: CategoryBlog
    }

]