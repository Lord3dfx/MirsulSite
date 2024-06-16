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

  function sortCards(param:string, search?:string, sortParams?:string){
    let cardArray = [...filter]
    if(sortParams === 'asc'){switch(param){
      case 'byname':
        cardArray.sort((a,b) => a.cardName&&b.cardName ? a.cardName!.localeCompare(b.cardName!) : -1);
        break;

      case 'bydeck':
        cardArray.sort((a,b) => a.deck&&b.deck ? a.deck!.localeCompare(b.deck!) : -1);
        break;

      case 'byrange':
        cardArray.sort((a,b) => a.cardRange&&b.cardRange ? a.cardRange!.localeCompare(b.cardRange!) : -1);
        break;
    }
    setFilter([...cardArray])
  }
  if(sortParams === 'desc'){
    switch(param){
    case 'byname':
      cardArray.sort((a,b) => a.cardName&&b.cardName ? b.cardName!.localeCompare(a.cardName!) : 1);
      break;

    case 'bydeck':
      cardArray.sort((a,b) => a.deck&&b.deck ? b.deck!.localeCompare(a.deck!) : 1);
      break;

    case 'byrange':
      cardArray.sort((a,b) => a.cardRange&&b.cardRange ? b.cardRange!.localeCompare(a.cardRange!) : 1);
      break;

    case 'none':
      if(search){
        searchCards(search)
      }
      else{
        cardArray = [...cards]
      }
      break;
  }
  setFilter([...cardArray])
}}

  return(
    <AppContextProvider>
    <Wrapper cards={cards} fetchData={fetchData} searchCards={searchCards} filter={filter} sortCards={sortCards}/>
    </AppContextProvider>
  )
}
