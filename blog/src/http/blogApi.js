import {$authHost, $host} from "./index";


export const createBlog = async (blog) => {
    const {data} = await $authHost.post('api/blog', blog)
    return data
}

export const fetchBlog = async (page, limit = 5) => {
    const { data } = await $host.get("api/blog", { params: { page, limit } });
    return data;
}

export const fetchAllBlogByTopic = async (topic) => {
    const {data} =await $host.get("api/blog/category/" + topic)
    return data
}

export const fetchAllBlogByUserId = async (userId) => {
    const {data} = await $authHost.get("api/blog/list/" + userId)
    return {data}
}

export const fetchOneBlog = async (id)  => {
    const {data} = await $host.get("api/blog/" + id)
    return data
}

export const fetchTopFive = async () => {
    const {data} = await $host.get("api/blog/top/five")
    return data
}

export const updateOneBlog = async (id, blog) => {
    const {data} = await $authHost.put("api/blog/update/" + id, blog)
    return data
}

export const updateLike = async (id, like) => {
    const {data} = await $host.put("api/blog/" + id, like)
    return data
}
export const deleteBlog = async (id) => {
    const {data} = await $authHost.delete("api/blog/delete/" + id)
    return data
}

export const createComment = async (comment) => {
    const {data} = await $authHost.post('api/comment', comment)
    return data
}

export const fetchComment = async (blogId) => {
    const {data} = await $host.get("api/comment/" + blogId)
    return data.rows
}

export const countComments = async (blogId) => {
    const {data} = await $host.get("api/comment/" + blogId)
    return data.count
}

export const createReply = async (reply) => {
    const {data} = await $authHost.post("api/reply", reply)
    return data
}

export const fetchReplies = async (commentId) => {
    const {data} = await $host.get("api/reply/" + commentId)
    return data
}

