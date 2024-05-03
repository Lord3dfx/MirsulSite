'use client'

import { CardEditorProps } from "./CardEditor.props";
import styles from './CardEditor.module.css'
import { cardapi } from "@/api/cardapi";
import {  useEffect, useRef, useState } from "react";
import { ICard } from "@/interfaces/cardData";
import Image from 'next/image'
import cn from "classnames"



export function CardEditor({id ,className, ...props}:CardEditorProps) {

    const [card, setCard] = useState<ICard | null>(null)
    const [loadedimage, setLoadedimage] = useState<string>("")
    const [showNote, setShowNote] = useState<boolean>(false)
    const myRef = useRef<HTMLParagraphElement>(null)

    useEffect(()=> {
        if(!id)
            {
                setCard(null)
            }
            else{
        const getCard = async (id:string)=>{
            const card = await cardapi.getCardByID(id)
            setCard(card)
            return ()=>{
                setCard(null)
            }
        }

        getCard(id);
    }
    },[id])

    const writeCard = (e:HTMLInputElement) =>{
        const updateCard:ICard = {...card, [e.name]: e.value}
        setCard(updateCard)
    }

    const sendCard = async () => {
        if(!card?.id){
            const res = await cardapi.createCard(card!)
            const rescard:Promise<ICard> =await res.json()
            
            if(res.status === 200){
                ShowNote('Карта успешно создана', '#47ff6c')
                setCard({...card, id: (await rescard).id})
            }
            else{
                ShowNote('Что-то пошло не так...', '#ff4a3d')
            }
        }
        else{
            const res =await cardapi.saveCard(card.id, card!)
            if(res.status === 204){
                ShowNote('Карта сохранена', '#47ff6c')
            }
            else{
                ShowNote('Что-то пошло не так...', '#ff4a3d')
            }
    }
    }

    const ShowNote = (text:string, color:string) =>{
        setShowNote(showNote => !showNote)
        if(!myRef.current)
            {
                return null
            }
            else{
                myRef.current.textContent = text
                myRef.current.style.background =  color;
            }
        
        setTimeout(()=>{
            setShowNote(showNote => !showNote)
        },3000)
    }

    const loadImage = (e:any) =>{
        const pic = e.target.files[0]
        if(!pic)
            {
                return null
            }
        const reader = new FileReader()
        reader.readAsDataURL(pic)
        reader.onload = ()=>{
            setLoadedimage(reader.result as string)
        }
    }

    return(
    <div className={styles.wrapper} {...props}>
        <div className={styles.cardPreview}>
            <p ref={myRef} className={cn(styles.note,{
                [styles.show]: showNote,
                [styles.hide]: !showNote
            })}></p>
            <Image className={styles.img} src={loadedimage || '/image.jpg'} alt="Изображение" width={300} height={200}/>
            <p>{card?.cardName}</p>
            <p>{card?.status}</p>
            <p>{card?.id}</p>
            
        </div>
        <div className={styles.cardeditor}>
            <form className={styles.cardform}>
                <p>Имя карты</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="cardName" defaultValue={card?.cardName}/>
                <p>Статус</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="status" defaultValue={card?.status}/>
                <p>Описание</p>
                <textarea rows={10} cols={45} wrap="soft" className={styles.texta}/>
                <p>1</p>
                <input type="text"/>
                <p>2</p>
                <input type="text"/>
                <p>Редкость</p>
                <input type="text"/>
                <div className={styles.upload}>
                <p>Загрузить изображение</p>
                <input type="file" accept="image/*" name="imageload" onChange={(e)=>loadImage(e)} ></input>
                </div>
            </form>
            <div className={styles.buttons}>
            <a className={styles.sbutton} onClick={sendCard}>Сохранить</a>
            <a className={styles.cbutton} href={`/`}>Назад</a>
            </div>
        </div>
    </div>
    )
}