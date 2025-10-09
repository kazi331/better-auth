import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const res = await auth.api.getSession({
        headers: {}
    })
    console.log
    const data = await authClient.listSessions();
    console.log(data)
    return children
}
