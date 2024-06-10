'use client'

import { useContext, useEffect, useState } from 'react'
import styles from './Switcher.module.css'
import cn from 'classnames'
import { AppContext } from '@/context/app.context'
export default function Switcher() {

    const {theme, toggleTheme} = useContext(AppContext)

    const [switcher, setSwitcher] = useState(0)

    useEffect(() => {
        setSwitcher(theme === 'dark' ? 1 : 0)
    },[theme])

    const toggle = () =>{
            toggleTheme()
            console.log(theme + " " + switcher)
    }

    return (
        <div className={cn(styles.wrapper,{
            [styles.wrapperdark]: switcher === 1
        })}onClick={toggle}>
         
                <p className={cn(styles.switcher,{
                    [styles.switcherdark]: switcher === 1
                })} ></p>

        </div>
    )
}