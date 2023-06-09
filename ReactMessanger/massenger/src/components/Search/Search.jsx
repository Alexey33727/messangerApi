import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import s from './Search.module.css'
import { db } from '../../firebase/firebase.config';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import FormData from 'form-data';

export const Search = (props) => {
    const { currentUser } = useContext(AuthContext)

    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);

    const handleSearch = async () => {
        axios.post(`https://alexey1242.pythonanywhere.com/api/v1/finduser`, {
            finder: username
        }, {
            headers: {
                Authorization: "Bearer" + " " + currentUser.auth,
            }
        },).then(res => {
            if (currentUser.user_name === username) {
                toast.error('It is you')
            }
            else {
                setUser(res.data)
            }
        })

        // try {
        //     setErr(false)
        //     querySnapshot.forEach((doc) => {

        //         else {

        //         } 
        //     });
        // }
        // catch(err) {
        //     toast.error('User not found!')
        // }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        let fromAva = user[0]?.photo
        let yourAva = currentUser.user_photo
        axios.post('https://alexey1242.pythonanywhere.com/api/v1/createchat', {
            yourId: currentUser.user_id,
            fromId: user[0]?.id,
            fromAva: fromAva.replace(/\/media|media/, ''),
            yourAva: yourAva.replace(/\/media|media/, ''),
            lastMessage: '',
            fromName: user[0]?.username,
            yourName: currentUser.user_name,
        }, {
            headers: {
                Authorization: "Bearer" + " " + currentUser.auth,
            }
        }).then(res => {
            axios.get(`https://alexey1242.pythonanywhere.com/api/v1/userchats/${currentUser.user_id}`, {
                headers: {
                    Authorization: "Bearer" + " " + currentUser.auth,
                }
            }).then(res => {
                props.setChats([...res.data])
            })
        }).catch(err => {
            toast.error('chat with this user already exists')
        })
    }

    return (
        <div className={s.search}>
            <div className={s.searchForm}>
                <input value={username} onChange={e => setUsername(e.target.value)} onKeyDown={handleKey} placeholder='find a user by username' type="text" />
                <button onClick={handleSearch} className={s.sp} ><ion-icon name="search-outline"></ion-icon></button>
            </div>
            {user === null || user.length === 0 ?
                null : <div className={s.userChat} onClick={handleSelect}>
                    <img src={'https://alexey1242.pythonanywhere.com' + user[0]?.photo} alt="" />
                    <div className={s.userChatInfo}>
                        <span>{user[0]?.username}</span>
                    </div>
                </div>
            }
        </div>
    )
}
