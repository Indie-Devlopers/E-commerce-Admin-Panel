import React, { useState } from 'react';
import axios from 'axios';
import Sidenav from '../layouts/Sidenav';
import { useSelector } from 'react-redux';

const VariantForm = () => {
  const productID = useSelector((state) => state.product.productId);
  console.log('Product ID:', productID);

  const [variants, setVariants] = useState([{ color: '', productImages: [], imagePreview: [] }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const updatedVariants = [...variants];
    updatedVariants[index].productImages = files;
    updatedVariants[index].imagePreview = files.map(file => URL.createObjectURL(file));
    setVariants(updatedVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { color: '', productImages: [], imagePreview: [] }]);
  };

  const handleVariantsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      for (let i = 0; i < variants.length; i++) {
        const formData = new FormData();
        formData.append('productId', productID);
        formData.append('color', variants[i].color);
        variants[i].productImages.forEach((image) => {
          formData.append('productImage', image);
        });

        const response = await axios.post('http://localhost:4000/products/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(`Variant ${i + 1} created:`, response.data);
      }

      // Clear all variants after submission
      setVariants([{ color: '', productImages: [], imagePreview: [] }]);
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
          <h2 className="text-2xl font-bold mb-4">Add Variants</h2>

          <form onSubmit={handleVariantsSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            {variants.map((variant, index) => (
              <div key={index} className="mb-5">
                <h3>Variant {index + 1}</h3>

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

                <div className="mb-3">
                  <label htmlFor={`productImages-${index}`} className="form-label">Product Images</label>
                  <input
                    type="file"
                    className="form-control"
                    id={`productImages-${index}`}
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    required
                  />
                </div>

                {variant.imagePreview.length > 0 && (
                  <div className="mb-3">
                    <h5>Image Preview:</h5>
                    <div className="d-flex">
                      {variant.imagePreview.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt="preview"
                          className="img-thumbnail me-2"
                          style={{ width: '100px', height: '100px' }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button type="button" className="btn btn-secondary mb-4" onClick={handleAddVariant}>
              Add Variant
            </button>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Create Variants'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default VariantForm;
