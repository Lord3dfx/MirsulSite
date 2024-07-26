'use client'

import { CardEditorProps } from "./CardEditor.props";
import styles from './CardEditor.module.css'
import { cardapi } from "@/api/cardapi";
import {  useContext, useEffect, useRef, useState } from "react";
import { ICard } from "@/interfaces/cardData";
import Image from 'next/image'
import cn from "classnames"




export function CardEditor({id ,className, ...props}:CardEditorProps) {

    const [card, setCard] = useState<ICard | null>(null)
    const [showNote, setShowNote] = useState<boolean>(false)
    const myRef = useRef<HTMLParagraphElement>(null)
    const [theme, setTheme] = useState<string | null>(null)
    

    useEffect(()=> {
        const theme = localStorage.getItem('theme')
        setTheme(theme)
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

    const writeCard = (e:any) =>{
   
        const updateCard:ICard = {...card, [e.name]: e.value}
        setCard(updateCard)
    }

    const sendCard = async () => {
        if(card !== null){
        if(!card?.id){
            const res = await cardapi.createCard(card!)
            const rescard:Promise<ICard> = await res.json()
            
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
else{
    ShowNote('Заполните хотя бы одно поле', '#ff4a3d')
    return;
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
            const updatecard = {...card, img: reader.result as string}
            setCard(updatecard)
        }
    }

    return(
    <div className={cn(styles.wrapper,{
        [styles.darkbg]: theme === 'dark',
    })}>
        <p ref={myRef} className={cn(styles.note,{
                [styles.show]: showNote,
                [styles.hide]: !showNote,
            })}></p>
        <div className={styles.cardPreview}>
            
            <Image className={styles.img} quality={50} src={card?.img || '/no-image-large.jpg'} alt="Изображение" width={400} height={250}/>
            <p className={styles.viewname}>{card?.cardName}</p>
            <p className={styles.viewrange}>{card?.cardRange}</p>
            <p className={styles.viewdeck}>{card?.deck}</p>
            <p className={styles.viewpower} hidden={!card?.power}>C {card?.power}</p>
            <p className={styles.viewenergy} hidden={!card?.energy}>Э {card?.energy}</p>
            <p className={styles.viewaddcrit} hidden={!card?.addCrit}>К {card?.addCrit}</p>
            <p className={styles.viewaddpower} hidden={!card?.addPower}>С {card?.addPower}</p>
            <p className={styles.viewaddenergy} hidden={!card?.addEnergy}>Э {card?.addEnergy}</p>
            
            
            <p className={styles.viewdesc}>{card?.description}</p>
            
            <p className={cn(styles.viewfirstm,{
                [styles.viewsmall]: card?.firstmech?.length! > 3
            })} hidden={!card?.firstmech}>{card?.firstmech}</p>
            <p className={cn(styles.viewsecondm,{
                [styles.viewsmall]: card?.secondmech?.length! > 3
            })} hidden={!card?.secondmech}>{card?.secondmech}</p>
            <p className={cn(styles.viewthirdm,{
                [styles.viewsmall]: card?.thirdmech?.length! > 3
            })} hidden={!card?.thirdmech}>{card?.thirdmech}</p>
            <p className={cn(styles.viewid,{
                [styles.darktext]: theme === 'dark'
            })}>ID карты: {card?.id}</p>
            
        </div>
        <div className={cn(styles.cardeditor,{
            [styles.darktheme]: theme === 'dark'
        })}>
                <div>
                <p>Имя карты</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="cardName" defaultValue={card?.cardName} size={40}/>
                <p>Ранг карты</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="cardRange" defaultValue={card?.cardRange} size={40}/>
                <p>Принадлежность колоде</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="deck" defaultValue={card?.deck} size={40}/>
                <p>Описание</p>
                <textarea onChange={(e)=>writeCard(e.target)} rows={10} cols={38} wrap="soft" className={styles.texta} name="description" defaultValue={card?.description}/>
                </div>

                <div>
                <p>Стоимость</p>
                <p>С</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="power" defaultValue={card?.power} size={2}/>
                <p>Э</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="energy" defaultValue={card?.energy} size={2}/>
                <p>Дополнительная стоимость</p>
                <p>К</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="addCrit"  size={2} defaultValue={card?.addCrit}/>
                <p>С</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="addPower"  size={2} defaultValue={card?.addPower}/>
                <p>Э</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="addEnergy"  size={2} defaultValue={card?.addEnergy}/>
                </div>

                <div>
                <p>Механики</p>
                <p>1</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="firstmech" defaultValue={card?.firstmech}/>
                <p>2</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="secondmech" defaultValue={card?.secondmech}/>
                <p>3</p>
                <input onChange={(e)=>writeCard(e.target)} type="text" name="thirdmech" defaultValue={card?.thirdmech}/>
                </div>

                <div>
                
                </div>

                <div className={styles.upload}>
                <p>Загрузить изображение</p>
                <input type="file" accept="image/*" name="imageload" onChange={(e)=>loadImage(e)} ></input>
                </div>
            <div className={styles.buttons}>
            <button className={styles.sbutton} onClick={ () => sendCard()}>Сохранить</button>
            <a className={styles.cbutton} href={`/`}>Назад</a>
            </div>
        </div>
    </div>
    )
}