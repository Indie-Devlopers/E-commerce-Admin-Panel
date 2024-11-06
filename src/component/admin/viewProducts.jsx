import { useState, useEffect } from "react";
import axios from "axios";
import Sidenav from "../layouts/Sidenav";

const ProductAccordion = () => {
    const [products, setProducts] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://unicodes-uniform-e-com-site-backend.onrender.com/products/get-products");
                const data = Array.isArray(response.data.data) ? response.data.data : []; // Ensure response is an array
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle accordion for the clicked product
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
            <Sidenav />
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map((product, index) => (
                    <div key={product._id} className="w-full border rounded-md mb-2 shadow-md bg-white">
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer bg-gray-200 hover:bg-gray-300"
                            onClick={() => toggleAccordion(index)}
                        >
                            <h2 className="font-semibold text-lg">{product.productName}</h2>
                            <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
                        </div>
                        {openIndex === index && (
                            <div className="p-4 space-y-4">
                                <p className="text-gray-700">{product.productDescription}</p>
                                <p className="font-semibold">Price: Rs {product.productPrice}</p>
                                {product.productDiscountPrice && (
                                    <p className="text-red-500">Discounted Price: Rs {product.productDiscountPrice}</p>
                                )}
                                {product.tags && <p className="font-semibold">Tags: {product.tags}</p>}
                                <p className="font-semibold">Total Ratings: {product.totalRatings}</p>
                                <p className="font-semibold">Total Reviews: {product.totalReviews}</p>
                                <div>
                                    <h3 className="font-semibold">Sizes Available:</h3>
                                    <p>
                                        Top Sizes: {Object.keys(product.productSizes.topSizes).filter(size => product.productSizes.topSizes[size]).join(", ")}
                                    </p>
                                    <p>
                                        Bottom Sizes: {Object.keys(product.productSizes.bottomSizes).filter(size => product.productSizes.bottomSizes[size]).join(", ")}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Variants:</h3>
                                    {product.variantId?.variants?.map((variant, idx) => (
                                        <div key={variant._id || idx} className="space-y-2 mt-2">
                                            <p>Color: {variant.color}</p>
                                            <div className="flex space-x-2">
                                                {variant.productImage.map((image, imgIdx) => (
                                                    <img
                                                        key={imgIdx}
                                                        src={image}
                                                        alt={`Variant ${idx} - ${variant.color}`}
                                                        className="w-16 h-16 object-cover border rounded"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductAccordion;
