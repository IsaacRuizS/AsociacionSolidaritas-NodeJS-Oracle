'use client';

type Props = {
    show: boolean;
    onClose: () => void;
    onCreate?: (data: {
        nationalId: string;
        firstName: string;
        lastName1: string;
        lastName2: string;
        email: string;
        phone: string;
        entryDate: Date;
        grossSalary: number;
    }) => void;
};

export default function CreateAssociateModal({ show, onClose, onCreate }: Props) {
    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const nationalId = (form.elements.namedItem('nationalId') as HTMLInputElement).value;
        const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
        const lastName1 = (form.elements.namedItem('lastName1') as HTMLInputElement).value;
        const lastName2 = (form.elements.namedItem('lastName2') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
        const entryDate = new Date((form.elements.namedItem('entryDate') as HTMLInputElement).value);
        const grossSalary = parseFloat((form.elements.namedItem('grossSalary') as HTMLInputElement).value);

        onCreate?.({ nationalId, firstName, lastName1, lastName2, email, phone, entryDate, grossSalary });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/20 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold text-center mb-4 text-[#1F2937]">Registrar asociado</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="nationalId"
                        type="text"
                        placeholder="Identificación"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
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
                        name="entryDate"
                        type="date"
                        placeholder="Fecha de ingreso"
                        required
                        className="w-full border rounded-full px-4 py-2 bg-gray-100 outline-none"
                    />
                    <input
                        name="grossSalary"
                        type="number"
                        placeholder="Salario bruto"
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
