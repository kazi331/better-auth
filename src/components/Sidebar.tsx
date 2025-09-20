"use client"
import { useSidebar } from "@/context";
import { sidebarCollapsedWidth, sidebarExpandedWidth } from "@/lib";
import { Files, Home, SidebarClose, SidebarOpen, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const sidebarItems = [
    { name: 'Home', link: '/', icon: <Home /> },
    { name: "Posts", link: '/posts', icon: <Files /> },
    { name: "Users", link: '/users', icon: <Users /> },
    // { name: "Settings", link: '/settings', icon: <Settings /> },
    // { name: "Profile", link: '/profile', icon: <User /> },
]


export default function Sidebar() {
    const { isOpen, toggleSidebar } = useSidebar();
    const pathname = usePathname();
    return (
        <nav className={`fixed top-0 left-0 h-full bg-gray-800 backdrop-blur text-white overflow- z-10 transition-all ${isOpen ? sidebarExpandedWidth : sidebarCollapsedWidth}`}>
            <div className="relative">
                <div className="py-4 w-full overflow-hidden">
                    <Link href="/" className={`text-2xl font-bold block px-4 ml-10 ${isOpen ? "block" : "invisible"}`}>
                        Dashboard
                    </Link>
                    <button className="absolute top-1/2 -translate-y-1/2 left-3 bg-gray-700 backdrop-blur-2xl p-2 rounded-full shadow-lg cursor-pointer" onClick={toggleSidebar}>
                        {isOpen ? <SidebarClose className="size-5" /> : <SidebarOpen className="size-5" />}
                    </button>
                </div>
            </div>

            <div className={`mb-8 text-2xl font-bold flex flex-col gap-2 ${isOpen ? '' : 'mx-2'}`}>
                {sidebarItems.map(item => (<Link key={item.name} href={item.link}>
                    <div className={`flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer ${isOpen ? "justify-start border-l-2 px-3.5" : "justify-start "} ${pathname === item.link ? "border-l-white" : "border-transparent"} ${pathname === item.link ? "bg-gray-700" : ""}`}>
                        <span className="size-6"> {item.icon}</span>
                        <span className={`text-sm ${isOpen ? "block" : "hidden"}`}>{item.name}</span>
                    </div>
                </Link>))}
            </div>
        </nav>
    )
}
