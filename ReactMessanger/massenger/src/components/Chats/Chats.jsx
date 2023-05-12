import React, { useContext, useEffect, useState } from 'react'
import loader from './../../img/Infinity-1.5s-141px.gif'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import s from './Chats.module.css'
import axios from 'axios'

export const Chats = (props) => {
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    
    useEffect(() => {
        const getChats = () => {
            axios.get(`https://alexey1242.pythonanywhere.com/api/v1/userchats/${currentUser.user_id}`, {
                headers: {
                    Authorization: "Bearer" + " " + currentUser.auth,
                }
            }).then(res => {
                props.setChats([...res.data])
            })
        }
        currentUser.user_id && getChats()
    }, [currentUser.user_id])

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
                    <div className={s.userChat} key={chat} onClick={() => handleSelect(chat)} >
                        <img src={`https://alexey1242.pythonanywhere.com${chat?.fromId == currentUser.user_id ? chat?.yourAva : chat?.fromAva}`} alt="" />
                        <div className={s.userChatInfo}>
                            <span>{chat.fromId == currentUser.user_id ? chat.yourName : chat.fromName}</span>
                            <p>{chat?.lastMessage}</p>
                        </div>
                    </div>)
            })}
        </div>
    )
}