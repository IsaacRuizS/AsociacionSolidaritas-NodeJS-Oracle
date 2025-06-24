'use client';

import { useEffect, useState } from 'react';

const mockData = [
    { id: 1, descripcion: 'Ahorro Moto', objetivo: 1000000, siguiente: 20000, interes: '6%', plazo: '12/01/2026' },
    { id: 2, descripcion: 'Ahorro Carro', objetivo: 1000000, siguiente: 20000, interes: '5%', plazo: '12/01/2026' },
    { id: 3, descripcion: 'Ahorro Navideño', objetivo: 900000, siguiente: 10000, interes: '4%', plazo: '12/01/2026' },
    { id: 4, descripcion: 'Marchamo', objetivo: 900000, siguiente: 10000, interes: '4%', plazo: '12/01/2026' },
];

export function useSaving() {
    const [savings, setSavings] = useState(mockData);
    const [tab, setTab] = useState<'ahorro' | 'prestamo'>('ahorro');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSavings(
            mockData.filter((item) =>
                item.descripcion.toLowerCase().includes(value)
            )
        );
    };

    useEffect(() => {
        // Simulación de fetch si hace falta
    }, [tab]);

    return {
        savings,
        tab,
        setTab,
        handleSearch,
        currentPage,
        setCurrentPage,
    };
}
