import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'; // Importing useForm
import Swal from 'sweetalert2'; 
import Sidenav from '../layouts/Sidenav';

const Category = () => {
    const [categories, setCategories] = useState([]); 
    const [isEditing, setIsEditing] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://unicodes-uniform-e-com-site-backend.onrender.com/get-categories');
            if (Array.isArray(response.data.data)) {
                setCategories(response.data.data);
            } else {
                console.error('Expected an array but received:', response.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]); 
        }
    };

    // Handle form submission
    const onSubmit = async (data) => {
        const formData = new FormData(); 
        formData.append('name', data.name);
        formData.append('subCategory', data.subCategory);
        if (data.landingImage.length > 0) {
            formData.append('landingImage', data.landingImage[0]); 
        }

        try {
            if (isEditing) {
                await axios.patch(`https://unicodes-uniform-e-com-site-backend.onrender.com/update-category/${editCategoryId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Swal.fire('Updated!', 'Category updated successfully.', 'success');
            } else {
                await axios.post('https://unicodes-uniform-e-com-site-backend.onrender.com/category', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Swal.fire('Created!', 'Category created successfully.', 'success');
            }
            reset();
            setIsEditing(false);
            fetchCategories(); 
        } catch (error) {
            Swal.fire('Error!', 'There was an error.', 'error');
            console.error('Error', error);
        }
    };

    // Handle edit category
    const handleEdit = (category) => {
        setEditCategoryId(category._id);
        reset({
            name: category.name,
            subCategory: category.subCategory,
        });
        setIsEditing(true);
    };

    // Handle delete category
    const handleDelete = async (id) => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmed.isConfirmed) {
            try {
                await axios.delete(`https://unicodes-uniform-e-com-site-backend.onrender.com/delete-category/${id}`);
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
                fetchCategories();
            } catch (error) {
                Swal.fire('Error!', 'There was an error deleting the category.', 'error');
                console.error('Error', error);
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
                <div className="text">Add Category</div>

                <div className="container mx-auto p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="name">Category Name:</label>
                            <input
                                type="text"
                                name="name"
                                {...register("name", { required: true })}
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="subCategory">Sub Category:</label>
                            <input
                                type="text"
                                name="subCategory"
                                {...register("subCategory")}
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>

                        {/* Show current landing image during editing */}
                        {isEditing && categories.find(c => c._id === editCategoryId)?.landingImage && (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Current Landing Image:</label>
                                <img
                                    src={categories.find(c => c._id === editCategoryId).landingImage}
                                    alt="Current Landing"
                                    className="w-26 h-16 object-cover"
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="landingImage">
                                {isEditing ? 'Upload New Image (if any):' : 'Landing Image:'}
                            </label>
                            <input
                                type="file"
                                name="landingImage"
                                {...register("landingImage")}
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            {isEditing ? 'Update Category' : 'Create Category'}
                        </button>
                    </form>

                    {/* Display Categories Table */}
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Landing Image</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Sub Category</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category._id}>
                                        <td className="border border-gray-300 p-2">
                                            {category.landingImage && (
                                                <img
                                                    src={category.landingImage}
                                                    alt={category.name}
                                                    className="w-26 h-16 object-cover"
                                                />
                                            )}
                                        </td>
                                        <td className="border border-gray-300 p-2">{category.name}</td>
                                        <td className="border border-gray-300 p-2">{category.subCategory}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="bg-yellow-500 text-white p-1 rounded-md mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                className="bg-red-500 text-white p-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center border border-gray-300 p-2">
                                        No categories available.
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

export default Category;
