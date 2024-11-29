import { useState, useEffect } from "react";
import axios from "axios";
import Sidenav from "../layouts/Sidenav";

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isSaving, setIsSaving] = useState(false);  // State to track the saving process

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "https://unicodes-uniform-e-com-site-backend.onrender.com/products/get-products"
                );
                const data = Array.isArray(response.data.data) ? response.data.data : [];
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        setCurrentProduct({ _id: id });
        setShowDeleteConfirmation(true);
    };

    const handleUpdateProduct = async (updatedProduct) => {
        setIsSaving(true);  // Start saving process
        try {
            await axios.put(
                `https://unicodes-uniform-e-com-site-backend.onrender.com/products/update-product/${updatedProduct._id}`,
                updatedProduct
            );
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setIsSaving(false);  // End saving process
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(
                `https://unicodes-uniform-e-com-site-backend.onrender.com/products/delete-product/${currentProduct._id}`
            );
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== currentProduct._id)
            );
            setShowDeleteConfirmation(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setShowDeleteConfirmation(false);
    };

    return (
        <>
            <Sidenav />
            <div className="flex justify-between min-h-screen mx-[300px]">
                <div className="">
                    <h1 className="text-3xl font-bold mb-6 text-center">Product Details</h1>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <p className="text-lg text-gray-600 text-center">No products available.</p>
                    ) : (
                        <div className="w-full overflow-x-auto">
                            <table className="w-full table-auto border-collapse border border-gray-200 bg-white shadow-lg">
                                <thead className="sticky top-0 bg-blue-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">#</th>
                                        <th className="border border-gray-300 px-4 py-2">Image</th>
                                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Description</th>
                                        <th className="border border-gray-300 px-4 py-2">Price</th>
                                        <th className="border border-gray-300 px-4 py-2">Discount Price</th>
                                        <th className="border border-gray-300 px-4 py-2">Ratings</th>
                                        <th className="border border-gray-300 px-4 py-2">Reviews</th>
                                        <th className="border border-gray-300 px-4 py-2">Tags</th>
                                        <th className="border border-gray-300 px-4 py-2">Sizes</th>
                                        <th className="border border-gray-300 px-4 py-2">Variants</th>
                                        <th className="border border-gray-300 px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr
                                            key={product._id}
                                            className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                        >
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                {product.variantId?.variants?.[0]?.productImage?.[0] ? (
                                                    <img
                                                        src={product.variantId.variants[0].productImage[0]}
                                                        alt={product.productName}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                ) : (
                                                    <span className="text-gray-500">No Image</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                                                {product.productDescription}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">Rs {product.productPrice}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-red-600">
                                                {product.productDiscountPrice ? `Rs ${product.defaultProductPrice}` : "—"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-yellow-500">
                                                ★ {product.totalRatings}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.totalReviews} Reviews
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">{product.tags || "—"}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm">
                                                <p>
                                                    <strong>Top:</strong>{" "}
                                                    {Object.keys(product.productSizes.topSizes)
                                                        .filter((size) => product.productSizes.topSizes[size])
                                                        .join(", ") || "None"}
                                                </p>
                                                <p>
                                                    <strong>Bottom:</strong>{" "}
                                                    {Object.keys(product.productSizes.bottomSizes)
                                                        .filter((size) => product.productSizes.bottomSizes[size])
                                                        .join(", ") || "None"}
                                                </p>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.variantId?.variants?.map((variant, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="w-6 h-6 rounded-full inline-block"
                                                        style={{ backgroundColor: variant.color }}
                                                        title={variant.color}
                                                    />
                                                )) || "—"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(currentProduct);
            }}>
                {/* Product Image */}
                <div className="mb-4">
                    <label className="block font-semibold">Product Image</label>
                    <input
                        type="text"  // Allow users to input image URL
                        value={currentProduct.variantId?.variants?.[0]?.productImage?.[0] || ""}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                variantId: {
                                    ...currentProduct.variantId,
                                    variants: currentProduct.variantId.variants.map((variant) => ({
                                        ...variant,
                                        productImage: [e.target.value],  // Update the first image
                                    })),
                                },
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter Image URL"
                    />
                </div>

                {/* Product Name */}
                <div className="mb-4">
                    <label className="block font-semibold">Product Name</label>
                    <input
                        type="text"
                        value={currentProduct.productName}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                productName: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Product Description */}
                <div className="mb-4">
                    <label className="block font-semibold">Product Description</label>
                    <textarea
                        value={currentProduct.productDescription}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                productDescription: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Product Price */}
                <div className="mb-4">
                    <label className="block font-semibold">Product Price</label>
                    <input
                        type="number"
                        value={currentProduct.productPrice}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                productPrice: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Discount Price */}
                <div className="mb-4">
                    <label className="block font-semibold">Discount Price</label>
                    <input
                        type="number"
                        value={currentProduct.productDiscountPrice || ""}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                productDiscountPrice: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Ratings */}
                <div className="mb-4">
                    <label className="block font-semibold">Ratings</label>
                    <input
                        type="number"
                        value={currentProduct.totalRatings}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                totalRatings: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Reviews */}
                <div className="mb-4">
                    <label className="block font-semibold">Reviews</label>
                    <input
                        type="number"
                        value={currentProduct.totalReviews}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                totalReviews: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Tags */}
                <div className="mb-4">
                    <label className="block font-semibold">Tags</label>
                    <input
                        type="text"
                        value={currentProduct.tags || ""}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                tags: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter tags (comma separated)"
                    />
                </div>

                {/* Sizes */}
                <div className="mb-4">
                    <label className="block font-semibold">Sizes</label>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Top Sizes */}
                        <div>
                            <label className="block font-semibold">Top Sizes</label>
                            <div className="flex space-x-2">
                                {["S", "M", "L", "XL", "XXL"].map((size) => (
                                    <label key={size} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={currentProduct.productSizes.topSizes[size] || false}
                                            onChange={() =>
                                                setCurrentProduct({
                                                    ...currentProduct,
                                                    productSizes: {
                                                        ...currentProduct.productSizes,
                                                        topSizes: {
                                                            ...currentProduct.productSizes.topSizes,
                                                            [size]: !currentProduct.productSizes.topSizes[size],
                                                        },
                                                    },
                                                })
                                            }
                                            className="form-checkbox"
                                        />
                                        <span className="ml-2">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Sizes */}
                        <div>
                            <label className="block font-semibold">Bottom Sizes</label>
                            <div className="flex space-x-2">
                                {["S", "M", "L", "XL", "XXL"].map((size) => (
                                    <label key={size} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={currentProduct.productSizes.bottomSizes[size] || false}
                                            onChange={() =>
                                                setCurrentProduct({
                                                    ...currentProduct,
                                                    productSizes: {
                                                        ...currentProduct.productSizes,
                                                        bottomSizes: {
                                                            ...currentProduct.productSizes.bottomSizes,
                                                            [size]: !currentProduct.productSizes.bottomSizes[size],
                                                        },
                                                    },
                                                })
                                            }
                                            className="form-checkbox"
                                        />
                                        <span className="ml-2">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Variants */}
                <div className="mb-4">
                    <label className="block font-semibold">Variants (Colors)</label>
                    <div className="flex space-x-2">
                        {currentProduct.variantId?.variants?.map((variant, idx) => (
                            <div key={idx} className="flex items-center">
                                <label className="mr-2">Variant {idx + 1}</label>
                                <input
                                    type="color"
                                    value={variant.color || "#000000"}
                                    onChange={(e) =>
                                        setCurrentProduct({
                                            ...currentProduct,
                                            variantId: {
                                                ...currentProduct.variantId,
                                                variants: currentProduct.variantId.variants.map(
                                                    (v, i) =>
                                                        i === idx
                                                            ? { ...v, color: e.target.value }
                                                            : v
                                                ),
                                            },
                                        })
                                    }
                                    className="w-10 h-10 border rounded-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSaving}  // Disable the button when saving
                    className={`w-full py-2 text-white rounded ${
                        isSaving ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </form>
            <button
                onClick={handleCloseModal}
                className="mt-4 w-full py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
                Cancel
            </button>
        </div>
    </div>
)}


            {/* Delete Confirmation */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete this product?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductTable;
