import { ICard } from "@/interfaces/cardData";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface WrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    cards: ICard[],
    fetchData: () => void,
    searchCards: (param:string) => void,
    filter: ICard[],
    sortCards: (param:string, search?:string, sortParams?:string) => void
}