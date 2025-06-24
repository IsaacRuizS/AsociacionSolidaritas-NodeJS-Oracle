'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const navItems = [
    { label: 'Consultas', href: '#' },
    { label: 'Estados de cuenta', href: '#' },
    { label: 'Ahorros', href: '/savings' },
    { label: 'Créditos', href: '#' },
    { label: 'Datos del Sistema', href: '#' },
    { label: 'Configuración', href: '#' },
];

export default function Sidebar({ children }: { children: ReactNode }) {

    const pathname = usePathname();

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r flex flex-col justify-between">
                <div>
                    <div className="px-6 py-4 border-b">
                        <span className="text-xl font-bold text-[#6D1D3C]">Aso Devs</span>
                    </div>
                    <nav className="mt-4 px-2">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={`px-4 py-2 rounded cursor-pointer mb-1 ${pathname === item.href
                                            ? 'bg-gray-100 font-semibold text-[#6D1D3C]'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="px-4 py-4 border-t text-sm text-gray-600">
                    <button className="hover:underline text-red-600">Cerrar sesión</button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </div>
    );
}
