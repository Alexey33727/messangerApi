import s from './Login.module.css'
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

export const Login = (props) => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await axios.post(process.env.REACT_APP_API_ADRES + 'api/v1/login', {
                email: email,
                password: password,
            }).then(res => {
                localStorage.setItem('refresh', res.data.token.refresh)
                if (res.data.message === 'Login Successfull') {
                    toast.success('login completed successfully');
                    setTimeout(() => {
                        navigate('/')
                    }, 500);
                }
            })
            // toast.success('login completed successfully');
            // setTimeout(() => {
            //     navigate("/");
            // }, 500);
        }
        catch (err) {
            toast.error('Something went wrong');
        }
    }
    return (
        <div className={s.formCont}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className={s.formWrapper}>
                <h1 className={s.logo}>Life Chat</h1>
                <p className={s.title}>Login</p>
                <form onSubmit={handleSubmit} className={s.form}>
                    <input type="email" placeholder="Enter your email" autoComplete="new-email" />
                    <input type="password" placeholder="Enter your password" autoComplete="new-password" />
                    <button className={s.btn}>Sing In</button>
                </form>
                <p className={s.link}> You don't have an account? <Link to={'/register'}>Register</Link></p>
            </div>
        </div>
    )
}