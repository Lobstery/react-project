import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <MyInput type={"text"} placeholder={"Login..."}></MyInput>
                <MyInput type={"password"} placeholder={"Parola..."}></MyInput>
                <MyButton>Login</MyButton>
            </form>
        </div>
    );
};

export default Login;