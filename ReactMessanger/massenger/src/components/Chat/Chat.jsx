import React, { useContext, useState } from 'react'
import { Input } from '../Input/Input'
import { Messages } from '../Messages/Messages'
import s from './Chat.module.css'
import sv from "./../../pages/Home/Home.module.css"
import { ChatContext } from '../../context/ChatContext'
import Header from '../header/Header'

export const Chat = (props) => {
    const [messages, setMessages] = useState()

    const { data } = useContext(ChatContext)
    let a = !props.act ? s.Chat : sv.chat



    return (
        <div className={!props.act ? s.Chat : sv.chat}>
            <Header act={props.act} setAct={props.setAct} />
            <Messages messages={messages} setMess={setMessages} />
            <Input setMess={setMessages} />
        </div>
    )
}
