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
            <div className="drawer-content flex items-center">
                {sidebarButton}
                <div className="drawer-content min-h-screen min-w-screen flex items-start justify-start p-5">
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="flex items-center mt-5 ml-5 ">
                    <ul className="menu min-h-fit rounded-lg shadow-lg bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 text-gray-200 font-medium">
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