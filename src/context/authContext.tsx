import { useSession } from "@/lib";
import { createContext, ReactNode, useContext } from "react";

const authContext = createContext({});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data, error, isPending, refetch } = useSession();
    return <authContext.Provider value={{ data, error, isPending, refetch }}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext);