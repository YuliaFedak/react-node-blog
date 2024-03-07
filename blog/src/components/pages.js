import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import "../style/pages.css"

const Pages = observer(() => {
    const {blog} = useContext(Context)
    const pageCount = Math.ceil(blog.totalCountBlog / blog.limit)
    const pages = []
    for (let i = 0; i < pageCount; i++ ) {
        pages.push(i + 1)
    }
    return (
        <Pagination className="d-flex justify-content-center mt-5">

            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    className="pagination"
                    active={blog.page === page}
                    onClick={() => blog.setPage(page)}
                >{page}</Pagination.Item>
            )}


        </Pagination>

    );
});

export default Pages;