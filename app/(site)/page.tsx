'use client'

import { cardapi } from "@/api/cardapi";
import { ICard } from "@/interfaces/cardData";
import { useEffect, useState } from "react";

import { AppContextProvider } from "@/context/app.context";
import { Wrapper } from "@/components";





export default function Home() {
const [cards, setCards] = useState<ICard[]>([])
const [filter, setFilter] = useState<ICard[]>([])


const fetchData = async () => {
  const data:ICard[] = await cardapi.getAllCards()
  if(filter.length === 0)
    {
      setFilter(data)
      setCards(data)
    }
    else{
      setCards(data)
      const filtereditems = data.map((item) => {
        return filter.filter(filteriel => filteriel.id === item.id)[0]
      }).filter(item => item !== undefined)
      setFilter(filtereditems)
    }
}


useEffect(() => {
  fetchData()
},[])

 function searchCards(param:string){
      const sparams = param.toLocaleLowerCase()
      const cardArray = cards.filter( (item) => item.cardName?.toLocaleLowerCase().includes(sparams) || item.deck?.toLocaleLowerCase().includes(sparams) )
          setFilter(cardArray)
  }

  return(
    <AppContextProvider>
    <Wrapper cards={cards} fetchData={fetchData} searchCards={searchCards} filter={filter}/>
    </AppContextProvider>
  )
}
