'use client'

import { CardPreviewProps } from "./CardPreview.props";
import styles from './CardPreview.module.css'
import  Image  from "next/image"
import Link from "next/link";
import { cardapi } from "@/api/cardapi";
import Edit from '@/public/edit.svg'
import Delete from '@/public/delete.svg'
import Download from '@/public/download.svg'
import { AppContext } from "@/context/app.context";
import { useContext, useRef } from "react";
import cn from "classnames";
import { CardToDownload } from "../CardToDownload/CardToDownload";
import html2canvas from 'html2canvas';
import { renderToString } from "react-dom/server";



export function CardPreview({update, id, img, name, deck ,className, ...props}:CardPreviewProps):JSX.Element {

    const {theme} = useContext(AppContext)

    const deleteCard = (id:string) =>{
        cardapi.deleteCard(id).then(() => update())
    }

    const DownloadCard = async ()=>{
    const card = await cardapi.getCardByID(id!)
    const wrapper = document.createElement("div");
    wrapper.style.width = "450px"
    const output = document.body.appendChild(wrapper);
    const downloadCard = renderToString(<CardToDownload {...card}/>)
    output.innerHTML = downloadCard
    const canvas = await html2canvas(output);
    const data = canvas.toDataURL('image/jpg')
    const link = document.createElement('a');

    link.href = data;
    link.download = `card-${id}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    document.body.removeChild(wrapper);
    }

    return(
    <div className={styles.card} {...props}>
         
        <Image quality={50} src={img || '/no-image-small.jpg'} alt={name || ''} width={320} height={200}/>
        <p className={cn(styles.cname,{
            [styles.darktext]: theme === 'dark'
        })}>{name}</p>
        <p className={cn(styles.cdeck,{
            [styles.darktext]: theme === 'dark'
        })}>{deck}</p>
        <div className={styles.editblock}>
        <Link href={`/edit/${id}`}><p className={styles.edit} title="Редактировать карту"><Edit/></p></Link>
        <p className={styles.delete} onClick={() => deleteCard(id!)} title="Удалить карту"><Delete/></p>
        </div>
        <button onClick={DownloadCard} className={styles.download} title="Загрузить карту"><Download/></button>
    </div>
    )
}