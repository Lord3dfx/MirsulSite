import Loading from "@/app/(site)/loading";
import { Sidebar } from "../Sidebar/Sidebar";
import { Table } from "../Table/Table";
import styles from './Wrapper.module.css'
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "@/context/app.context";
import { WrapperProps } from "./Wrapper.props";

export function Wrapper({cards, fetchData, searchCards, filter}:WrapperProps):JSX.Element {

    const {theme} = useContext(AppContext)

    return(
    <div className={cn(styles.wrapper,{
        [styles.darkwrapper]: theme === 'dark'
      })}>
        <Sidebar searchCards={searchCards}/>
        {cards.length > 0 
          ? <Table cards={filter} update={fetchData}/>
          : <Loading/>}
      </div>
      )
        }