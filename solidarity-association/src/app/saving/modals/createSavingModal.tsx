'use client';

import { useState } from 'react';
import { SavingModel, SavingTypeModel } from '@/app/shared/model/savingModel';
import { AssociateModel } from '@/app/shared/model/associateModel';

type Props = {
    show: boolean;
    associates: AssociateModel[];
    types: SavingTypeModel[];
    onClose: () => void;
    onCreate?: (data: SavingModel) => void;
};

export default function CreateSavingModal({ show, associates, types, onClose, onCreate }: Props) {
    const [formData, setFormData] = useState<SavingModel>(new SavingModel());
    if (!show) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'associateId' || name === 'savingTypeId'
                    ? (value ? parseInt(value, 10) : (undefined as any))
                    : name === 'currentBalance' ||
                        name === 'monthlyAmount' ||
                        name === 'generatedInterest' ||
                        name === 'interestRate'
                        ? (value === '' ? (undefined as any) : parseFloat(value))
                        : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate?.(formData);
        onClose();
    };

    const associateLabel = (a: AssociateModel) =>
        [a.firstName, a.lastName1, a.lastName2].filter(Boolean).join(' ');

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">
                    Iniciar ahorro personal
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* SELECT Asociado */}
                    <select
                        name="associateId"
                        value={formData.associateId ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    >
                        <option value="" disabled>Seleccione un asociado</option>
                        {associates.map((a) => (
                            <option key={a.associateId} value={a.associateId}>
                                {associateLabel(a)}
                            </option>
                        ))}
                    </select>

                    {/* SELECT Tipo de Ahorro */}
                    <select
                        name="savingTypeId"
                        value={formData.savingTypeId ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    >
                        <option value="" disabled>Seleccione un tipo de ahorro</option>
                        {types.map((t) => (
                            <option key={t.savingTypeId} value={t.savingTypeId}>
                                {t.name}
                            </option>
                        ))}
                    </select>

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
                        value={formData.deadline ? new Date(formData.deadline).toISOString().split('T')[0] : ''}
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
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
