import React, { useState, useEffect } from "react";
import api from "../services/api";
import './AddCategory.css'

const AddCategory = () => {
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState('')
    const [parent, setParent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('categories/', { name, parent:parent || null})
        .then(() => {
            alert('Category added succesfully!');
            setName('');
            setParent('');
        })
        .catch(error => console.error('Error adding category:', error));
    };

    useEffect(() => {
        api.get('/categories/').then(response => setCategories(response.data))
    }, []);

    return (
        <div className="add-catory-container">
            <h2 className="add-category-title">Add Category</h2>
            <form onSubmit={handleSubmit} className="add-category-form">
                <div className="form-group">
                    <label htmlFor="category-name">Name:</label>
                    <input 
                    id="category-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Category name"
                    />
                </div> 
                <div className="form-group">
                    <label htmlFor="parent-category">Parent Category (ID):</label>
                    <select 
                    id="parent-category"
                    value={parent} 
                    onChange={(e) => setParent(e.target.value)}>
                        <option value="">Select a Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="add-category-button">Add Category</button>
            </form>
        </div>
    );
};


export default AddCategory;