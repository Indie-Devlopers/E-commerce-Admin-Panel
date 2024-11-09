import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Sidenav from "../layouts/Sidenav";
import { useDispatch } from "react-redux";
import { setProductId } from "./slice/productSlice";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState();
  const [topSizes] = useState(["m", "s", "l", "xl", "2xl", "3xl"]);
  const [bottomSizes] = useState(["28", "30", "32", "34", "36", "38"]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch Categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://unicodes-uniform-e-com-site-backend.onrender.com/get-categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch Products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://unicodes-uniform-e-com-site-backend.onrender.com/products/get-products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const selectedCategoryData = categories.find((cat) => cat._id === categoryId);
    setSubCategories(selectedCategoryData ? selectedCategoryData.subCategory : []);
  };

  const formik = useFormik({
    initialValues: {
      productName: '',
      categoryId: '',
      subCategory: '',
      productDescription: '',
      productPrice: '',
      productDiscountPrice: '',
      productType: '', 
      productSizes: {
        topSizes: {
          m: false,
          s: false,
          l: false,
          xl: false,
          "2xl": false,
          "3xl": false,
        },
        bottomSizes: {
          "28": false,
          "30": false,
          "32": false,
          "34": false,
          "36": false,
          "38": false,
        },
      },
      productDetails: {
        fabric: '',
        countryOrigin: '',
      },
      additionalInfo: {
        details: '',
        fabricAndCare: '',
        returnAndChange: '',
      },
      gender: '',
      pockets: '',
      inventoryStatus: '',
      tags: '',
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
    
        // Append all fields from Formik values
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'productDetails' || key === 'additionalInfo') {
            Object.entries(value).forEach(([subKey, subValue]) => {
              formData.append(`${key}[${subKey}]`, subValue);
            });
          } else if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
              if (typeof subValue === 'object' && subValue !== null) {
                Object.entries(subValue).forEach(([sizeKey, sizeValue]) => {
                  formData.append(`${key}[${subKey}][${sizeKey}]`, sizeValue);
                });
              } else {
                formData.append(`${key}[${subKey}]`, subValue);
              }
            });
          } else {
            formData.append(key, value );
          }
        });

        // Log FormData entries
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
    
        const response = await axios.post("http://localhost:4000/products/product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        dispatch(setProductId(response.data));
        Swal.fire("Created!", "Product created successfully.", "success");
        navigate("varients");
        formik.resetForm();
      } catch (error) {
        Swal.fire("Error!", "There was an error: " + error.message, "error");
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    },
  });

  return (
    <>
      <Sidenav />
      <section className="home-section">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Add Product </h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                name="categoryId"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleCategoryChange(e.target.value);
                }}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SubCategory Dropdown */}
            {subCategories.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700">Sub Category</label>
                <select
                  name="subCategory"
                  onChange={formik.handleChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((subCat, index) => (
                    <option key={index} value={subCat}>
                      {subCat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="productName"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Product Description</label>
              <textarea
                name="productDescription"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Product Price</label>
              <input
                type="number"
                name="productPrice"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Discount Price</label>
              <input
                type="number"
                name="productDiscountPrice"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Product Type Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Product Type</label>
              <select
                name="productType"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Product Type</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="topBottom">Top-Bottom</option>
              </select>
            </div>

            {/* Product Sizes as Checkboxes */}
            {/* Top Sizes */}
            <div className="mb-4">
              <label>Top Sizes:</label>
              {topSizes.map((size) => (
                <div key={size} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name={`productSizes.topSizes.${size}`}
                    checked={formik.values.productSizes.topSizes [size]}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor={`productSizes.topSizes.${size}`}>
                    {size.toUpperCase()}
                  </label>
                </div>
              ))}
            </div>

            {/* Bottom Sizes */}
            <div className="mb-4">
              <label>Bottom Sizes:</label>
              {bottomSizes.map((size) => (
                <div key={size} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name={`productSizes.bottomSizes.${size}`}
                    checked={formik.values.productSizes.bottomSizes[size]}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor={`productSizes.bottomSizes.${size}`}>{size}</label>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="mb-4">
              <label className="block text-gray-700">Fabric</label>
              <input
                type="text"
                name="productDetails.fabric"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Country of Origin</label>
              <input
                type="text"
                name="productDetails.countryOrigin"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Additional Info */}
            <div className="mb-4">
              <label className="block text-gray-700">Additional Details</label>
              <textarea
                name="additionalInfo.details"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Fabric and Care</label>
              <textarea
                name="additionalInfo.fabricAndCare"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Return and Change Policy</label>
              <textarea
                name="additionalInfo.returnAndChange"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Pockets */}
            <div className="mb-4">
              <label className="block text-gray-700">Pockets</label>
              <input
                type="text"
                name="pockets"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Inventory Status */}
            <div className="mb-4">
              <label className="block text-gray-700">Inventory Status</label>
              <select
                name="inventoryStatus"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Status</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
                <option value="preOrder">Pre Order</option>
              </select>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-gray-700">Tags</label>
              <select
                name="tags"
                onChange={formik.handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Tag</option>
                <option value="trending">Trending</option>
                <option value="new">New</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full"
            >
              Create Product
            </button>
          </form>
        </div>

        {/* Product Table */}
      </section>
    </>
  );
};

export default ProductForm;