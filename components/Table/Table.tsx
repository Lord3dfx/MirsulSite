'use client'

import { TableProps } from "./Table.props";
import styles from './Table.module.css'
import { CardPreview } from "../CardPreview/CardPreview";
import { ICard } from "@/interfaces/cardData";


export function Table({update, cards, className, ...props}:TableProps) {

    function showCards(cards:ICard[]) {
        if(cards.length > 0)
            return(
                <div className={styles.table} {...props}>
        {cards.map((item) => <CardPreview update={update}  key={item.id} id={item.id} name={item.cardName} type={item.deck} />)}
                </div>
            )
            else
                return(
                <div className={styles.notfound}>
                    <p >Ничего не найдено...</p>
                   </div>)
                
            
    }

    return(
        showCards(cards)
    )
}