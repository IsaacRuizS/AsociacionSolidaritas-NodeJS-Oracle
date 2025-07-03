'use client';

import { Dispatch, SetStateAction } from 'react';

type Props = {
    show: boolean;
    onClose: () => void;
    onCreate?: (data: { descripcion: string; cuota: number; fecha: string }) => void;
};

export default function CreateSavingModal({ show, onClose, onCreate }: Props) {
    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const descripcion = (form.elements.namedItem('descripcion') as HTMLInputElement).value;
        const cuota = parseFloat((form.elements.namedItem('cuota') as HTMLInputElement).value);
        const fecha = (form.elements.namedItem('fecha') as HTMLInputElement).value;

        onCreate?.({ descripcion, cuota, fecha });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Iniciar ahorro personal</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="descripcion"
                        type="text"
                        placeholder="Descripcion"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="cuota"
                        type="number"
                        placeholder="Cuota mensual"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="fecha"
                        type="date"
                        placeholder="Fecha de liquidación"
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
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
