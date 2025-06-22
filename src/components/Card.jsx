import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import '../CSS/Card.css'

const Card = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Combine cover image and additional images
    const allImages = []
    if (item.coverImage) {
        allImages.push(item.coverImage)
    }
    if (item.additionalImages && item.additionalImages.length > 0) {
        allImages.push(...item.additionalImages)
    }

    const openModal = () => {
        setIsModalOpen(true)
        setCurrentImageIndex(0)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
        )
    }

    const handleEnquire = () => {
        alert(`Enquiry submitted for ${item.itemName}`)
        const serviceID = 'service_paos87v'
        const templateID = 'template_o6v840o'
        const publicKey = 'rQOlMPmj_iyxSBL6w'
        const templateParams = {
            itemName: item.itemName,
            itemType: item.itemType,
            itemDescription: item.itemDescription 
        }

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text)
            })
            .catch((err) => {
                console.error('FAILED...', err)
            })
    }

    return (
        <>
            <div className="card" onClick={openModal}>
                {item.coverImage ? (
                    <div className="cover-image-container">
                        <img
                            src={URL.createObjectURL(item.coverImage)}
                            alt={item.itemName}
                            className="cover-image"
                        />
                    </div>
                ) : (
                    <div className="no-image">
                        Image Not Available
                    </div>
                )}
                <p className="item-name">{item.itemName}</p>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ×
                        </button>

                        <div className="modal-body">
                            {/* Image Carousel */}
                            <div className="carousel-container">
                                {allImages.length > 0 ? (
                                    <>
                                        <div className="carousel-main">
                                            <img
                                                src={URL.createObjectURL(allImages[currentImageIndex])}
                                                alt={`${item.itemName} - Image ${currentImageIndex + 1}`}
                                                className="carousel-image"
                                            />

                                            {allImages.length > 1 && (
                                                <>
                                                    <button
                                                        className="carousel-btn carousel-prev"
                                                        onClick={prevImage}
                                                    >
                                                        ‹
                                                    </button>
                                                    <button
                                                        className="carousel-btn carousel-next"
                                                        onClick={nextImage}
                                                    >
                                                        ›
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="no-image-modal">
                                        No Images Available
                                    </div>
                                )}
                            </div>

                            {/* Item Details */}
                            <div className="item-details">
                                <h2 className="item-title">{item.itemName}</h2>

                                <div className="item-info">
                                    <span className="item-type">{item.itemType}</span>

                                    {item.itemDescription && (
                                        <p className="item-description">{item.itemDescription}</p>
                                    )}
                                </div>

                                <button className="enquire-btn" onClick={handleEnquire}>
                                    Enquire
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Card