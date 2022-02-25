import React, { useState } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostItem from "./components/PostItem";
import './styles/App.css';

function App() {
    const [value, setValue] = useState('Johnny');

    return (
        <div className="App">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <Counter />
        </div>
    );
}

export default App;