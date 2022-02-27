import React, { useState } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import './styles/App.css';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Javascript', body: 'Description' },
        { id: 2, title: 'Javascript1', body: 'Description' },
        { id: 3, title: 'Javascript2', body: 'Description' },
    ]);

    return (
        <div className="App">
            <form>
                <input type="text" placeholder="Denumire Post" />
                <input type="text" placeholder="Descriere Post" />
                <MyButton disabled>Creare post</MyButton>
            </form>
            <PostList posts={posts} title="Lista 1" />
        </div>
    );
}

export default App;