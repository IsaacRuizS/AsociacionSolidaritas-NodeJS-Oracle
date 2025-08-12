'use client';

import { useState } from 'react';
import { CreditModel } from '@/app/shared/model/creditModel';
import { AssociateModel } from '@/app/shared/model/associateModel';
import { CreditStatusModel } from '@/app/shared/model/creditModel'; // Ajusta si está en otro archivo

type Props = {
    show: boolean;
    associates: AssociateModel[];
    creditStatuses: CreditStatusModel[];
    onClose: () => void;
    onCreate: (newCredit: CreditModel) => void;
};

export default function CreateCreditModal({ show, associates, creditStatuses, onClose, onCreate }: Props) {

    const [formData, setFormData] = useState<CreditModel>(new CreditModel());

    if (!show) return null;

    // Manejar cambios en inputs/selects
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: 
                name === 'associateId' || name === 'creditStatusId' || name === 'termMonths'
                    ? parseInt(value, 10)
                : name === 'requestedAmount' || name === 'currentBalance' || name === 'monthlyPayment' || name === 'interestRate'
                    ? parseFloat(value)
                : name === 'requestDate' || name === 'approvalDate'
                    ? (value ? new Date(value) : undefined)
                : value
        }));
    };

    // Guardar nuevo crédito
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Crear Crédito</h2>

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

                    {/* Selector de estado de crédito */}
                    <select
                        name="creditStatusId"
                        value={formData.creditStatusId ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    >
                        <option value="">Seleccione un estado</option>
                        {creditStatuses.map((cs) => (
                            <option key={cs.statusId} value={cs.statusId}>
                                {cs.description}
                            </option>
                        ))}
                    </select>

                    <input name="name" type="text" placeholder="Nombre" value={formData.name ?? ''} onChange={handleChange} required className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none" />
                    <input name="requestedAmount" type="number" step="0.01" placeholder="Monto Solicitado" value={formData.requestedAmount ?? ''} onChange={handleChange} required className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none" />
                    <input name="termMonths" type="number" placeholder="Plazo (meses)" value={formData.termMonths ?? ''} onChange={handleChange} required className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none" />
                    <input name="currentBalance" type="number" step="0.01" placeholder="Saldo Actual" value={formData.currentBalance ?? ''} onChange={handleChange} required className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none" />
                    <input name="monthlyPayment" type="number" step="0.01" placeholder="Cuota Mensual" value={formData.monthlyPayment ?? ''} onChange={handleChange} required className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none" />
                    <input name="interestRate" type="number" step="0.01" placeholder="Tasa de Interés (%)" value={formData.interestRate ?? ''} onChange={handleChange} required className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none" />
                    <input name="requestDate" type="date" placeholder="Fecha Solicitud" value={formData.requestDate ? formData.requestDate.toISOString().split('T')[0] : ''} onChange={handleChange} required className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none" />
                    <input name="approvalDate" type="date" placeholder="Fecha Aprobación" value={formData.approvalDate ? formData.approvalDate.toISOString().split('T')[0] : ''} onChange={handleChange} className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none" />

                    <div className="flex justify-between gap-4 mt-6">
                        <button type="button" onClick={onClose} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                            Cancelar
                        </button>
                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
