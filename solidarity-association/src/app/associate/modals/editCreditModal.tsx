'use client';

import { useState, useEffect } from 'react';

type Props = {
    show: boolean;
    currentEdit: {
        cuota: number;
        termmonths: number;
        interest: number;
        requested: number;
    };
    onClose: () => void;
    onSave: (cuota: number, termmonths: number, interest: number, requested: number) => void;
};

export default function EditCreditModal({ show, currentEdit, onClose, onSave }: Props) {
    const [cuota, setCuota] = useState(currentEdit.cuota);
    const [termmonths, setTermMonths] = useState(currentEdit.termmonths);
    const [interest, setInterest] = useState(currentEdit.interest);
    const [requested, setRequested] = useState(currentEdit.requested);

    useEffect(() => {
        setCuota(currentEdit.cuota);
        setTermMonths(currentEdit.termmonths);
        setInterest(currentEdit.interest);
        setRequested(currentEdit.requested);
    }, [currentEdit]);

    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(cuota, termmonths, interest, requested);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Editar crédito</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">Nueva cuota mensual</label>
                        <input
                            type="number"
                            value={cuota}
                            onChange={(e) => setCuota(Number(e.target.value))}
                            required
                            className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">Nuevo plazo (quincenas)</label>
                        <input
                            type="number"
                            value={termmonths}
                            onChange={(e) => setTermMonths(Number(e.target.value))}
                            required
                            className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">Nueva tasa de interés (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={interest}
                            onChange={(e) => setInterest(Number(e.target.value))}
                            required
                            className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">Nuevo monto total solicitado</label>
                        <input
                            type="number"
                            value={requested}
                            onChange={(e) => setRequested(Number(e.target.value))}
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
