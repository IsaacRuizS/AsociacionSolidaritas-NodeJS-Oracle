'use client';

import { useEffect, useState } from 'react';
import { AssociateModel } from '@/app/shared/model/associateModel';

type Props = {
    show: boolean;
    currentData: AssociateModel | null;
    onClose: () => void;
    onSave: (updated: AssociateModel) => void;
};

export default function EditAssociateModal({ show, currentData, onClose, onSave }: Props) {
    const [formData, setFormData] = useState<AssociateModel>(new AssociateModel());

    useEffect(() => {
        if (currentData) {
            setFormData(new AssociateModel(currentData));
        }
    }, [currentData]);

    if (!show || !currentData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'grossSalary' ? parseFloat(value) :
                    name === 'entryDate' ? new Date(value) :
                    value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Editar asociado</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        name="entryDate"
                        type="date"
                        value={formData.entryDate ? formData.entryDate.toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="grossSalary"
                        type="number"
                        placeholder="Salario bruto"
                        value={formData.grossSalary ?? ''}
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
