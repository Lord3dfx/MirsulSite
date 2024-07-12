import { api } from "@/helpers/api";
import { ICard} from "@/interfaces/cardData";

export const cardapi = {
    getAllCards: async ():Promise<ICard[]> => {
        const res = await fetch(api.getAllCards, {
            next: { revalidate: 0},
        });
        return res.json()
    },

    getCardByID: async (id:string):Promise<ICard | null> => {
        const res = await fetch(api.getAllCards + id);
        if(!res.ok){
            return null
        }
        return res.json()
    },

    createCard: async (card:ICard) => {
        const res = await fetch(api.getAllCards, {
            method: 'POST',
            body: JSON.stringify(card),
            headers: {
                'Content-type': 'application/json',
            },
            
        });
        return res.json()
    },

    saveCard: async (id:string, card:ICard) => {
        const res = await fetch(api.getAllCards + id, {
            method: 'PUT',
            body: JSON.stringify(card),
            headers: {
                'Content-type': 'application/json',
            },
            
        });
        return res.json()
    },

    deleteCard: async (id:string) => {
        const res = await fetch(api.getAllCards + id, {
            method: 'DELETE',
        });
        
    }
}