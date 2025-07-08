'use client';

type Props = {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
};

export default function ConfirmDeleteModal({ show, onClose, onConfirm, message }: Props) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold text-[#1F2937] mb-4">¿Estás seguro?</h2>
                <p className="text-gray-600 mb-6">
                    {message || 'Esta acción no se puede deshacer.'}
                </p>

                <div className="flex justify-between gap-4">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
