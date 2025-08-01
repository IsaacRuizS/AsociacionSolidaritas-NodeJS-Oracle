'use client';

import { useEffect, useState } from 'react';

type Props = {
    show: boolean;
    currentEdit: { amount: number; date: string };
    onClose: () => void;
    onSave: (amount: number, date: string) => void;
};

export default function EditSavingContributionModal({ show, currentEdit, onClose, onSave }: Props) {
    const [amount, setAmount] = useState(currentEdit.amount);
    const [date, setDate] = useState(currentEdit.date);

    useEffect(() => {
        setAmount(currentEdit.amount);
        setDate(currentEdit.date);
    }, [currentEdit]);

    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(amount, date);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Editar Aporte</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">Monto (₡)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            required
                            className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">Fecha</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                        />
                    </div>
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
