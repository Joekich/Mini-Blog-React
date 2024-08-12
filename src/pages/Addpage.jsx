import React, { useState } from "react";
import { Postboxdelete } from "components/Postboxdelete";

const Addpage = () => {
    const [posts, setPosts] = useState([
        { id: 1, title: "Test title", body: "Test body", userId: 1 }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const addPost = () => {
        if (!newTitle.trim() || !newBody.trim()) {
            alert('Title and body cannot be empty!')
            return;
        }
        const newPost = {
            id: posts.length + 1,
            title: newTitle,
            body: newBody,
            userId: 1
        };
        setPosts([...posts, newPost]);
        setNewTitle("");
        setNewBody("");
        setShowModal(false);
    };

    const confirmDeletePost = (id) => {
        setPostToDelete(id);
        setShowConfirmDelete(true);
    }

    const deletePost = (id) => {
        const updatedPosts = posts.filter(post => post.id !== postToDelete);
        setPosts(updatedPosts);
        setShowConfirmDelete(false);
    }

    return (
        <div className="container">
            <button onClick={() => setShowModal(true)}>Add post</button>

            {showModal && (
                <div className="modal">
                    <h2>Add new post</h2>
                    <input
                        type="text"
                        placeholder="Enter your title name"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Enter your body text"
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                    />
                    <div className="control-buttons">
                        <button onClick={addPost}>Add</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showConfirmDelete && (
                <div className="modal">
                    <h2>The action you want to take could lead to a worldwide catastrophe, are you sure you want to proceed?</h2>
                    <div className="button-group">
                        <button onClick={deletePost}>Delete</button>
                        <button onClick={() => setShowConfirmDelete(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {posts.map(post => (
                <Postboxdelete key={post.id} post={post} onDelete={confirmDeletePost} />
            ))}
        </div>
    );
};

export { Addpage };