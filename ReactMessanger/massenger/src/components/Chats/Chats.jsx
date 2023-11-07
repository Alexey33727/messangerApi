import React, { useContext, useEffect, useState } from 'react'
import loader from './../../img/Infinity-1.5s-141px.gif'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import s from './Chats.module.css'
import axios from 'axios'

export const Chats = (props) => {
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    const [up, setUp] = useState(true)
    
    useEffect(() => {
        const getChats = () => {
            axios.get(process.env.REACT_APP_API_ADRES + `api/v1/userchats/${currentUser.user_id}`, {
                headers: {
                    Authorization: "Bearer" + " " + currentUser.auth,
                }
            }).then(res => {
                props.setChats([...res.data])
            })
        }
        currentUser.user_id && getChats()
        setTimeout(() => {
            setUp(!up)
        }, 10000);
    }, [currentUser.user_id, up])

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
        props.setAct(false)
    }
    if (!props.chats){
        return (
            <div className={s.Chats}>
                <img className={s.loader} src={loader} alt="" />
            </div>
        )
    }

    return (
        <div className={s.Chats}>
            {props.chats?.map(chat => {
                return (
                    <div className={s.userChat} key={chat.chatId} onClick={() => handleSelect(chat)} >
                        <img src={process.env.REACT_APP_API_ADRES + `${chat?.fromId == currentUser.user_id ? chat?.you?.photo : chat?.he?.photo}`} alt="" />
                        <div className={s.userChatInfo}>
                            <span>{chat.fromId == currentUser.user_id ? chat.you.username : chat.he.username}</span>
                            <p>{chat?.lastMessage}</p>
                        </div>
                    </div>)
            })}
        </div>
    )
}