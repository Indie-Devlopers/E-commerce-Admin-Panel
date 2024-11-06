import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Sidenav from "../layouts/Sidenav";
// import VariantForm from './VariantForm';
import { useDispatch } from "react-redux";
import { setProductId } from "./slice/productSlice";
import { useNavigate } from "react-router-dom";

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
 const navigate = useNavigate()
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
      const response = await axios.get(
        "https://unicodes-uniform-e-com-site-backend.onrender.com/products/get-products"
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
  
    // Basic product details
    formData.append("productName", data.productName);
    formData.append("categoryId", data.categoryId);
    formData.append("subCategory", data.subCategory);
    formData.append("productDescription", data.productDescription);
    formData.append("productPrice", data.productPrice);
    formData.append("productDiscountPrice", data.productDiscountPrice);
  
    // Product Type
    formData.append("productType[isTop]", !!data['productType.isTop']);
    formData.append("productType[isBottom]", !!data['productType.isBottom']);
    formData.append("productType[isTopBottom]", !!data['productType.isTopBottom']);
  
    // Product Sizes
    const topSizes = ['m', 's', 'l', 'xl', '2xl', '3xl'];
    const bottomSizes = ['28', '30', '32', '34', '36', '38'];
  
    topSizes.forEach(size => {
      formData.append(`productSizes[topSizes][${size}]`, !!data[`topSizes.${size}`]);
    });
  
    bottomSizes.forEach(size => {
      formData.append(`productSizes[bottomSizes][${size}]`, !!data[`bottomSizes.${size}`]);
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
    formData.append("ratings", data.ratings);
    formData.append("reviews", data.reviews);
  
    // Convert FormData to an object for easier logging
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    console.log("Submitting form data:", formObject); // Log the form data
  
    try {
      const response = await axios.post(
        "https://unicodes-uniform-e-com-site-backend.onrender.com/products/product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      console.log(response);
      dispatch(setProductId(response.data));
      Swal.fire("Created!", "Product created successfully.", "success");
      navigate("varients");
      reset();
    } catch (error) {
      Swal.fire("Error!", "There was an error: " + error.message, "error");
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };
  
  

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`https://unicodes-uniform-e-com-site-backend.onrender.com/products/delete-product/${productId}`);
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
  . 


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
