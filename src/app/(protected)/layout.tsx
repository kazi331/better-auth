"use client"
import Navigation from "@/components/shared/Navigation";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context";
import { collapsedMarginLeft, expandedMarginLeft, useSession } from "@/lib";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const { data, error, isPending, refetch } = useSession();
    console.log('Protected layout', data?.user?.name)

    const { isOpen } = useSidebar();

    useEffect(() => {
        if (!data?.user && !isPending) {
            return router.push("/login")
        }
    }, [isPending, data])
    if (isPending) {
        return <div>Loading....</div>
    }
    if (!data?.session) return null;
    return (
        <div className="min-h-full">
            <Sidebar />
            <main className={`flex-1 min-h-screen transition-all ${isOpen ? expandedMarginLeft : collapsedMarginLeft}`}>
                <Navigation />
                {children}
            </main>
        </div>
    )
}
