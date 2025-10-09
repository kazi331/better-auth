'use client'

import { useSession } from "@/lib";
import { ChildrenProp } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({ children }: ChildrenProp) {
    const router = useRouter()
    const { data, error, isPending, refetch } = useSession();
    console.log('public layout', data?.user?.name)
    useEffect(() => {
        if (!isPending && data?.session) {
            return router.push("/")
        }
    }, [])
    if (isPending) {
        return <div>Loading...</div>
    } else {
        return children
    }
}
