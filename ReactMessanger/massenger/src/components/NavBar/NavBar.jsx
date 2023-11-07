import React, { useContext, useState } from 'react'
import s from './NavBar.module.css'
import sv from "./../../pages/Home/Home.module.css"
import { signOut, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../../firebase/firebase.config'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-hot-toast'

export const NavBar = (props) => {

    const { currentUser } = useContext(AuthContext)

    const handleChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0]

        const storageRef = ref(storage, currentUser.email + '/' + currentUser.displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            (error) => {
                toast.error('Something went wrong')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(auth.currentUser, {
                        photoURL: downloadURL,
                    })
                    await updateDoc(doc(db, "users", currentUser.uid), {
                        photoURL: downloadURL,
                    });
                    toast.success('refresh page to change avatar')
                });
            }
        );

    }

    return (
        <div className={s.NavBar}>
            <div onClick={() => props.act ? props.setAct(false) : props.setAct(true)} className={props.act ? sv.menu + ' ' + sv.active : sv.menu}></div>
            <span className={s.logo}>Life Chat</span>
            <div className={s.user}>
                <label htmlFor='ava'><img style={{ margin: '8px 0 0 0' }} src={currentUser.photoURL} alt="" /></label>
                <input onChange={e => handleChange(e)} style={{ display: 'none' }} id='ava' type="file" accept='image/gif, image/png, image/jpeg' />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>LogOut</button>
            </div>
        </div>
    )
}