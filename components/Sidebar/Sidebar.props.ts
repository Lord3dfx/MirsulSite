import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    searchCards?: (param:string) => void,
    sortCards?: (param:string, search?:string, sortParams?:string) => void
}