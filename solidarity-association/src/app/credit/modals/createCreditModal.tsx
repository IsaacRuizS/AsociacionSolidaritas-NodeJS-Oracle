'use client';

type Props = {
    show: boolean;
    onClose: () => void;
    onCreate?: (data: {
        description: string;
        installment: number;
        term: number;
        interest: number;
        requested: number;
        balance: number;
    }) => void;
};

export default function CreateCreditModal({ show, onClose, onCreate }: Props) {
    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const description = (form.elements.namedItem('description') as HTMLInputElement).value;
        const installment = parseFloat((form.elements.namedItem('installment') as HTMLInputElement).value);
        const term = parseInt((form.elements.namedItem('term') as HTMLInputElement).value);
        const interest = parseFloat((form.elements.namedItem('interest') as HTMLInputElement).value);
        const requested = parseFloat((form.elements.namedItem('requested') as HTMLInputElement).value);
        const balance = parseFloat((form.elements.namedItem('balance') as HTMLInputElement).value);

        onCreate?.({ description, installment, term, interest, requested, balance });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Crear Crédito</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="description"
                        type="text"
                        placeholder="Descripción"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="installment"
                        type="number"
                        placeholder="Cuota (₡)"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="term"
                        type="number"
                        placeholder="Plazo (Meses)"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="interest"
                        type="number"
                        step="0.1"
                        placeholder="Tasa de interés (%)"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="requested"
                        type="number"
                        placeholder="Monto solicitado (₡)"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="balance"
                        type="number"
                        placeholder="Saldo actual (₡)"
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
