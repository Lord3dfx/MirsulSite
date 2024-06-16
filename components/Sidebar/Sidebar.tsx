'use client'

import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css'
import Image from 'next/image';
import { useContext, useEffect, useRef, useState} from "react";
import cn from "classnames";
import Switcher from "../Switcher/Switcher";
import { AppContext } from "@/context/app.context";
export function Sidebar({searchCards, sortCards, className, ...props}:SidebarProps):JSX.Element {
    const [switcher, setSwitcher] = useState(0)
    const[sortParams, setSortParams] = useState({
        type: 'none',
        search: 'asc'
    })
    let {theme} = useContext(AppContext)

    const myRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        sortCards && sortCards(sortParams.type, myRef.current!.value.toString(), sortParams.search)
    },[sortParams])

    function Clear(){
        myRef.current!.value = '';
        searchCards && searchCards(myRef.current!.value.toString());
        sortParams.type = 'none';
    }

    function getSearchParam(){
        searchCards && searchCards(myRef.current!.value.toString());
        
    }

    function SwitchTheme(){
        setSwitcher(switcher => switcher === 0 ? 1 : 0)
    }

   async function sorting(e:any){
        if(sortParams.search == 'asc'){
            if(e.target.name == sortParams.type){
                setSortParams({type: e.target.name, search: 'desc'})
               
            }
            if(e.target.name != sortParams.type){
                setSortParams({type: e.target.name, search: 'asc'})
               
            } 
        }
        if(sortParams.search == 'desc'){
            if(e.target.name == sortParams.type){
                setSortParams({type: 'none', search: 'desc'})
                
            }
            if(e.target.name != sortParams.type){
                setSortParams({type: e.target.name, search: 'asc'})
                
            }
        }
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
        <input className={styles.search} ref={myRef} onChange={() =>getSearchParam()} type="text" placeholder="Введите имя, тип и т.д..."/>
        <button className={styles.clear} onClick={Clear}>Очистить поиск</button>
        </div>
        <p style={{color: theme === 'dark' ? '#fff' : '#000'}}>Сортировка:</p>
        <div className={styles.sort}>
            <button name="byname" onClick={(e) =>sorting(e)} className={cn(styles.byname,{
                [styles.activeasc]: sortParams.type === 'byname' && sortParams.search === 'asc',
                [styles.activedesc]: sortParams.type === 'byname' && sortParams.search === 'desc'
            })}>По названию</button>
            <button name="bydeck" onClick={(e) =>sorting(e)} className={cn(styles.bydeck,{
                [styles.activeasc]: sortParams.type === 'bydeck' && sortParams.search === 'asc',
                [styles.activedesc]: sortParams.type === 'bydeck' && sortParams.search === 'desc'
            })}>По колоде</button>
            <button name="byrange" onClick={(e) =>sorting(e)} className={cn(styles.byrange,{
                [styles.activeasc]: sortParams.type === 'byrange' && sortParams.search === 'asc',
                [styles.activedesc]: sortParams.type === 'byrange' && sortParams.search === 'desc'
            })}>По рангу</button>
        </div>
        <Switcher/>
        <p className={cn(styles.switcher,{
            [styles.show]: switcher === 1
        })} onClick={SwitchTheme}>{switcher === 0 ? '>>' : '<<'}</p>
    </div>
    )
}