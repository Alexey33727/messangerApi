import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import s from './Navigate.module.css'

export const Navigate = (props) => {
    const { currentUser } = useContext(AuthContext)

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
                <img style={{ margin: '8px 0 0 0' }} src={'https://alexey1242.pythonanywhere.com/'+currentUser.user_photo} alt="" />
                {/* <input onChange={e => handleChange(e)} style={{ display: 'none' }} id='ava' type="file" accept='image/gif, image/png, image/jpeg' /> */}
            </div>
        </nav>
    )
}