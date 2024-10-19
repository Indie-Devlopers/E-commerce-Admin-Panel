import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Demo = () => {
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [landingImage, setLandingImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Define fetchCategories outside of useEffect
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get-categories");
      console.log("Fetched categories:", response.data); // Log the fetched categories
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("subCategory", subCategory);
    formData.append("landingImage", landingImage);

    try {
      const response = await axios.post("http://localhost:4000/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Category created:", response.data);
      // Reset form fields
      setName('');
      setSubCategory('');
      setLandingImage(null);
      // Re-fetch categories after creation
      fetchCategories(); 
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Category</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategory">
            Sub Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subCategory"
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landingImage">
            Landing Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="landingImage"
            type="file"
            onChange={(e) => setLandingImage(e.target.files[0])}
          />
        </div>

        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Category
        </button>
      </form>

      <h1 className="text-3xl font-bold mb-4">Categories</h1>

      <ul>
        {Array.isArray(categories) ? (
          categories.map((category) => (
            <li key={category._id}>
                <li>{category.name}</li>
                {/* <li>{category.name}</li>
                <li>{category.name}</li> */}
            </li>
          ))
        ) : (
          <li>No categories available</li>
        )}
      </ul>
    </div>
  );
}

export default Demo;
