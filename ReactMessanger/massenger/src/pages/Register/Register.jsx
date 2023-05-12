import { toast, Toaster } from 'react-hot-toast';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from './Register.module.css'
import axios from "axios";
import FormData from "form-data";

export const Register = (props) => {
    const navigate = useNavigate()

    const [ava, setAva] = useState('Add Avatar')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = document.querySelector('#form')
        const fd = new FormData(form)
        
        
        axios.post('https://alexey1242.pythonanywhere.com/api/v1/signup/', fd).then((res) => {
            navigate('/login')
        })
    }

    return (
        <div className={s.formCont}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className={s.formWrapper}>
                <h1 className={s.logo}>Life Chat</h1>
                <p className={s.title}>Register</p>
                <form onSubmit={handleSubmit} className={s.form} id='form'>
                    <input required name='username' type="text" placeholder="Enter your name" autoComplete="new-text" />
                    <input required name='email' type="email" placeholder="Enter your email" autoComplete="new-email" />
                    <input required name='password' type="password" placeholder="Enter your password" autoComplete="new-password" />
                    <label htmlFor="file">
                        <ion-icon name="image-outline"></ion-icon>
                        <span>{ava.substring(0,10)}...</span>
                    </label>
                    <input onChange={(e) => setAva(e.target.files[0].name)} required name='photo' className={s.file} accept="image/png, image/gif, image/jpeg" id="file" type="file" />
                    <p className={s.err}>All fields are required</p>
                    <button className={s.btn}>Sing Up</button>
                </form>
                <p className={s.link}> You do have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </div>
    )
}