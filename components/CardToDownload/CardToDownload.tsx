import { forwardRef } from "react";
import Image from 'next/image'
import styles from './CardToDownload.module.css'
import cn from 'classnames'
import { ICard } from "@/interfaces/cardData";

export const CardToDownload = forwardRef((props:ICard, ref: any)=> {
    return (
        <div className={styles.wrapper}  ref={ref}>
        <div className={styles.cardPreview}>
            
            <Image className={styles.img} quality={100} src={props.img || '/no-image-large.jpg'} alt="Изображение" width={400} height={250}/>
            <p className={styles.viewname}>{props?.cardName}</p>
            <p className={styles.viewrange}>{props?.cardRange}</p>
            <p className={styles.viewdeck}>{props?.deck}</p>
            <p className={styles.viewpower} hidden={!props?.power}>C {props?.power}</p>
            <p className={styles.viewenergy} hidden={!props?.energy}>Э {props?.energy}</p>
            <p className={styles.viewaddcrit} hidden={!props?.addCrit}>К {props?.addCrit}</p>
            <p className={styles.viewaddpower} hidden={!props?.addPower}>С {props?.addPower}</p>
            <p className={styles.viewaddenergy} hidden={!props?.addEnergy}>Э {props?.addEnergy}</p>
            
            
            <p className={styles.viewdesc}>{props?.description}</p>
            
            <p className={cn(styles.viewfirstm,{
                [styles.viewsmall]: props?.firstmech?.length! > 3
            })} hidden={!props?.firstmech}>{props?.firstmech}</p>
            <p className={cn(styles.viewsecondm,{
                [styles.viewsmall]: props?.secondmech?.length! > 3
            })} hidden={!props?.secondmech}>{props?.secondmech}</p>
            <p className={cn(styles.viewthirdm,{
                [styles.viewsmall]: props?.thirdmech?.length! > 3
            })} hidden={!props?.thirdmech}>{props?.thirdmech}</p>
        </div>
        </div>
    )
})

CardToDownload.displayName = "CardToDownload"