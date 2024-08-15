import 'styles/Layout.css'
import { Postbox } from "./Postbox"
import { useState, useRef, useEffect } from 'react'

const Postboxdelete = ({ post, onDelete }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const confirmDeleteRef = useRef(null);

    const deletePost = () => {
        onDelete(post);
        setShowConfirmDelete(false);
    }

    const handleClickOutside = (event) => {
        if (confirmDeleteRef.current && !confirmDeleteRef.current.contains(event.target)) {
            setShowConfirmDelete(false);
        }
    }

    useEffect(() => {
        if (showConfirmDelete) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showConfirmDelete]);

    return (
        <>
            <Postbox post={post}>
                <button onClick={() => setShowConfirmDelete(true)} className="delete-button">delete</button>
            </Postbox>
            {showConfirmDelete && (
                <div className="modal" ref={confirmDeleteRef}>
                    <h2>The action you want to take could lead to a worldwide catastrophe, are you sure you want to proceed?</h2>
                    <div className="button-group">
                        <button onClick={deletePost}>Delete</button>
                        <button onClick={() => setShowConfirmDelete(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}

export { Postboxdelete }