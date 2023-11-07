import React, { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext'
import { Search } from "../Search/Search";
import s from './SideBar.module.css'
import { Chats } from "../../components/Chats/Chats";

export const SideBar = (props) => {
    const { currentUser } = useContext(AuthContext)
    const [chats, setChats] = useState()
    return(
        <div className={!props.act ? s.SideBar : s.sidebar}>
            {/* <NavBar act={props.act} setAct={props.setAct} /> */}
            <div className={s.heads}><span className={s.text}>Messanger</span><span><img src={process.env.REACT_APP_API_ADRES + currentUser.user_photo} alt="" /></span></div>
            <Search chats={chats} setChats={setChats} />
            <Chats chats={chats} setChats={setChats} act={props.act} setAct={props.setAct} />
        </div>
    )
}