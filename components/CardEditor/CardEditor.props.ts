import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CardEditorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    id?: string,
}