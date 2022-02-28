import React, { useMemo, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";

import './styles/App.css';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Aaaaaa', body: 'Bbbbbbbbb' },
        { id: 2, title: 'Cccccc', body: 'Aaaaaaaaa' },
        { id: 3, title: 'Bbbbbb', body: 'Ccccccccc' },
    ]);
    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const sortedPosts = useMemo(() => {
        console.log('Functia de observare a posturilor sortate');
        if (selectedSort) {
            return [...posts,].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        else return posts;
    }, [selectedSort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
    }, [searchQuery, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }
    //---Functie CallBack
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }
    const sortPosts = (sort) => {
        setSelectedSort(sort);
    }
    return (
        <div className="App">
            <PostForm create={createPost} />
            <hr style={{ margin: "15px 0" }} />
            <div>
                <MyInput
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search"
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Sortarea"
                    options={[
                        { value: "title", name: "Dupa titlu" },
                        { value: "body", name: "Dupa descriere" },
                    ]} />
            </div>
            {
                sortedAndSearchedPosts.length
                    ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Lista Cu Posturi" />
                    : <h1 style={{ textAlign: "center" }}>Nu s-a gasit nici-un post</h1>
            }

        </div>
    );
}

export default App;