'use client'

import { createContext, useEffect, useState } from "react"

export const AppContext = createContext({theme: 'light', toggleTheme: ()=>{}})

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<any>('light')

    useEffect(() => {
        setTheme(localStorage.getItem("theme") || 'light')
    },[])

    const toggleTheme = () => {
        if (localStorage.getItem("theme") === "light") {
            localStorage.setItem("theme", "dark")
            setTheme("dark")
          } else {
            localStorage.setItem("theme", "light")
            setTheme("light")
          }
    }

    return <AppContext.Provider value={{theme, toggleTheme}}>{children}</AppContext.Provider>
}