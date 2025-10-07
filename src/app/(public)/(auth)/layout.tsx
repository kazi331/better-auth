import { authClient } from "@/lib/auth-client";
import { ReactNode, use } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const data = await authClient.listSessions();
    console.log(data)
    return children
}
