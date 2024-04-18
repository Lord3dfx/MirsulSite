'use client'

import { CardPreviewProps } from "./CardPreview.props";
import styles from './CardPreview.module.css'
import  Image  from "next/image"
import Link from "next/link";
import { cardapi } from "@/api/cardapi";


export function CardPreview({update, id, name, type ,className, ...props}:CardPreviewProps):JSX.Element {

    const deleteCard = (id:string) =>{
        cardapi.deleteCard(id).then(() => update())
    }

    return(
    <div className={styles.card} {...props}>
        <Image src="/image.jpg" alt={name || ''} width={320} height={200}/>
        <p>{name}</p>
        <p>{type}</p>
        <div className={styles.editblock}>
            <p><Link href={`/edit/${id}`}>Edit</Link></p>
            <hr />
            <p onClick={() => deleteCard(id!)}>Del</p>
        </div>
    </div>
    )
}