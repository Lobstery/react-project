import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";

import './styles/App.css';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Aaaaaa', body: 'Bbbbbbbbb' },
        { id: 2, title: 'Cccccc', body: 'Aaaaaaaaa' },
        { id: 3, title: 'Bbbbbb', body: 'Ccccccccc' },
    ]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        console.log('Functia de observare a posturilor sortate');
        if (filter.sort) {
            return [...posts,].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        else return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase()));
    }, [filter.query, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }
    //---Functie CallBack
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
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
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Lista Cu Posturi" />
        </div>
    );
}

export default App;