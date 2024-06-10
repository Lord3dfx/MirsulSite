'use client'

import { TableProps } from "./Table.props";
import styles from './Table.module.css'
import { CardPreview } from "../CardPreview/CardPreview";
import { ICard } from "@/interfaces/cardData";
import { useContext } from "react";
import { AppContext } from "@/context/app.context";
import cn from "classnames";

export function Table({update, cards, className, ...props}:TableProps) {

    const {theme} = useContext(AppContext)

    function showCards(cards:ICard[]) {
        if(cards.length > 0)
            return(
                <div className={cn(styles.table,{
                    [styles.darktable]: theme === 'dark'
                })} {...props}>
        {cards.map((item) => <CardPreview update={update}  key={item.id} id={item.id} img={item.img} name={item.cardName} deck={item.deck} />)}
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