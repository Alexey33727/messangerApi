import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import s from './Message.module.css'
import { Link } from 'react-router-dom'

export const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const ref = useRef()
    
    

    useEffect(() => {
        ref.current?.scrollIntoView({behavior:"smooth"})
    }, [data.chatId])
    
    let dat = new Date(message.dateAndTime);

    return (
        <div ref={ref} className={message.senderId == currentUser.user_id ? s.message : s.owner}>
            <div className={s.messageInfo}>
                <img src={"https://alexey1242.pythonanywhere.com"+message.senderAva} alt="" />
                
            </div>
            <div className={s.messageContent}>
                <p>{message.text}</p>
                {message.img && <img src={"https://alexey1242.pythonanywhere.com"+message.img} alt="" tabIndex={message.id} />}
                {message.file && <Link to={"https://alexey1242.pythonanywhere.com"+message.file} target="_blank" download><ion-icon name="document-outline"></ion-icon><p>{message.fileName}</p></Link> }
                <div></div>
                <span>{dat.getDate().toString().length === 1 ? `0${dat.getDate()}` : dat.getDate()}.{dat.getMonth().toString().length === 1 ? `0${dat.getMonth()}` : dat.getMonth()}.{dat.getFullYear()} {dat.getHours()}:{dat.getMinutes().toString().length === 1 ? `0${dat.getMinutes()}` : dat.getMinutes()}</span>
            </div>
        </div>
    )
}