import { useEffect, useState } from "react";
import { Postbox } from "components/Postbox";

const Sortpage = () => {
    const [posts, setPosts] = useState([]);
    const [sortType, setSortType] = useState("userId");

    const sortPosts = (unsortedPosts, type) => {
        // const sorted = [...posts].sort((a, b) => type === 'userId' ? a.userId - b.userId : a.title.localeCompare(b.title));
        const sorted = [...unsortedPosts].sort((a, b) => {
            switch(type) {
                case 'userId':
                    return a.userId - b.userId;
                case 'title':
                    return a.title.localeCompare(b.title);
            }
        });
        return sorted;
    };

    const sortedPosts = sortPosts(posts, sortType)

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
            } catch (error) {
                console.error('error', error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="container">
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
                    <Postbox key={post.id} post={post} />
                ))
            }
        </main >
    )
}

export { Sortpage };