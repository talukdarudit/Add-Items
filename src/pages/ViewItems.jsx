import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/Card';
import '../CSS/ViewItems.css';

const ViewItems = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { newItem, existingItems = [] } = location.state || {};

    const allItems = newItem ? [...existingItems, newItem] : existingItems;

    return (
        <div className="view-items-container">
            {/* Header Section */}
            <div className="header-section">
                <div className="header-content">
                    <h1 className="title">Your Collection</h1>
                    <button 
                        className="add-items-btn"
                        onClick={() => navigate('/', {
                            state: { existingItems: allItems }
                        })}
                    >
                        Add New Items
                    </button>
                </div>
            </div>

            {/* Items Grid */}
            <div className="content-section">
                {allItems.length === 0 ? (
                    <div className="empty-state">
                        <h3>No items yet</h3>
                        <p>Your collection is waiting to be filled with amazing items!</p>
                    </div>
                ) : (
                    <div className="items-container">
                        {allItems.map((item, index) => (
                                <Card key={index} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewItems