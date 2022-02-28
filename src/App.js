import React, { useEffect, useState } from "react";
import PostService from "./API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/loader/Loader";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/usePosts";
import { useFetching } from "./hooks/useFetching";
import { getPageCount } from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

import './styles/App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);


    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => { fetchPosts(limit, page); }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
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
                postError &&
                <h2 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>Erroare ${postError}</h2>
            }
            {
                isPostLoading
                    ?
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                        <Loader></Loader>
                    </div>
                    : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Lista Cu Posturi" />
            }
            <Pagination totalPages={totalPages} page={page} changePage={changePage} />
        </div>
    );
}

export default App;