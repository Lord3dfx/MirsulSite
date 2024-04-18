'use client'

import { TableProps } from "./Table.props";
import styles from './Table.module.css'
import { CardPreview } from "../CardPreview/CardPreview";


export function Table({update, cards, className, ...props}:TableProps) {


    return(
    <div className={styles.table} {...props}>
        {cards.map((item) => <CardPreview update={update}  key={item.id} id={item.id} name={item.cardName} type={item.status} />)}
    </div>
    )
}