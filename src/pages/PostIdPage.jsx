import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}>Post</h1>
            {isLoading
                ? <Loader></Loader>
                : <div>
                    <p style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>{post.id}. {post.title}</p>
                    <p>{post.body}</p>
                </div>
            }
            <h2 style={{ marginTop: "20px" }}>Comments</h2>
            {isComLoading
                ? <Loader></Loader>
                : <div>
                    {comments.map(comm =>
                        <div style={{ marginTop: "15px" }}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;