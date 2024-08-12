import React from "react"
import 'styles/Layout.css'

const Postboxdelete = ({ post, onDelete }) => {
    return (
        <>
            <div className="post-container">
                <p>{post.userId}</p>
                <h2 className="h2">{post.title}</h2>
                <p>{post.body}</p>
                <button onClick={() => onDelete(post.id)} className="delete-button">Delete</button>
            </div >
        </>
    )
}

export { Postboxdelete }