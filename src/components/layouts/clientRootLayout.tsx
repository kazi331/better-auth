'use client'
import { SidebarProvider } from '@/context';
import { ChildrenProp } from '@/types';

export default function ClientRootLayout({ children }: ChildrenProp) {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}
