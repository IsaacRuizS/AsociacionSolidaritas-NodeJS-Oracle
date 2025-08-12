'use client';

import { SavingTypeModel } from '@/app/shared/model/savingModel';

type Props = {
    show: boolean;
    onClose: () => void;
    onCreate?: (data: SavingTypeModel) => void;
};

export default function CreateSavingTypeModal({ show, onClose, onCreate }: Props) {

    // handler para mostrar el modal
    if (!show) return null;

    // handler para el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        const form = e.currentTarget;

        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const description = (form.elements.namedItem('description') as HTMLInputElement).value.trim();

        const newType = new SavingTypeModel();
        newType.name = name;
        newType.description = description;

        onCreate?.(newType);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">
                    Crear Tipo de Ahorro
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="description"
                        type="text"
                        placeholder="Descripción"
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
