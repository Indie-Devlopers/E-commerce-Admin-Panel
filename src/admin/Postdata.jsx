import { useState } from 'react';
import axios from 'axios';

const Postdata = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productImage: '',
    productColor: '',
    productCategory: '',
    productBrand: '',
    productDescription: '',
    productPrice: '',
    productDiscountPrice: '',
    productSizes: { topSize: '', bottomSize: '' },
    productDetails: { material: '', countryOrigin: '' },
    additionalInfo: { details: '', fabricAndCare: '', returnAndChange: '' },
    variants: [{ color: '', size: '', price: '', discountPrice: '' }],
    inventoryStatus: 'inStock',
    tags: 'new',
    ratings: { averageRating: '', reviewsRating: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...formData.variants];
    updatedVariants[index][name] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/products/product', formData);
      console.log('Product created successfully:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <h2 className="text-2xl font-bold">Create New Product</h2>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Product Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Images (URLs)</label>
        <input
          type="text"
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
          placeholder="Add image URLs separated by commas"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Product Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Color</label>
        <input
          type="text"
          name="productColor"
          value={formData.productColor}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Product Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Category</label>
        <input
          type="text"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Product Brand */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Brand</label>
        <input
          type="text"
          name="productBrand"
          value={formData.productBrand}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Product Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Description</label>
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          rows="3"
        />
      </div>

      {/* Product Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Price</label>
        <input
          type="text"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Product Discount Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Discount Price</label>
        <input
          type="text"
          name="productDiscountPrice"
          value={formData.productDiscountPrice}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Sizes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Top Size</label>
        <select
          name="topSize"
          value={formData.productSizes.topSize}
          onChange={(e) =>
            setFormData({
              ...formData,
              productSizes: { ...formData.productSizes, topSize: e.target.value }
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Size</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
          <option value="2xl">2XL</option>
          <option value="3xl">3XL</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bottom Size</label>
        <select
          name="bottomSize"
          value={formData.productSizes.bottomSize}
          onChange={(e) =>
            setFormData({
              ...formData,
              productSizes: { ...formData.productSizes, bottomSize: e.target.value }
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Size</option>
          <option value="28">28</option>
          <option value="30">30</option>
          <option value="32">32</option>
          <option value="34">34</option>
          <option value="36">36</option>
          <option value="38">38</option>
        </select>
      </div>

      {/* Product Material */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Material</label>
        <input
          type="text"
          name="material"
          value={formData.productDetails.material}
          onChange={(e) =>
            setFormData({
              ...formData,
              productDetails: { ...formData.productDetails, material: e.target.value }
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Country of Origin */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Country of Origin</label>
        <input
          type="text"
          name="countryOrigin"
          value={formData.productDetails.countryOrigin}
          onChange={(e) =>
            setFormData({
              ...formData,
              productDetails: { ...formData.productDetails, countryOrigin: e.target.value }
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Variants */}
      <h3 className="text-lg font-bold">Variants</h3>
      {formData.variants.map((variant, index) => (
        <div key={index} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Variant {index + 1}</label>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={variant.color}
              onChange={(e) => handleVariantChange(index, e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <input
              type="text"
              name="size"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={variant.price}
              onChange={(e) => handleVariantChange(index, e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount Price</label>
            <input
              type="text"
              name="discountPrice"
              value={variant.discountPrice}
              onChange={(e) => handleVariantChange(index, e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      ))}

      {/* Inventory Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Inventory Status</label>
        <select
          name="inventoryStatus"
          value={formData.inventoryStatus}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
          <option value="preOrder">Pre Order</option>
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <select
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="new">New</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {/* Ratings */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Average Rating</label>
        <input
          type="text"
          name="averageRating"
          value={formData.ratings.averageRating}
          onChange={(e) =>
            setFormData({
              ...formData,
              ratings: { ...formData.ratings, averageRating: e.target.value }
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Review Rating</label>
        <input
          type="text"
          name="reviewsRating"
          value={formData.ratings.reviewsRating}
          onChange={(e) =>
            setFormData({
              ...formData,
              ratings: { ...formData.ratings, reviewsRating: e.target.value }
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Submit Product
        </button>
      </div>
    </form>
  );
};

export default Postdata;
