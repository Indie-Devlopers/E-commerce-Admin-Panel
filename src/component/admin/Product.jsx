import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import Swal from 'sweetalert2';
import Sidenav from '../layouts/Sidenav';
import VariantForm from './VariantForm';
import { useDispatch } from 'react-redux';
import { setProductId } from './slice/productSlice'

const ProductForm = () => {
    const dispatch = useDispatch();


    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            variants: [{ color: '', productImage: [] }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'variants'
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [createdProductId, setCreatedProductId] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch Categories from the API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4000/get-categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Handle category change to load subcategories
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        const selectedCategoryData = categories.find((cat) => cat._id === categoryId);
        setSubCategories(selectedCategoryData ? selectedCategoryData.subCategory : []);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append('productName', data.productName);
        formData.append('categoryId', data.categoryId);
        formData.append('subCategory', data.subCategory);
        formData.append('productDescription', data.productDescription);
        formData.append('productPrice', data.productPrice);
        formData.append('productDiscountPrice', data.productDiscountPrice);
        formData.append('productSizes[topSize]', data.topSize);
        formData.append('productSizes[bottomSize]', data.bottomSize);
        formData.append('productDetails[fabric]', data.fabric);
        formData.append('productDetails[countryOrigin]', data.countryOrigin);
        formData.append('additionalInfo[details]', data.details);
        formData.append('additionalInfo[fabricAndCare]', data.fabricAndCare);
        formData.append('additionalInfo[returnAndChange]', data.returnAndChange);
        formData.append('gender', data.gender);
        formData.append('pockets', data.pockets);
        formData.append('inventoryStatus', data.inventoryStatus);
        formData.append('tags', data.tags);
        formData.append('ratings', data.ratings);
        formData.append('reviews', data.reviews);

        // Handle variants (color and images)
        data.variants.forEach((variant, index) => {
            formData.append(`variants[${index}][color]`, variant.color);
            for (let i = 0; i < variant.productImage.length; i++) {
                formData.append(`variants[${index}][productImage]`, variant.productImage[i]);
            }
        });

        try {
           const response = await axios.post('http://localhost:4000/products/product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response);


            const createdProductId = response.data.data._id;
            console.log('Product id se Created',response.data.data._id)

            dispatch(setProductId(response.data.data._id)); //Redux

            Swal.fire('Created!', 'Product created successfully.', 'success');
            reset();
        } catch (error) {
            Swal.fire('Error!', 'There was an error.', 'error');
            console.error('Error:', error);
        }
    };


    // Handle Variants================================

   




    return (
      <>
      <Sidenav/>
       <section className="home-section">
        <div id="header">
          <div className="header uboxed">
            <ul className="logo">
              <li>
                
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
                        <select {...register("subCategory")} className="border border-gray-300 p-2 w-full rounded-md">
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
                    <input type="text" {...register('productName', { required: true })} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Product Description</label>
                    <textarea {...register('productDescription', { required: true })} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Product Price</label>
                    <input type="number" {...register('productPrice', { required: true })} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Discount Price</label>
                    <input type="number" {...register('productDiscountPrice')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                {/* Product Sizes */}
                <div className="mb-4">
                    <label className="block text-gray-700">Top Size</label>
                    <select {...register('topSize')} className="border border-gray-300 p-2 w-full rounded-md">
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
                    <select {...register('bottomSize')} className="border border-gray-300 p-2 w-full rounded-md">
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
                    <input type="text" {...register('fabric')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Country of Origin</label>
                    <input type="text" {...register('countryOrigin')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                {/* Additional Info */}
                <div className="mb-4">
                    <label className="block text-gray-700">Additional Details</label>
                    <textarea {...register('details')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Fabric and Care</label>
                    <textarea {...register('fabricAndCare')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Return and Change Policy</label>
                    <textarea {...register('returnAndChange')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select {...register('gender')} className="border border-gray-300 p-2 w-full rounded-md">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {/* Pockets */}
                <div className="mb-4">
                    <label className="block text-gray-700">Pockets</label>
                    <input type="text" {...register('pockets')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                {/* Inventory Status */}
                <div className="mb-4">
                    <label className="block text-gray-700">Inventory Status</label>
                    <select {...register('inventoryStatus')} className="border border-gray-300 p-2 w-full rounded-md">
                        <option value="">Select Status</option>
                        <option value="inStock">In Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                        <option value="preOrder">Pre Order</option>
                    </select>
                </div>

                {/* Tags */}
                <div className="mb-4">
                    <label className="block text-gray-700">Tags</label>
                    <select {...register('tags')} className="border border-gray-300 p-2 w-full rounded-md">
                        <option value="">Select Tag</option>
                        <option value="trending">Trending</option>
                        <option value="new">New</option>
                    </select>
                </div>

                {/* Ratings */}
                <div className="mb-4">
                    <label className="block text-gray-700">Ratings</label>
                    <input type="number" min="1" max="5" {...register('ratings')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                {/* Reviews */}
                <div className="mb-4">
                    <label className="block text-gray-700">Reviews</label>
                    <textarea {...register('reviews')} className="border border-gray-300 p-2 w-full rounded-md" />
                </div>

                {/* Variants */}
                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-xl font-bold">Variants</label>
                    {fields.map((item, index) => (
                        <div key={item.id} className="border p-4 mb-4 rounded-md">
                            <div className="flex justify-between items-center">
                                <h4 className="text-lg font-semibold">Variant {index + 1}</h4>
                                <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Color</label>
                                <input
                                    type="text"
                                    {...register(`variants[${index}].color`, { required: true })}
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Images</label>
                                <input
                                    type="file"
                                    {...register(`variants[${index}].productImage`, { required: false })}
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ color: '', productImage: [] })} className="bg-green-500 text-white p-2 rounded-md">
                        Add Variant
                    </button>
                </div> */}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
                    Create Product
                </button>
            </form>
        </div>


       {/* <VariantForm productID={createdProductId}/> */}
        
        </section>
        </>
    );
};

export default ProductForm;
