import {makeAutoObservable} from "mobx";

export default class User {
    constructor() {
        this._users = []
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }
    setIsAuth (bool) {
        this._isAuth = bool
    }

    setUser (user) {
        this._user = user
    }

    setUsers (users) {
        this._users = users
    }

    get isAuth (){
        return this._isAuth
    }

    get user (){
        return this._user
    }

    get users () {
        return this._users
    }
}