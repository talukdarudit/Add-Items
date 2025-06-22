import React from 'react'
import { useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../CSS/AddItems.css'

const AddItems = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const existingItems = location.state?.existingItems || [];

    const [selectedCoverImage, setSelectedCoverImage] = useState(null);
    const [selectedAdditionalImages, setSelectedAdditionalImages] = useState([]);
    const [preview, setPreview] = useState(null);
    const [additionalPreviews, setAdditionalPreviews] = useState([]);
    const [formData, setFormData] = useState(null);

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedCoverImage(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    }

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setSelectedAdditionalImages(files);

            // Create preview URLs for all selected images
            const previewUrls = files.map(file => URL.createObjectURL(file));
            setAdditionalPreviews(previewUrls);
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            itemName: e.target.itemName.value,
            itemType: e.target.itemType.value,
            itemDescription: e.target.itemDescription.value,
            coverImage: selectedCoverImage,
            additionalImages: selectedAdditionalImages
        }

        setFormData(formData);

        alert('Item added successfully!');

        // Reset the form after submission
        e.target.reset();
        setSelectedCoverImage(null);
        setSelectedAdditionalImages([]);
        setPreview(null);
        setAdditionalPreviews([]);
    }




    return (
        <div className="add-items-container">
            <div className="page-header">
                <button
                    className="view-items-btn"
                    onClick={() => {
                        navigate('/view-items', {
                            state: {
                                newItem: formData,
                                existingItems: existingItems
                            }
                        })
                    }}
                >
                    View Items
                </button>
                <h1 className="page-title">Add New Item</h1>
            </div>

            <form className="add-items-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="itemName">Item Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="itemName"
                        name="itemName"
                        required
                        placeholder="Enter item name"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="itemType">Item Type:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="itemType"
                        name="itemType"
                        required
                        placeholder="Enter item type"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="itemDescription">Item Description:</label>
                    <textarea
                        className="form-textarea"
                        id="itemDescription"
                        name="itemDescription"
                        placeholder="Enter item description(optional)"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="coverImage">Item Cover Image:</label>
                    <input
                        className="file-input"
                        type="file"
                        id="coverImage"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                    />
                    {preview && (
                        <div className="preview-container">
                            <div className="cover-preview">
                                <img
                                    className="preview-image"
                                    src={preview}
                                    alt="Cover preview"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="additionalImages">Additional Images:</label>
                    <input
                        className="file-input"
                        type="file"
                        id="additionalImages"
                        name="additionalImages"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                    />

                    {additionalPreviews.length > 0 && (
                        <div className="preview-container">
                            <div className="preview-grid">
                                {additionalPreviews.map((preview, index) => (
                                    <div key={index} className="additional-preview">
                                        <img
                                            className="preview-image"
                                            src={preview}
                                            alt={`Additional preview ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button className="submit-btn" type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default AddItems