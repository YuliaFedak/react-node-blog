import {makeAutoObservable} from "mobx";

export default class Blog {
    constructor() {
        this._blogs = []
        this._comments = []

        this._page = 1
        this._limit = 5
        this._totalCount = 0
        this._totalCountBlog = 0
        makeAutoObservable(this)
    }
    setBlog (blogs) {
        this._blogs = blogs
    }

    setComment (comments) {
        this._comments = comments
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setTotalCountBlogs(totalCountBlog) {
        this._totalCountBlog = totalCountBlog
    }

    setPage (page) {
        this._page = page
    }

    get blogs () {
        return this._blogs
    }

    get comments (){
        return this._comments
    }

    get totalCount () {
        return this._totalCount
    }

    get totalCountBlog () {
        return this._totalCountBlog
    }

    get limit () {
        return this._limit
    }

    get page () {
        return this._page
    }

}