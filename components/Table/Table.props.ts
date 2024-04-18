import { ICard } from "@/interfaces/cardData";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    cards: ICard[],
    update: () => void
}