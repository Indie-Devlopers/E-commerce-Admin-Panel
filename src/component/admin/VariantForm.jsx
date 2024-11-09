import { useState, useRef } from 'react';
import axios from 'axios';
import Sidenav from '../layouts/Sidenav';
import { useSelector } from 'react-redux';

const VariantForm = () => {
  const productID = useSelector((state) => state.product.productId);
  console.log('Product ID:', productID);

  const [variants, setVariants] = useState([{ color: '', productImages: [], imagePreviews: [] }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');
  const imageInputRefs = useRef([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB file size limit

  const handleImageChange = (index, imgIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setImageError('File size must be less than 5MB.');
        return;
      } else {
        setImageError('');
      }

      const updatedVariants = [...variants];
      updatedVariants[index].productImages[imgIndex] = file;
      updatedVariants[index].imagePreviews[imgIndex] = URL.createObjectURL(file);
      setVariants(updatedVariants);
    }
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { color: '', productImages: [], imagePreviews: [] }]);
  };

  const handleRemoveImage = (index, imgIndex, e) => {
    const updatedVariants = [...variants];
    updatedVariants[index].productImages[imgIndex] = null;
    updatedVariants[index].imagePreviews[imgIndex] = null;
    setVariants(updatedVariants);

    // Clear the file input field using ref
    imageInputRefs.current[`${index}-${imgIndex}`].value = ''; 
  };

  const handleVariantsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImageError('');

    // Validate that each variant has at least 1 image
    for (let variant of variants) {
      const nonEmptyImages = variant.productImages.filter((img) => img);
      if (nonEmptyImages.length < 1) {
        setError('Each variant must have at least 1 image.');
        setLoading(false);
        return;
      }
    }

    try {
      for (let i = 0; i < variants.length; i++) {
        const formData = new FormData();
        formData.append('productId', productID.data._id);
        formData.append('color', variants[i].color);
        variants[i].productImages.forEach((image) => {
          if (image) formData.append('productImage', image);
        });

        const response = await axios.post('https://unicodes-uniform-e-com-site-backend.onrender.com/variant', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(`Variant ${i + 1} created:`, response.data);
      }

      alert('We still working this "To see products Please go to View Products page"');
      setVariants([{ color: '', productImages: [], imagePreviews: [] }]);
    } catch (error) {
      console.error('Error creating variant:', error);
      setError('Failed to create variants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidenav />
      <section className="home-section">
        <div id="header">
          <div className="header uboxed">
            {/* Header content here */}
          </div>
        </div>

        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mt-5 pt-3 mb-4">Add Variants</h2>
          <h2 className="text-xl font-bold mb-4">{productID.data.productName}</h2>
          <form onSubmit={handleVariantsSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            {imageError && <div className="alert alert-danger">{imageError}</div>}

            {variants.map((variant, index) => (
              <div key={index} className="mb-5">
                <h3 className='font-bold'>Variant {index + 1}</h3>

                <div className="mb-3">
                  <label htmlFor={`color-${index}`} className="form-label">Color</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`color-${index}`}
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                    required
                  />
                </div>

                {/* Separate image fields for up to 4 images */}
                {[0, 1, 2, 3].map((imgIndex) => (
                  <div className="mb-3" key={imgIndex}>
                    <label htmlFor={`productImage-${index}-${imgIndex}`} className="form-label">
                      Product Image {imgIndex + 1} (optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id={`productImage-${index}-${imgIndex}`}
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, imgIndex, e)}
                      ref={(el) => (imageInputRefs.current[`${index}-${imgIndex}`] = el)}
                    />
                    {variant.imagePreviews[imgIndex] && (
                      <div className="mt-2 d-flex align-items-center">
                        <img
                          src={variant.imagePreviews[imgIndex]}
                          alt={`preview-${imgIndex}`}
                          className="img-thumbnail"
                          style={{ width: '100px', height: '100px' }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger ms-2"
                          onClick={(e) => handleRemoveImage(index, imgIndex, e)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}

              </div>
            ))}

            <button type="button" className="btn btn-secondary mr-2" onClick={handleAddVariant}>
              Add More Variant
            </button>

            <button type="submit" className="btn btn-primary font-bold" disabled={loading}>
              {loading ? 'Saving...' : 'Save Variants'}
            </button>
          </form>

          <h2 className="text-2xl font-bold mt-5">Current Variants</h2>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Variant Color</th>
                <th>Product Images</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={index}>
                  <td>{variant.color}</td>
                  <td>
                    {variant.imagePreviews.length > 0 ? (
                      variant.imagePreviews.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt="preview"
                          className="img-thumbnail"
                          style={{ width: '50px', height: '50px', marginRight: '5px' }}
                        />
                      ))
                    ) : (
                      'No images uploaded'
                    )}
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

export default VariantForm;  