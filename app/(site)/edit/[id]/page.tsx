import { cardapi } from "@/api/cardapi";
import { CardEditor } from "@/components";
import { ICard } from "@/interfaces/cardData";

export async function generateStaticParams(){
    const cards = await cardapi.getAllCards();
    return cards.map((card:ICard) => ({id: card?.id?.toString()}))
}

export default function CardEdit({params}: {params: { id: string }}):JSX.Element {


    return (
       <CardEditor id={params.id}/>
    )
}