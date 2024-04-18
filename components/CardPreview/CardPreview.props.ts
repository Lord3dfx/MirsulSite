import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CardPreviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    name?: string,
    type?: string,
    img?: string,
    id?: string,
    update: () => void
}