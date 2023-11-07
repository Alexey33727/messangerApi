import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { toast, Toaster } from 'react-hot-toast';
import s from './Navigate.module.css'
import axios from 'axios';

export const Navigate = (props) => {
    const { currentUser } = useContext(AuthContext)
    // const [name, sName] = useState(currentUser.user_name)

    const handleChange = async (e) => {
        let name = prompt('Enter your new name')
        const fd = new FormData()
        fd.append('photo', e.target.files[0])
        fd.append('username', name)
        fd.append('id', currentUser.user_id)
        
        axios.post(process.env.REACT_APP_API_ADRES + `api/v1/update/avaorusername`, fd, {
            headers: {
                Authorization: "Bearer" + " " + currentUser.auth,
            }
        }).then(res => {
            
        })
    }

    return (
        <nav className={!props.act ? s.Nav : s.navigate}>
            <span className={s.logo}>Life Chat</span>
            <div>
                {/* <samp className={s.ion}><ion-icon name="chatbubbles-outline"></ion-icon></samp>
                <samp className={s.ion}><ion-icon name="settings-outline"></ion-icon></samp> */}
                {/* <samp onClick={() => {
                    axios.get('https://alexey1242.pythonanywhere.com/api/v1/logout')
                }} className={s.ion + ' ' + s.at}><ion-icon name="enter-outline"></ion-icon></samp> */}
                <span></span>
                <label htmlFor="ava"><img style={{ margin: '8px 0 0 0' }} src={process.env.REACT_APP_API_ADRES + currentUser.user_photo} alt="" /></label>
                
                <input onChange={e => handleChange(e)} style={{ display: 'none' }} id='ava' type="file" accept='image/gif, image/png, image/jpeg' />
            </div>
        </nav>
    )
}