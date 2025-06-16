import { useState, useEffect } from "react";

const EditProductModal = ({ isOpen, product, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        salePrice: "",
        quantity: 0
    });

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                salePrice: product.salePrice || "",
                quantity: product.quantity || 0
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: product._id, ...form });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[99999] bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-white">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Cut-off Price</label>
                        <input
                            type="number"
                            name="salePrice"
                            value={form.salePrice}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
