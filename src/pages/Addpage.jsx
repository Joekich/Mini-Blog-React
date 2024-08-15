import { useState, useRef, useEffect } from "react";
import { Postboxdelete } from "components/Postboxdelete";

const Addpage = () => {
    const [posts, setPosts] = useState(new Set([{ id: 1, title: "Test title", body: "Test body", userId: 1 }]));
    const [modal, setModal] = useState(false);
    const modalRef = useRef(null);

    const addPost = () => {
        if (!modal.title.trim() || !modal.body.trim()) {
            alert('Title and body cannot be empty!')
            return;
        }
        const newPost = {
            id: posts.length + 1,
            title: modal.title,
            body: modal.body,
            userId: 1
        };
        setPosts(prev => new Set([...prev, newPost]));
        setModal(false);
    };

    const onDelete = (post) => {
        setPosts(prev => {
            const newPosts = new Set([...prev]);
            newPosts.delete(post)
            return newPosts;
        })
    }

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModal(false);
        }
    }

    useEffect(() => {
        if (modal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [modal]);

    return (
        <main className="container">
            <button onClick={() => setModal({ title: '', body: '' })}>Add post</button>

            {modal && (
                <div className="modal" ref={modalRef}>
                    <h2>Add new post</h2>
                    <input
                        type="text"
                        placeholder="Enter your title name"
                        value={modal.title}
                        onChange={(e) => setModal(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <textarea
                        placeholder="Enter your body text"
                        value={modal.body}
                        onChange={(e) => setModal(prev => ({ ...prev, body: e.target.value }))}
                    />
                    <div className="control-buttons">
                        <button onClick={addPost}>Add</button>
                        <button onClick={() => setModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {[...posts].map(post => (
                <Postboxdelete key={post.id} post={post} onDelete={onDelete} />
            ))}
        </main>
    );
};

export { Addpage };