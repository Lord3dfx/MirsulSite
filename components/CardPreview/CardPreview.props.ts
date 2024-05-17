import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CardPreviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    name?: string,
    deck?: string,
    img?: string,
    id?: string,
    update: () => void
}