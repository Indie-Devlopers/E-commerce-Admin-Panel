import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Sidenav from "../layouts/Sidenav";
// import VariantForm from './VariantForm';
import { useDispatch } from "react-redux";
import { setProductId } from "./slice/productSlice";

const ProductForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      variants: [{ color: "", productImage: [] }],
    },
  });
  // const { fields, append, remove } = useFieldArray({
  //     control,
  //     name: 'variants'
  // });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // const [createdProductId, setCreatedProductId] = useState('');

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch Categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get-categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch Products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/products/get-products"
      );
      console.log(response.data.data);
      setProducts(response.data.data); // Assuming response.data.data contains the list of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle category change to load subcategories
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
    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("categoryId", data.categoryId);
    formData.append("subCategory", data.subCategory);
    formData.append("productDescription", data.productDescription);
    formData.append("productPrice", data.productPrice);
    formData.append("productDiscountPrice", data.productDiscountPrice);
    formData.append("productSizes[topSize]", data.topSize);
    formData.append("productSizes[bottomSize]", data.bottomSize);
    formData.append("productDetails[fabric]", data.fabric);
    formData.append("productDetails[countryOrigin]", data.countryOrigin);
    formData.append("additionalInfo[details]", data.details);
    formData.append("additionalInfo[fabricAndCare]", data.fabricAndCare);
    formData.append("additionalInfo[returnAndChange]", data.returnAndChange);
    formData.append("gender", data.gender);
    formData.append("pockets", data.pockets);
    formData.append("inventoryStatus", data.inventoryStatus);
    formData.append("tags", data.tags);
    formData.append("ratings", data.ratings);
    formData.append("reviews", data.reviews);

    // Handle variants (color and images)
    // data.variants.forEach((variant, index) => {
    //     formData.append(`variants[${index}][color]`, variant.color);
    //     for (let i = 0; i < variant.productImage.length; i++) {
    //         formData.append(`variants[${index}][productImage]`, variant.productImage[i]);
    //     }
    // });

    try {
      const response = await axios.post(
        "http://localhost:4000/products/product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);

      // const createdProductId = response.data.data._id;
      console.log("Product id se Created", response.data.data._id);

      dispatch(setProductId(response.data.data._id));

      Swal.fire("Created!", "Product created successfully.", "success");
      reset();
    } catch (error) {
      Swal.fire("Error!", "There was an error.", "error");
      console.error("Error:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/products/delete-product/${productId}`);
      console.log(response.data);
      Swal.fire("Deleted!", "Product deleted successfully.", "success");
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire("Error!", "There was an error deleting the product.", "error");
    }
  };
  // Handle Variants================================

  return (
    <>
      <Sidenav />
      <section className="home-section">
        <div id="header">
          <div className="header uboxed">
            <ul className="logo">
              <li></li>
            </ul>
            <ul className="menu">
              <li>
                <img
                  src="https://byjaris.com/code/icons/home-alt.svg"
                  alt="Fimanbol"
                />
              </li>
              <li>
                <img
                  src="https://byjaris.com/code/icons/menu-alt.svg"
                  alt="Fimanbol"
                />
              </li>
              <li>
                <div id="lang">
                  <div className="selected">
                    <img
                      src="https://byjaris.com/code/icons/flag-en.svg"
                      alt="English"
                    />
                  </div>
                  <div className="options">
                    <a href="#">
                      <img
                        src="https://byjaris.com/code/icons/flag-en.svg"
                        alt="English"
                      />
                    </a>
                    <a href="#">
                      <img
                        src="https://byjaris.com/code/icons/flag-pt.svg"
                        alt="Português"
                      />
                    </a>
                    <a href="#">
                      <img
                        src="https://byjaris.com/code/icons/flag-es.svg"
                        alt="Español"
                      />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-space" />

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

            {/* Product Sizes */}
            <div className="mb-4">
              <label className="block text-gray-700">Top Size</label>
              <select
                {...register("topSize")}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Top Size</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="2xl">2XL</option>
                <option value="3xl">3XL</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Bottom Size</label>
              <select
                {...register("bottomSize")}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Bottom Size</option>
                <option value="28">28</option>
                <option value="30">30</option>
                <option value="32">32</option>
                <option value="34">34</option>
                <option value="36">36</option>
                <option value="38">38</option>
              </select>
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

            {/* Ratings */}
            <div className="mb-4">
              <label className="block text-gray-700">Ratings</label>
              <input
                type="number"
                min="1"
                max="5"
                {...register("ratings")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            {/* Reviews */}
            <div className="mb-4">
              <label className="block text-gray-700">Reviews</label>
              <textarea
                {...register("reviews")}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full"
            >
              Create Product
            </button>
          </form>
        </div>

        {/* <VariantForm productID={createdProductId}/> */}
        {/* Product Table */}
        <div className="container-fluid">
        <h2 className="text-2xl font-bold mt-8">Products List</h2>
        <table border="1" className="table table-bordered table-hover "   style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>SubCategory</th>
              <th>DisPrice</th>
              <th>Size</th>
              <th>Fabric</th>
              <th>Country of Origin</th>
              <th>Additional Details</th>
              {/* <th>Fabric and Care</th>
              <th>Return and Change Policy</th> */}
              <th>Gender</th>
              <th>Pockets</th>
              <th>Inventorys</th>
              <th>Tags</th>
              <th>Ratings</th>
              <th>Reviews</th>
              <th>Description</th>
              {/* <th>varient</th> */}
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
                <td>
                  Top: {product.productSizes?.topSize || "N/A"}, <br /> Bottom:{" "}
                  {product.productSizes?.bottomSize || "N/A"}
                </td>
                <td>{product.productDetails?.fabric || "N/A"}</td>
                <td>{product.productDetails?.countryOrigin || "N/A"}</td>
                <td>Additional Details:{product.additionalInfo?.details} <br />
                Fabric and Care:{product.additionalInfo?.fabricAndCare} <br />
                Return and Change Policy: {product.additionalInfo?.returnAndChange}</td>
                <td>{product.gender}</td>
                <td>{product.pockets}</td>
                <td>{product.inventoryStatus}</td>
                <td>{product.tags || "N/A"}</td>
                <td>{product.ratings || "N/A"}</td>
                <td>{product.reviews || "N/A"}</td>
                <td>{product.productDescription}</td>
                {/* <td>{product.variants?.color || "N/A"}</td> */}
                <td> <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-600 hover:underline">
                      Delete</button>
                {/* <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button> */}
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
