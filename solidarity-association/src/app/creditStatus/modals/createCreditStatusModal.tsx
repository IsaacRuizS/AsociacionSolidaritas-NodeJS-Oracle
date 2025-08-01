'use client';

type Props = {
    show: boolean;
    onClose: () => void;
    onCreate?: (data: { description: string }) => void;
};

export default function CreateCreditStatusModal({ show, onClose, onCreate }: Props) {
    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const description = (form.elements.namedItem('description') as HTMLInputElement).value;
        onCreate?.({ description });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Crear Estado</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
