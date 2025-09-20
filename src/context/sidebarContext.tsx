import { createContext, ReactNode, useContext, useState } from "react";

const initialState = {
    isOpen: true,
    toggleSidebar: () => { }
}

const sidebarContext = createContext(initialState);


export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(initialState.isOpen);
    const toggleSidebar = () => setIsOpen(prev => !prev);

    return <sidebarContext.Provider value={{ isOpen, toggleSidebar }}>{children}</sidebarContext.Provider>
}

export const useSidebar = () => useContext(sidebarContext)
