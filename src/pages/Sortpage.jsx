import React, { useEffect, useState } from "react";
import { Postbox } from "components/Postbox";

const Sortpage = () => {
    const [posts, setPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);
    const [sortType, setSortType] = useState("userId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                const data = await response.json();

                const userPostsMap = new Map();
                data.forEach(post => {
                    if (!userPostsMap.has(post.userId)) {
                        userPostsMap.set(post.userId, post);
                    }
                });

                const uniqueUserPosts = Array.from(userPostsMap.values());
                setPosts(uniqueUserPosts);
                setSortedPosts(uniqueUserPosts);
            } catch (error) {
                console.error('error', error);
            }
        };


        fetchData();
    }, []);

    const sortByUserId = () => {
        const sorted = [...posts].sort((a, b) => a.userId - b.userId);
        setSortedPosts(sorted);
    };

    const sortByTitle = () => {
        const sorted = [...posts].sort((a, b) => a.title.localeCompare(b.title));
        setSortedPosts(sorted);
    }

    useEffect(() => {
        sortType === "userId" ? sortByUserId() : sortByTitle();
    }, [sortType, posts]);

    return (
        <div className="container">
            <div>
                <label htmlFor="sort">Sort by: </label>
                <select
                    id="sort"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option value="userId">User ID</option>
                    <option value="title">Title</option>
                </select>
            </div>

            {
                sortedPosts.map(post => (
                    <Postbox key={post.id} post={post}></Postbox>
                ))
            }
        </div >
    )
}

export { Sortpage };