"use client";
import { useEffect } from "react";
interface SidebarProps {
    sidebarItems?: React.ReactNode[];
    sidebarButton?: React.ReactNode;
    children?: React.ReactNode;
}

export function Sidebar({sidebarItems, sidebarButton, children}: SidebarProps) {

    return (
        <aside className="drawer lg:drawer-open">
            <input id="my-drawer-2" className="drawer-toggle" type="checkbox" />
            <div className="drawer-content">
                {sidebarButton}
                <div className="min-h-screen min-w-screen flex items-start justify-start p-5">
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="flex items-center mt-40 lg:mt-5 lg:ml-5">
                    <ul className="menu rounded-lg shadow-lg bg-zinc-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 text-gray-800 font-medium">
                        {sidebarItems?.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}