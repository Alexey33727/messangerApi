import React, {useContext, useState} from "react";
import { Toaster } from "react-hot-toast";
import { Chat } from "../../components/Chat/Chat";
import { Navigate } from "../../components/Navigate/Navigate";
import { SideBar } from "../../components/SideBar/SideBar";
import { ChatContext } from "../../context/ChatContext";
import s from './Home.module.css';

export const Home = (props) => {
    const [act, setAct] = useState(true)

    const { data } = useContext(ChatContext)

    return (
        <div className={s.home}>
            <Toaster position="top-center"></Toaster>
            <div className={s.container}>
                <div className={s.fix}>
                    <Navigate act={act} />
                    <SideBar act={act} setAct={setAct} />
                    <Chat act={act} setAct={setAct} />
                </div>
                
            </div>
        </div>
    )
}