import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (nickname,email, password) => {
    const {data} = await $host.post('api/user/registration', {nickname,email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post("api/user/login", {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get("api/user/auth")
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const fetchUser = async () => {
    const {data} = await $host.get("api/user/users")
    return data
}

export const updateOneUser = async (id, user) => {
    const {data} = await $authHost.put("api/user/update/" + id, user)
    return data
}
