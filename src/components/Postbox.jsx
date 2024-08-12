import React from "react"
import 'styles/Layout.css'

const Postbox = ({ post }) => {
    return (
        <>
            <div className="post-container">
                <p>{post.userId}</p>
                <h2 className="h2">{post.title}</h2>
                <p>{post.body}</p>
            </div>
        </>
    )
}

export { Postbox }