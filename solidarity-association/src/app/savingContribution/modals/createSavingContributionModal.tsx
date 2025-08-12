'use client';

import { useState } from 'react';
import { SavingContributionModel } from '@/app/shared/model/savingModel';

type Props = {
    show: boolean;
    onClose: () => void;
    onCreate?: (data: SavingContributionModel) => void;
};

export default function CreateSavingContributionModal({
    show,
    onClose,
    onCreate,
}: Props) {
    const [formData, setFormData] = useState<SavingContributionModel>(
        new SavingContributionModel()
    );

    if (!show) return null;

    // Manejar cambios en inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        formData.date = new Date(); // Asignar fecha actual
        onCreate?.(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">
                    Agregar Aporte
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="savingId"
                        type="number"
                        placeholder="ID Ahorro"
                        value={formData.savingId ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
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
