'use client';

import { useState } from 'react';
import { SavingContributionModel, SavingModel } from '@/app/shared/model/savingModel';

type Props = {
    show: boolean;
    savings: SavingModel[];
    onClose: () => void;
    onCreate?: (data: {
        savingId: number;
        amount: number;
        date: Date;
    }) => void;
};

export default function CreateSavingContributionModal({
    show,
    savings,
    onClose,
    onCreate,
}: Props) {
    const [formData, setFormData] = useState<SavingContributionModel>(
        new SavingContributionModel()
    );

    if (!show) return null;

    // Manejar cambios en inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'amount' || name === 'savingId'
                    ? parseFloat(value)
                    : value,
        }));
    };

    // Guardar aporte
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const savingId = parseInt((form.elements.namedItem('savingId') as HTMLSelectElement).value, 10);
        const amount = parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value);
        const date = new Date();

        onCreate?.({ savingId, amount, date });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">
                    Agregar Aporte
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <select
                        name="savingId"
                        value={formData.savingId ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    >
                        <option value="">Seleccione un ahorro</option>
                        {savings.map((s) => (
                            <option key={s.savingId} value={s.savingId}>
                                {`${s.name ?? ''} - ${s.currentBalance ?? ''}`}
                            </option>
                        ))}
                    </select>
                    <input
                        name="amount"
                        type="number"
                        placeholder="Monto (₡)"
                        value={formData.amount ?? ''}
                        onChange={handleChange}
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
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
