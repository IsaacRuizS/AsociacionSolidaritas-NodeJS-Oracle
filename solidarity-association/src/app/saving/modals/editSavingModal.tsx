'use client';

import { useEffect, useState } from 'react';
import { SavingModel } from '@/app/shared/model/savingModel';

type Props = {
    show: boolean;
    currentEdit: SavingModel | null;
    onClose: () => void;
    onSave: (updated: SavingModel) => void;
};

export default function EditSavingModal({ show, currentEdit, onClose, onSave }: Props) {
    const [formData, setFormData] = useState<SavingModel>(new SavingModel());

    // Precargar datos cuando cambie el registro a editar
    useEffect(() => {
        if (currentEdit) {
            setFormData(currentEdit);
        }
    }, [currentEdit]);

    if (!show || !currentEdit) return null;

    // Manejar cambios en cualquier input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'currentBalance' ||
                name === 'monthlyAmount' ||
                name === 'generatedInterest' ||
                name === 'interestRate' ||
                name === 'associateId' ||
                name === 'savingTypeId'
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
                    Editar Ahorro
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="associateId"
                        type="number"
                        placeholder="ID Asociado"
                        value={formData.associateId ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />

                    <input
                        name="savingTypeId"
                        type="number"
                        placeholder="ID Tipo de Ahorro"
                        value={formData.savingTypeId ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />

                    <input
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        value={formData.name ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />

                    <input
                        name="currentBalance"
                        type="number"
                        placeholder="Saldo Actual"
                        value={formData.currentBalance ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />

                    <input
                        name="monthlyAmount"
                        type="number"
                        placeholder="Cuota Mensual"
                        value={formData.monthlyAmount ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />

                    <input
                        name="generatedInterest"
                        type="number"
                        placeholder="Interés Generado"
                        value={formData.generatedInterest ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />

                    <input
                        name="interestRate"
                        type="number"
                        placeholder="Tasa de Interés (%)"
                        step="0.01"
                        value={formData.interestRate ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />

                    <input
                        name="deadline"
                        type="date"
                        value={
                            formData.deadline
                                ? new Date(formData.deadline).toISOString().split('T')[0]
                                : ''
                        }
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                deadline: e.target.value ? new Date(e.target.value) : undefined,
                            }))
                        }
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
