import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import s from './Input.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router'
import FormData from 'form-data'
import { and } from 'firebase/firestore'

export const Input = (props) => {


    const [text, setText] = useState('')
    const [file, setF] = useState(null)
    const [img, setI] = useState(null)
    const [des, setDes] = useState(false)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSub = async (e) => {
        e.preventDefault()
        setDes(true)
        const form = document.querySelector('#sender')
        const i1 = document.querySelector('#file')
        const i2 = document.querySelector('#img')
        const fd = new FormData(form)
        fd.append('text', text)
        fd.append('sender', currentUser.user_id)
        fd.append('fileName', e.target[1].files[0]?.name)

        axios.post(process.env.REACT_APP_API_ADRES + `api/v1/messages/${data.chatId}`, fd, {
            headers: {
                Authorization: "Bearer" + " " + currentUser.auth,
            }
        }).then(res => {
            setText('')
            axios.get(process.env.REACT_APP_API_ADRES + `api/v1/messages/${data.chatId}`, {
                headers: {
                    Authorization: "Bearer" + " " + currentUser.auth,
                }
            }).then(res => {
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
        <div className={s.input }>
            <form id='sender' onSubmit={text.trim() == '' & img & file == null || text == '' & img & file == null   ? (e) => {e.preventDefault()} : handleSub} className={s.inp}>
                <input value={text} type="text" placeholder='Type something...' onChange={e => setText(e.target.value)} />
                <div className={s.send}>
                    <label htmlFor="file">
                        <ion-icon name="attach-outline"></ion-icon>
                    </label>
                    <input onChange={e => setF(e.target.files[0])} name='file' type="file" style={{ display: 'none' }} accept='application/*, text/* '  id='file' />
                    <input onChange={e => setI(e.target.files[0])} name='img' type="file" style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg" id='img' />
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