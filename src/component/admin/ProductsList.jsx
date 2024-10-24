import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/products/get-products"); // Change the URL as needed
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Products List</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Discount Price</th>
                        <th>Sizes</th>
                        <th>Fabric</th>
                        <th>Origin</th>
                        <th>Tags</th>
                        <th>Rating</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.productDescription}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productDiscountPrice || "N/A"}</td>
                            <td>
                                Top: {product.productSizes?.topSize || "N/A"}, Bottom:{" "}
                                {product.productSizes?.bottomSize || "N/A"}
                            </td>
                            <td>{product.productDetails?.fabric || "N/A"}</td>
                            <td>{product.productDetails?.countryOrigin || "N/A"}</td>
                            <td>{product.tags || "N/A"}</td>
                            <td>{product.averageRating || "0"}</td>
                            <td>{product.inventoryStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;
