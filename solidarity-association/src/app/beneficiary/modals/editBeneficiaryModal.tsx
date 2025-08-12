'use client';

import { useEffect, useState } from 'react';
import { BeneficiaryModel } from '@/app/shared/model/beneficiaryModel';
import { AssociateModel } from '@/app/shared/model/associateModel';

type Props = {
    show: boolean;
    associates: AssociateModel[];
    currentData: BeneficiaryModel | null;
    onClose: () => void;
    onSave: (updated: BeneficiaryModel) => void;
};

export default function EditBeneficiaryModal({ show, associates, currentData, onClose, onSave }: Props) {
    
    const [formData, setFormData] = useState<BeneficiaryModel>(new BeneficiaryModel());

    //precargar la data
    useEffect(() => {
        if (currentData) {
            setFormData(currentData);
        }
    }, [currentData]);

    // Mostrar el modal si hay datos actuales
    if (!show || !currentData) return null;

    // Mostrar el modal si hay datos actuales
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'percentage' ? parseFloat(value) :
                name === 'associateId' ? parseInt(value, 10) :
                value,
        }));
    };

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Editar beneficiario</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Selector de asociado */}
                    <select
                        name="associateId"
                        value={formData.associateId ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    >
                        <option value="">Seleccione un asociado</option>
                        {associates.map((a) => (
                            <option key={a.associateId} value={a.associateId}>
                                {`${a.firstName ?? ''} ${a.lastName1 ?? ''} ${a.lastName2 ?? ''}`}
                            </option>
                        ))}
                    </select>

                    <input
                        name="firstName"
                        type="text"
                        placeholder="Nombre"
                        value={formData.firstName ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="lastName1"
                        type="text"
                        placeholder="Primer apellido"
                        value={formData.lastName1 ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="lastName2"
                        type="text"
                        placeholder="Segundo apellido"
                        value={formData.lastName2 ?? ''}
                        onChange={handleChange}
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.email ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="phone"
                        type="text"
                        placeholder="Teléfono"
                        value={formData.phone ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="relationship"
                        type="text"
                        placeholder="Parentesco"
                        value={formData.relationship ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="percentage"
                        type="number"
                        step="0.1"
                        placeholder="Porcentaje"
                        value={formData.percentage ?? ''}
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
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
