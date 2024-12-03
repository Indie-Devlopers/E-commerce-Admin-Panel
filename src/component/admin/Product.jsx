import { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../layouts/Sidenav";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productDefaultPrice: "",
    productActualPrice: "",
    productDiscountPrice: {
      "250g": null,
      "500g": null,
      "1kg": null,
      "2kg": null,
      "3kg": null,
    },
    productWeight: {
      "250g": false,
      "500g": false,
      "1kg": false,
      "2kg": false,
      "3kg": false,
    },
    productQuantity: 1,
    productImage: [],
    AdditionalInformation: {
      returnPolicy: "",
      shipping: "",
    },
    productStatus: "inStock",
    averageRating: 4,
    totalRatings: 0,
    totalReviews: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleWeightChange = (e) => {
    const { name, checked } = e.target; // Get the name (weight) and checked status
    console.log(`Checkbox for ${name} is now ${checked}`); // Log the checkbox change
    setProductData((prevData) => {
      const updatedWeight = {
        ...prevData.productWeight,
        [name]: checked, // Update the weight to true or false
      };
      console.log("Updated productWeight:", updatedWeight); // Log the updated weight object
      return {
        ...prevData,
        productWeight: updatedWeight,
        productDiscountPrice: {
          ...prevData.productDiscountPrice,
          [name]: checked ? prevData.productDiscountPrice[name] : null, // Reset price if unchecked
        },
      };
    });
  };

  const handleWeightPriceChange = (e, weight) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      productDiscountPrice: {
        ...prevData.productDiscountPrice,
        [weight]: value,
      },
      productWeight: {
        ...prevData.productWeight,
        [weight]: value !== "" && value !== null,
      },
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({
      ...productData,
      productImage: files,
    });
  };

  // get the Product

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://spices-e-com-site-backend-2.onrender.com/products/get-product"
        );

        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   for (const key in productData) {
  //     if (key === "productImage") {
  //       productData.productImage.forEach((file) => {
  //         formData.append("productImage", file);
  //       });
  //     } else if (key === "productWeight") {
  //       for (const weight in productData.productWeight) {
  //         if (productData.productWeight[weight]) {
  //           formData.append(
  //             `productDiscountPrice[${weight}]`,
  //             productData.productDiscountPrice[weight]
  //           );
  //         }
  //       }
  //     } else {
  //       formData.append(key, productData[key]);
  //     }
  //   }

  console.log("Product Weight:", productData.productWeight);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append the product data to FormData
    for (const key in productData) {
      if (key === "productImage") {
        productData.productImage.forEach((file) => {
          formData.append("productImage", file);
        });
      } else if (key === "productWeight") {
        for (const weight in productData.productWeight) {
          if (productData.productWeight[weight]) {
            formData.append(
              `productDiscountPrice[${weight}]`,
              productData.productDiscountPrice[weight]
            );
          }
        }
      } else {
        formData.append(key, productData[key]);
      }
    }

    try {
      const response = productId
        ? await axios.put(
            `https://spices-e-com-site-backend-2.onrender.com/products/update-product/${productId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
        : await axios.post("https://spices-e-com-site-backend-2.onrender.com/products/product", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      console.log("Update Data", response.data);
      Swal.fire("Product!", "Product updated successfully.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an error.", "error");
      console.error("Error updating product:", error);
    }
  };

  // Delete Product

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://spices-e-com-site-backend-2.onrender.com/products/delete-product/${id}`
        );
        Swal.fire("Deleted!", response.data.message, "success");
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error", "There was an error deleting the product", "error");
      }
    }
  };

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
        <div className="text">Add Category</div>
        <div className="container mt-5">
          <h2>Create Product</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
                placeholder="Product Name"
                value={productData.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Product Description</label>
              <textarea
                className="form-control"
                id="productDescription"
                name="productDescription"
                placeholder="Product Description"
                value={productData.productDescription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDefaultPrice">Default Price</label>
              <input
                type="number"
                className="form-control"
                id="productDefaultPrice"
                name="productDefaultPrice"
                placeholder="Default Price"
                value={productData.productDefaultPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="productActualPrice">Actual Price</label>
              <input
                type="number"
                className="form-control"
                id="productActualPrice"
                name="productActualPrice"
                placeholder="Actual Price"
                value={productData.productActualPrice}
                onChange={handleChange}
                required
              />
            </div>
            <h4>Select Product Weight:</h4>
            <div className="form-check" >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="productWeight"
                  name="productWeight"
                  checked={productData.productWeight}
                  onChange={handleWeightChange}
                />
                <label className="form-check-label" >
                  250
                </label>
                </div>
            <h4>Select Product Weight & price:</h4>
            {Object.keys(productData.productWeight).map((weight) => (
              <div className="form-check" key={weight}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={weight}
                  name={weight}
                  checked={productData.productWeight[weight]}
                  onChange={handleWeightChange}
                />
                <label className="form-check-label" htmlFor={weight}>
                  {weight}
                </label>
                {productData.productWeight[weight] && (
                  <input
                    type="number"
                    className="form-control mt-2"
                    placeholder={`Price for ${weight}`}
                    value={productData.productDiscountPrice[weight] || ""}
                    onChange={(e) => handleWeightPriceChange(e, weight)}
                  />
                )}
              </div>
            ))}
            <div className="form-group">
              <label htmlFor="productQuantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="productQuantity"
                name="productQuantity"
                placeholder="Quantity"
                value={productData.productQuantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="productImage">Product Image</label>
              <input
                type="file"
                className="form-control"
                id="productImage"
                name="productImage"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="returnPolicy">Return Policy</label>
              <input
                type="text"
                className="form-control"
                id="returnPolicy"
                name="returnPolicy"
                placeholder="Return Policy"
                value={productData.AdditionalInformation.returnPolicy || ""}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    AdditionalInformation: {
                      ...prevData.AdditionalInformation,
                      returnPolicy: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipping">Shipping Info</label>
              <input
                type="text"
                className="form-control"
                id="shipping"
                name="shipping"
                placeholder="Shipping Info"
                value={productData.AdditionalInformation.shipping}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    AdditionalInformation: {
                      ...productData.AdditionalInformation,
                      shipping: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="productStatus">Product Status</label>
              <select
                className="form-control"
                id="productStatus"
                name="productStatus"
                value={productData.productStatus}
                onChange={handleChange}
                required
              >
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
            {/* <button type="submit" className="btn btn-primary">
              Create Product
            </button> */}
            <button type="submit" className="btn btn-primary">
              {productId ? "Update Product" : " Create Product"}
            </button>
          </form>
        </div>

        <div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Default Price</th>
                <th>Actual Price</th>
                <th>Discount Price</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Return Policy</th>
                <th>Shipping</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.productDefaultPrice}</td>
                    <td>{product.productActualPrice}</td>
                    <td>
                      {Object.keys(product.productDiscountPrice).map(
                        (weight, index) => (
                          <p key={index}>
                            {weight}: {product.productDiscountPrice[weight]}
                          </p>
                        )
                      )}
                    </td>
                    <td>
                      <td>
                        {Object.keys(product.productWeight).map(
                          (weight, index) => (
                            <p key={index}>
                              {weight}:{" "}
                              {product.productWeight[weight] ? "Yes" : "No"}
                            </p>
                          )
                        )}
                      </td>
                    </td>
                    <td>{product.productQuantity}</td>
                    <td>
                      {product.productImage.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={product.productName}
                          style={{ width: "50px", height: "50px" }}
                        />
                      ))}
                    </td>
                    <td>
                      {product?.returnPolicy || "No return policy provided"}
                    </td>
                    <td>{product.shipping}</td>
                    <td>{product.productStatus}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProductForm;
