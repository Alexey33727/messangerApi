
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { Message } from '../Message/Message'
import s from './Messages.module.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'





export const Messages = (props) => {
    const [rere, setRere] = useState(false)


    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (data.chatId != 'null') {
            axios.get(process.env.REACT_APP_API_ADRES + `api/v1/messages/${data.chatId}`, {
                headers: {
                    Authorization: "Bearer" + " " + currentUser.auth,
                }
            }).then(res => {
                props.setMess([...res.data])
                setTimeout(() => {
                    setRere(!rere)
                }, 10000);
            })
        }
    }, [data.chatId, rere])
    if (!props.messages) {
        return (
            <div className={s.masseges}>
                <p className={s.notOpen}>Open chat to see messages</p>
            </div>
        )
    }

    return (
        <div className={s.masseges}>
            {props.messages.map(m => {
                return <Message message={m} key={m.id} />
            })}
        </div>
    )
}