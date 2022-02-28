import React, { useEffect, useState } from "react";
import PostService from "./API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/loader/Loader";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/usePosts";

import './styles/App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostLoading, setIsPostLoading] = useState(false);

    useEffect(() => { fetchPosts(); }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    async function fetchPosts() {
        setIsPostLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setPosts(posts);
            setIsPostLoading(false);
        }, 3000);
    }


    return (
        <div className="App">
            <MyButton style={{ margin: "30px 0 0 0" }} onClick={() => setModal(true)}>
                Creare Post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: "15px 0" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            {
                isPostLoading
                    ?
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                        <Loader></Loader>
                    </div>
                    : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Lista Cu Posturi" />
            }
        </div>
    );
}

export default App;