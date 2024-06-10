'use client'

import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css'
import Image from 'next/image';
import { useContext, useRef, useState} from "react";
import cn from "classnames";
import Switcher from "../Switcher/Switcher";
import { AppContext } from "@/context/app.context";
export function Sidebar({searchCards, className, ...props}:SidebarProps):JSX.Element {
    const [switcher, setSwitcher] = useState(0)
    const {theme} = useContext(AppContext)

    const myRef = useRef<HTMLInputElement>(null)

    function Clear(){
        myRef.current!.value = '';
        searchCards && searchCards(myRef.current!.value.toString());
    }

    function Switch(){
        setSwitcher(switcher => switcher === 0 ? 1 : 0)
        
    }

    return(
    <div className={cn(styles.sidebar,{
        [styles.opensidebar]: switcher === 1,
        [styles.darkbg]: theme === 'dark',
    })} {...props}>
        <Image src={"/Logo.jpg"} alt="logo" width={150} height={150}/>
        <a className={styles.newcard} href="/new">Добавить карту</a>
        <p style={{color: theme === 'dark' ? '#fff' : '#000'}}>Найти карту</p>
        <div className={styles.searchblock}>
        <input className={styles.search} ref={myRef} onChange={() =>searchCards && searchCards(myRef.current!.value.toString())} type="text" placeholder="Введите имя, тип и т.д..."/>
        <p className={styles.clear} onClick={Clear}>Очистить поиск</p>
        </div>
        <p style={{color: theme === 'dark' ? '#fff' : '#000'}}>Сортировка:</p>
        <div className={styles.sort}>
            <p>По названию</p>
            <p>По типу</p>
            <p>По дате создания</p>
        </div>
        <Switcher/>
        <p className={cn(styles.switcher,{
            [styles.show]: switcher === 1
        })} onClick={Switch}>{switcher === 0 ? '>>' : '<<'}</p>
    </div>
    )
}