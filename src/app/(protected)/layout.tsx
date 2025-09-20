"use client"
import Navigation from "@/components/shared/Navigation";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/useSidebar";
import { collapsedMarginLeft, expandedMarginLeft } from "@/lib";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    const { isOpen } = useSidebar();
    return (
        <SidebarProvider>
            <div className="min-h-full">
                <Sidebar />
                <main className={`flex-1 min-h-screen transition-all ${isOpen ? expandedMarginLeft : collapsedMarginLeft}`}>
                    <Navigation />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
