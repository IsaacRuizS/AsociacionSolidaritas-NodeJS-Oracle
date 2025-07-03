'use client';

import { useState, useEffect } from 'react';

type Props = {
    show: boolean;
    currentCuota: number;
    onClose: () => void;
    onSave: (newCuota: number) => void;
};

export default function EditCuotaModal({ show, currentCuota, onClose, onSave }: Props) {
    const [cuota, setCuota] = useState(currentCuota);

    useEffect(() => {
        setCuota(currentCuota); 
    }, [currentCuota]);

    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(cuota);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Editar cuota mensual</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        value={cuota}
                        onChange={(e) => setCuota(Number(e.target.value))}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
