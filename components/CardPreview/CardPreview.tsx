'use client'

import { CardPreviewProps } from "./CardPreview.props";
import styles from './CardPreview.module.css'
import  Image  from "next/image"
import Link from "next/link";
import { cardapi } from "@/api/cardapi";
import Edit from '@/public/edit.svg'
import Delete from '@/public/delete.svg'
import { AppContext } from "@/context/app.context";
import { useContext } from "react";
import cn from "classnames";

export function CardPreview({update, id, img, name, deck ,className, ...props}:CardPreviewProps):JSX.Element {

    const {theme} = useContext(AppContext)

    const deleteCard = (id:string) =>{
        cardapi.deleteCard(id).then(() => update())
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
        <Link href={`/edit/${id}`}><p className={styles.edit}><Edit/></p></Link>
        <p className={styles.delete} onClick={() => deleteCard(id!)}><Delete/></p>
        </div>
    </div>
    )
}