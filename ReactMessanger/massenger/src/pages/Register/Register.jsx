import { toast, Toaster } from 'react-hot-toast';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from './Register.module.css'
import axios from "axios";
import FormData from "form-data";

export const Register = (props) => {
    const navigate = useNavigate()

    const [ava, setAva] = useState('Add Avatar')
    const [pass, setPass] = useState('')
    const [avaf, setAvaf] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = document.querySelector('#form')
        if (pass.length < 8){
            toast.error('password must be 8 characters long')
            return;
        }
        if (avaf == null || ava == []){
            toast.error('select avatar')
            return;
        }
        if (e.target[0].value.length < 3){
            toast.error('Name cannot be less than 5 characters')
            return;
        }
        if (e.target[1].value.trim() == ''){
            toast.error('This field cannot be empty')
            return;
        }
        const fd = new FormData(form)
        
        
        axios.post(process.env.REACT_APP_API_ADRES + 'api/v1/signup/', fd).then((res) => {
            navigate('/login')
        }).catch((errors) => {
            toast.error(errors.response.data)
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
                    <input name='username' type="text" placeholder="Enter your name" autoComplete="new-text" />
                    <input name='email' type="email" placeholder="Enter your email" autoComplete="new-email" />
                    <input onChange={(e) => setPass(e.target.value)} required name='password' type="password" placeholder="Enter your password" autoComplete="new-password" />
                    <label htmlFor="file">
                        <ion-icon name="image-outline"></ion-icon>
                        <span>{ava.substring(0,10)}...</span>
                    </label>
                    <input onChange={(e) => {
                        setAva(e.target.files[0].name)
                        setAvaf(e.target.files[0])
                    }} name='photo' className={s.file} accept="image/png, image/gif, image/jpeg" id="file" type="file" />
                    <button className={s.btn}>Sing Up</button>
                </form>
                <p className={s.link}> You do have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </div>
    )
}