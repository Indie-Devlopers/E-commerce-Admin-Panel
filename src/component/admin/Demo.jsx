import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Sidenav from "../layouts/Sidenav";
import { useDispatch } from "react-redux";
import { setProductId } from "./slice/productSlice";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isTop, setIsTop] = useState()
  const [isBottom, setIsBottom] = useState()
  const [isTopBottom, setIsTopBottom] = useState()
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
      const response = await axios.get(
        "https://unicodes-uniform-e-com-site-backend.onrender.com/get-categories"
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch Products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://unicodes-uniform-e-com-site-backend.onrender.com/products/get-products"
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const selectedCategoryData = categories.find(
      (cat) => cat._id === categoryId
    );
    setSubCategories(
      selectedCategoryData ? selectedCategoryData.subCategory : []
    );
  };

  const onSubmit = async (data) => {
    // Combine selected sizes for topSizes and bottomSizes
    const selectedSizes = {
      topSizes: {},
      bottomSizes: {}
    };
  
    topSizes.forEach((size) => {
      selectedSizes.topSizes[size] = data[`topSizes.${size}`] || false;
    });
  console.log(topSizes);
    bottomSizes.forEach((size) => {
      selectedSizes.bottomSizes[size] = data[`bottomSizes.${size}`] || false;
    });


  const formData = new FormData();
  formData.append("productName", data.productName);
  formData.append("categoryId", data.categoryId);
  formData.append("subCategory", data.subCategory);
  formData.append("productDescription", data.productDescription);
  formData.append("productPrice", data.productPrice);
  formData.append("productDiscountPrice", data.productDiscountPrice);
  formData.append("productType[isTop]", !!data["productType.isTop"]);
  formData.append("productType[isBottom]", !!data["productType.isBottom"]);
  formData.append("productType[isTopBottom]", !!data["productType.isTopBottom"]);

  // ProductSizes Checkboxes
  Object.entries(selectedSizes.topSizes).forEach(([size, selected]) => {
    formData.append(`productSizes[topSizes][${size}]`, selected);
  });
  
  Object.entries(selectedSizes.bottomSizes).forEach(([size, selected]) => {
    formData.append(`productSizes[bottomSizes][${size}]`, selected);
  });

  // Additional product details
  formData.append("productDetails[fabric]", data.fabric);
  formData.append("productDetails[countryOrigin]", data.countryOrigin);
  formData.append("additionalInfo[details]", data.details);
  formData.append("additionalInfo[fabricAndCare]", data.fabricAndCare);
  formData.append("additionalInfo[returnAndChange]", data.returnAndChange);
  formData.append("gender", data.gender);
  formData.append("pockets", data.pockets);
  formData.append("inventoryStatus", data.inventoryStatus);
  formData.append("tags", data.tags);

  



    try {
    // console.log("local Form data",formData);

      const response = await axios.post("http://localhost:4000/products/product",formData,{
          headers: { "Content-Type": "multipart/form-data" },
        }
        
      );

      dispatch(setProductId(response.data));
      Swal.fire("Created!", "Product created successfully.", "success");
      navigate("varients");
      reset();
    } catch (error) {
      Swal.fire("Error!", "There was an error: " + error.message, "error");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:4000/products/delete-product/${productId}`
      );
      Swal.fire("Deleted!", "Product deleted successfully.", "success");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error!", "There was an error deleting the product.", "error");
    }
  };

  return (
    <>
      <Sidenav />
      <section className="home-section">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                {...register("categoryId", { required: true })}
                onChange={(e) => handleCategoryChange(e.target.value)}
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
                  {...register("subCategory")}
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
                {...register("productName", { required: true })}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Product Description</label>
              <textarea
                {...register("productDescription", { required: true })}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Product Price</label>
              <input
                type="number"
                {...register("productPrice", { required: true })}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Discount Price</label>
              <input
                type="number"
                {...register("productDiscountPrice")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Product Type Radio Buttons */}
            <div className="mb-4">
              <label className="block text-gray-700">Product Type</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  value="true"
                  // {...register("productType.isTop")}
                  onChange={setIsTop(!isTop)}
                  className="mr-2"
                />
                <label>Top</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  value="true"
                  // {...register("productType.isBottom")}
                  onChange={setIsBottom(!isBottom)}

                  className="mr-2"
                />
                <label>Bottom</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  value="true"
                  // {...register("productType.isTopBottom")}
                  onChange={setIsTopBottom(!isTopBottom)}

                  className="mr-2"
                />
                <label>Top-Bottom</label>
              </div>
            </div>

            {/* Product Sizes as Checkboxes */}
            {/* Top Sizes */}
            <div className="mb-4">
              <label>Top Sizes:</label>
              {topSizes.map((size) => (
                <div key={size} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    id={`topSizes.${size}`}
                    {...register(`topSizes.${size}`)}
                  />
                  <label htmlFor={`topSizes.${size}`}>
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
                    id={`bottomSizes.${size}`}
                    {...register(`bottomSizes.${size}`)}
                  />
                  <label htmlFor={`bottomSizes.${size}`}>{size}</label>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="mb-4">
              <label className="block text-gray-700">Fabric</label>
              <input
                type="text"
                {...register("fabric")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Country of Origin</label>
              <input
                type="text"
                {...register("countryOrigin")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Additional Info */}
            <div className="mb-4">
              <label className="block text-gray-700">Additional Details</label>
              <textarea
                {...register("details")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Fabric and Care</label>
              <textarea
                {...register("fabricAndCare")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Return and Change Policy
              </label>
              <textarea
                {...register("returnAndChange")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                {...register("gender")}
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
                {...register("pockets")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Inventory Status */}
            <div className="mb-4">
              <label className="block text-gray-700">Inventory Status</label>
              <select
                {...register("inventoryStatus")}
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
                {...register("tags")}
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
        <div className="container-fluid">
          <h2 className="text-2xl font-bold mt-8">Products List</h2>
          <table
            border="1"
            className="table table-bordered table-hover"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>DisPrice</th>
                <th>Product Type</th>
                <th>Size</th>
                <th>Fabric</th>
                <th>Country of Origin</th>
                <th>Additional Details</th>
                <th>Gender</th>
                <th>Pockets</th>
                <th>Inventory Status</th>
                <th>Tags</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.categoryId?.name || "N/A"}</td>
                  <td>{product.categoryId?.subCategory || "N/A"}</td>
                  <td>{product.productDiscountPrice || "N/A"}</td>
                  <td>{product.productType?.isBottom || "N/A"}</td>
                  <td>
                    Top:{" "}
                    {Object.keys(product.productSizes?.topSizes || {})
                      .filter((size) => product.productSizes.topSizes[size])
                      .join(", ") || "N/A"}
                    , <br />
                    Bottom:{" "}
                    {Object.keys(product.productSizes?.bottomSizes || {})
                      .filter((size) => product.productSizes.bottomSizes[size])
                      .join(", ") || "N/A"}
                  </td>
                  <td>{product.productDetails?.fabric || "N/A"}</td>
                  <td>{product.productDetails?.countryOrigin || "N/A"}</td>
                  <td>
                    Additional Details: {product.additionalInfo?.details} <br />
                    Fabric and Care: {
                      product.additionalInfo?.fabricAndCare
                    }{" "}
                    <br />
                    Return and Change Policy:{" "}
                    {product.additionalInfo?.returnAndChange}
                  </td>
                  <td>{product.gender}</td>
                  <td>{product.pockets}</td>
                  <td>{product.inventoryStatus}</td>
                  <td>{product.tags || "N/A"}</td>
                  <td>{product.productDescription}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProductForm;




















































































