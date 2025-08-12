'use client';

import { useEffect, useState } from 'react';
import { WithdrawalModel } from '@/app/shared/model/savingModel';

type Props = {
    show: boolean;
    currentEdit: WithdrawalModel | null;
    onClose: () => void;
    onSave: (updated: WithdrawalModel) => void;
};

export default function EditWithdrawalModal({
    show,
    currentEdit,
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

    // Guardar cambios
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">
                    Editar Retiro
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">ID Ahorro</label>
                        <input
                            name="savingId"
                            type="number"
                            value={formData.savingId ?? ''}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                        />
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
                    <div>
                        <label className="text-sm text-gray-700 mb-1 block">Fecha</label>
                        <input
                            name="date"
                            type="date"
                            value={
                                formData.date
                                    ? formData.date.toISOString().split('T')[0]
                                    : ''
                            }
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    date: e.target.value
                                        ? new Date(e.target.value)
                                        : undefined,
                                }))
                            }
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
