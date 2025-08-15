'use client';

import { useEffect, useState } from 'react';
import { WithdrawalModel, SavingModel } from '@/app/shared/model/savingModel';

type Props = {
    show: boolean;
    currentEdit: WithdrawalModel | null;
    savings: SavingModel[];
    onClose: () => void;
    onSave: (updated: {
        withdrawalId: number;
        savingId: number;
        amount: number;
        dateWithdrawal: Date;
    }) => void;
};

export default function EditWithdrawalModal({
    show,
    currentEdit,
    savings,
    onClose,
    onSave,
}: Props) {
    const [formData, setFormData] = useState<WithdrawalModel>(new WithdrawalModel());

    // Precargar datos cuando currentEdit cambia
    useEffect(() => {
        if (currentEdit) {
            setFormData(currentEdit);
        }
    }, [currentEdit]);

    if (!show || !currentEdit) return null;

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

    // Guardar cambios
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const withdrawalId = currentEdit.withdrawalId!;
        const savingId = parseInt((form.elements.namedItem('savingId') as HTMLSelectElement).value, 10);
        const amount = parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value);
        const dateWithdrawal = currentEdit.date || new Date();

        onSave({ withdrawalId, savingId, amount, dateWithdrawal });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">
                    Editar Retiro
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div style={{ display: 'none' }}>
                        <label className="text-sm text-gray-700 mb-1 block">Ahorro</label>
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
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">Monto (₡)</label>
                        <input
                            name="amount"
                            type="number"
                            value={formData.amount ?? ''}
                            onChange={handleChange}
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
