import { useState } from 'react';
import axios from 'axios';
import Sidenav from '../layouts/Sidenav';
// import Cards from '../layouts/Cards';

const Postdata = () => {
  const [productData, setProductData] = useState({
    productName: '',
    categoryId: '',
    productDescription: '',
    productPrice: '',
    productDiscountPrice: '',
    productSizes: {
      topSize: '',
      bottomSize: '',
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
    variants: [
      {
        color: '',
        productImage: [''],
      },
    ],
    inventoryStatus: '',
    tags: '',
    ratings: '',
    reviews: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizesChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      productSizes: {
        ...prevData.productSizes,
        [name]: value,
      },
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      productDetails: {
        ...prevData.productDetails,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://your-api-url/products', productData);
      console.log('Product submitted:', response.data);
      // Reset the form or handle success as needed
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <>
      <Sidenav />
      <section className="home-section">
        <div id="header">
          <div className="header uboxed">
            <ul className="logo">
              <li>
                <img src="https://byjaris.com/img/byjaris.svg" alt="Fimanbol" />
              </li>
            </ul>
            <ul className="menu">
              <li>
                <img src="https://byjaris.com/code/icons/home-alt.svg" alt="Fimanbol" />
              </li>
              <li>
                <img src="https://byjaris.com/code/icons/menu-alt.svg" alt="Fimanbol" />
              </li>
              <li>
                <div id="lang">
                  <div className="selected">
                    <img src="https://byjaris.com/code/icons/flag-en.svg" alt="English" />
                  </div>
                  <div className="options">
                    <a href="#">
                      <img src="https://byjaris.com/code/icons/flag-en.svg" alt="English" />
                    </a>
                    <a href="#">
                      <img src="https://byjaris.com/code/icons/flag-pt.svg" alt="Português" />
                    </a>
                    <a href="#">
                      <img src="https://byjaris.com/code/icons/flag-es.svg" alt="Español" />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-space" />
        <div className="text">Add Product</div>

        {/* <Cards /> */}

        {/* Tailwind Grid Layout Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">

          <div className="col-span-1">
            <label className="block text-sm font-medium">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Category ID:</label>
            <input
              type="text"
              name="categoryId"
              value={productData.categoryId}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border-blue shadow-sm"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Product Description:</label>
            <textarea
              name="productDescription"
              value={productData.productDescription}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Product Price:</label>
            <input
              type="number"
              name="productPrice"
              value={productData.productPrice}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Product Discount Price:</label>
            <input
              type="number"
              name="productDiscountPrice"
              value={productData.productDiscountPrice}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Top Size:</label>
            <select
              name="topSize"
              value={productData.productSizes.topSize}
              onChange={handleSizesChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            >
              <option value="">Select size</option>
              <option value="m">M</option>
              <option value="s">S</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="2xl">2XL</option>
              <option value="3xl">3XL</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Bottom Size:</label>
            <select
              name="bottomSize"
              value={productData.productSizes.bottomSize}
              onChange={handleSizesChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            >
              <option value="">Select size</option>
              <option value="28">28</option>
              <option value="30">30</option>
              <option value="32">32</option>
              <option value="34">34</option>
              <option value="36">36</option>
              <option value="38">38</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Fabric:</label>
            <input
              type="text"
              name="fabric"
              value={productData.productDetails.fabric}
              onChange={handleDetailsChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Country of Origin:</label>
            <input
              type="text"
              name="countryOrigin"
              value={productData.productDetails.countryOrigin}
              onChange={handleDetailsChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Gender:</label>
            <select
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Pockets:</label>
            <input
              type="text"
              name="pockets"
              value={productData.pockets}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium">Inventory Status:</label>
            <select
              name="inventoryStatus"
              value={productData.inventoryStatus}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            >
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Tags:</label>
            <input
              type="text"
              name="tags"
              value={productData.tags}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Ratings:</label>
            <input
              type="number"
              name="ratings"
              value={productData.ratings}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Reviews:</label>
            <input
              type="text"
              name="reviews"
              value={productData.reviews}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-md border shadow-sm"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
            >
              Submit
            </button>
          </div>

          
        </form>
      </section>
    </>
  );
};

export default Postdata;
