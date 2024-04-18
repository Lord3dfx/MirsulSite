'use client'

import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css'
import SearchIcon from '@/public/search.svg';
import Image from 'next/image';
import { useRef} from "react";
export function Sidebar({searchCards, className, ...props}:SidebarProps):JSX.Element {

    const myRef = useRef<HTMLInputElement>(null)

    return(
    <div className={styles.sidebar} {...props}>
        <Image src={"/Logo.jpg"} alt="logo" width={150} height={150}/>
        <a className={styles.newcard} href="/new">Добавить карту</a>
        <p>Найти карту</p>
        <div className={styles.searchblock}>
        <input ref={myRef} onChange={() =>searchCards && searchCards(myRef.current!.value.toString())} type="text" placeholder="Введите имя, тип и т.д..."/>
        <SearchIcon className={styles.search} />
        </div>
        <p>Сортировка:</p>
        <div className={styles.sort}>
            <p>По названию</p>
            <p>По типу</p>
            <p>По дате создания</p>
        </div>
    </div>
    )
}