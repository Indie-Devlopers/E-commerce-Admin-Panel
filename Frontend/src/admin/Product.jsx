import { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    productName: "",
    productImage: [],
    productColor: [],
    productCategory: "",
    productBrand: "",
    productDescription: "",
    productPrice: "",
    productSizes: { topSize: "" },
    productDetails: { material: "", countryOrigin: "" },
    additionalInfo: { details: "", fabricAndCare: "", returnAndChange: "" },
    inventoryStatus: "",
    tags: "",
    ratings: { averageRating: "", reviewsRating: "" },
    variants: [
      { color: "", size: "", price: "", discountPrice: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, parent, key) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [parent]: {
        ...prevData[parent],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:4000/products", productData);
      console.log("Product saved successfully!", response.data);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Product</h3>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={productData.productName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Images (comma-separated URLs):</label>
        <input
          type="file"
          name="productImage"
          value={productData.productImage}
          onChange={(e) =>
            setProductData({ ...productData, productImage: e.target.value.split(",") })
          }
          required
        />
      </div>
      <div>
        <label>Product Colors (comma-separated):</label>
        <input
          type="text"
          name="productColor"
          value={productData.productColor}
          onChange={(e) =>
            setProductData({ ...productData, productColor: e.target.value.split(",") })
          }
          required
        />
      </div>
      <div>
        <label>Product Category:</label>
        <input
          type="text"
          name="productCategory"
          value={productData.productCategory}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Brand:</label>
        <input
          type="text"
          name="productBrand"
          value={productData.productBrand}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Description:</label>
        <textarea
          name="productDescription"
          value={productData.productDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Price:</label>
        <input
          type="text"
          name="productPrice"
          value={productData.productPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Top Size:</label>
        <input
          type="text"
          name="topSize"
          value={productData.productSizes.topSize}
          onChange={(e) => handleNestedChange(e, "productSizes", "topSize")}
        />
      </div>
      <div>
        <label>Material:</label>
        <input
          type="text"
          name="material"
          value={productData.productDetails.material}
          onChange={(e) => handleNestedChange(e, "productDetails", "material")}
        />
      </div>
      <div>
        <label>Country of Origin:</label>
        <input
          type="text"
          name="countryOrigin"
          value={productData.productDetails.countryOrigin}
          onChange={(e) => handleNestedChange(e, "productDetails", "countryOrigin")}
        />
      </div>
      <div>
        <label>Inventory Status:</label>
        <select
          name="inventoryStatus"
          value={productData.inventoryStatus}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
          <option value="preOrder">Pre-order</option>
        </select>
      </div>
      <div>
        <label>Tags:</label>
        <select name="tags" value={productData.tags} onChange={handleChange}>
          <option value="">Select Tag</option>
          <option value="trending">Trending</option>
          <option value="new">New</option>
        </select>
      </div>
      <div>
        <label>Average Rating:</label>
        <input
          type="text"
          name="averageRating"
          value={productData.ratings.averageRating}
          onChange={(e) => handleNestedChange(e, "ratings", "averageRating")}
        />
      </div>
      <div>
        <label>Reviews Rating:</label>
        <input
          type="text"
          name="reviewsRating"
          value={productData.ratings.reviewsRating}
          onChange={(e) => handleNestedChange(e, "ratings", "reviewsRating")}
        />
      </div>
      <div>
        <h4>Variants</h4>
        {productData.variants.map((variant, index) => (
          <div key={index}>
            <label>Variant {index + 1} Color:</label>
            <input
              type="text"
              name={`variant-color-${index}`}
              value={variant.color}
              onChange={(e) => {
                const newVariants = [...productData.variants];
                newVariants[index].color = e.target.value;
                setProductData({ ...productData, variants: newVariants });
              }}
            />
            <label>Variant {index + 1} Size:</label>
            <input
              type="text"
              name={`variant-size-${index}`}
              value={variant.size}
              onChange={(e) => {
                const newVariants = [...productData.variants];
                newVariants[index].size = e.target.value;
                setProductData({ ...productData, variants: newVariants });
              }}
            />
            <label>Variant {index + 1} Price:</label>
            <input
              type="text"
              name={`variant-price-${index}`}
              value={variant.price}
              onChange={(e) => {
                const newVariants = [...productData.variants];
                newVariants[index].price = e.target.value;
                setProductData({ ...productData, variants: newVariants });
              }}
            />
            <label>Variant {index + 1} Discount Price:</label>
            <input
              type="text"
              name={`variant-discount-price-${index}`}
              value={variant.discountPrice}
              onChange={(e) => {
                const newVariants = [...productData.variants];
                newVariants[index].discountPrice = e.target.value;
                setProductData({ ...productData, variants: newVariants });
              }}
            />
          </div>
        ))}
      </div>
      <button type="submit">Submit Product</button>
    </form>
  );
};

export default ProductForm;
