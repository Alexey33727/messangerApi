import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import s from './Input.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router'
import FormData from 'form-data'

export const Input = (props) => {


    const [text, setText] = useState('')
    const [des, setDes] = useState(false)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSub = async (e) => {
        e.preventDefault()
        setDes(true)
        let fileName = e.target[1].files[0].name
        let yourAva = currentUser.user_photo
        const form = document.querySelector('#sender')
        const fd = new FormData(form)
        fd.append('text', text)
        fd.append('senderId', currentUser.user_id)
        fd.append('senderAva', yourAva.replace(/\/media|media/, ''))
        fd.append('senderName', currentUser.user_name)
        fd.append('fileName', fileName)

        axios.post(`https://alexey1242.pythonanywhere.com/api/v1/messages/${data.chatId}`, fd, {
            headers: {
                Authorization: "Bearer" + " " + currentUser.auth,
            }
        }).then(res => {
            setText('')
            axios.get(`https://alexey1242.pythonanywhere.com/api/v1/messages/${data.chatId}`, {
                headers: {
                    Authorization: "Bearer" + " " + currentUser.auth,
                }
            }).then(res => {
                console.log(res.data);
                props.setMess([...res.data])
                setDes(false)
            }).catch(err => {
                setDes(false)
            })
        }).catch(err => {
            setDes(false)
        })
    }


    return (
        <div className={s.input}>
            <form id='sender' onSubmit={text.trim() == '' || text == '' ? (e) => {e.preventDefault()} : handleSub} className={s.inp}>
                <input value={text} type="text" placeholder='Type something...' onChange={e => setText(e.target.value)} />
                <div className={s.send}>
                    <label htmlFor="file">
                        <ion-icon name="attach-outline"></ion-icon>
                    </label>
                    <input name='file' type="file" style={{ display: 'none' }} accept='application/*, text/* '  id='file' />
                    <input name='img' type="file" style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg" id='img' />
                    <label htmlFor="img">
                        <ion-icon name="images-outline"></ion-icon>
                    </label>
                    <span> </span>
                    <button disabled={des} type='submit' ><ion-icon name="send-outline"></ion-icon></button>
                </div>
            </form>
        </div>
    )
}