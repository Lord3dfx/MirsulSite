import { CardEditor } from "@/components";

export default function CardEdit({params}: {params: { id: string }}):JSX.Element {

    return (
       <CardEditor id={params.id}/>
    )
}