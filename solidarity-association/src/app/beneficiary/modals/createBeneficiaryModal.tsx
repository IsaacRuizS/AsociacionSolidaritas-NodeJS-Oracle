'use client';

import { AssociateModel } from '@/app/shared/model/associateModel';

type Props = {
    show: boolean;
    associates: AssociateModel[]; // lista de asociados para el select
    onClose: () => void;
    onCreate?: (data: {
        associateId: number;
        firstName: string;
        lastName1: string;
        lastName2: string;
        email: string;
        phone: string;
        relationship: string;
        percentage: number;
    }) => void;
};

export default function CreateBeneficiaryModal({ show, associates, onClose, onCreate }: Props) {
    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const associateId = parseInt((form.elements.namedItem('associateId') as HTMLSelectElement).value, 10);
        const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
        const lastName1 = (form.elements.namedItem('lastName1') as HTMLInputElement).value;
        const lastName2 = (form.elements.namedItem('lastName2') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
        const relationship = (form.elements.namedItem('relationship') as HTMLInputElement).value;
        const percentage = parseFloat((form.elements.namedItem('percentage') as HTMLInputElement).value);

        onCreate?.({ associateId, firstName, lastName1, lastName2, email, phone, relationship, percentage });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/20 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Registrar beneficiario</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Selector de Asociado */}
                    <select
                        name="associateId"
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
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="lastName1"
                        type="text"
                        placeholder="Primer apellido"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="lastName2"
                        type="text"
                        placeholder="Segundo apellido"
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="phone"
                        type="text"
                        placeholder="Teléfono"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="relationship"
                        type="text"
                        placeholder="Parentesco"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="percentage"
                        type="number"
                        step="0.1"
                        placeholder="Porcentaje"
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
