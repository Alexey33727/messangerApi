import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import s from './../Chat/Chat.module.css'
import { toast } from 'react-hot-toast'


const Header = (props) => {
    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)
    let name = data.user?.fromId == currentUser.user_id ? data.user?.you?.username : data.user?.he?.username

    return (
        <div className={s.chatInfo}>
            <div className={s.out} onClick={() => props.act ? props.setAct(false) : props.setAct(true)} ><ion-icon name="arrow-back-outline"></ion-icon></div>
            <span>{name}</span>
            <div className={s.chatIcons}>
                {/* <ion-icon name="videocam-outline"></ion-icon>
                <ion-icon name="person-add-outline"></ion-icon>
                <ion-icon name="ellipsis-horizontal-outline"></ion-icon> */}
            </div>
        </div>
    )
}

export default Header