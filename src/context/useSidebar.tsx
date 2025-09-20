import { createContext, ReactNode, useContext, useState } from "react";

const sidebarContext = createContext({ isOpen: true, toggleSidebar: () => { } });


export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(prev => !prev);

    return <sidebarContext.Provider value={{ isOpen, toggleSidebar }}>{children}</sidebarContext.Provider>
}

export const useSidebar = () => useContext(sidebarContext)
