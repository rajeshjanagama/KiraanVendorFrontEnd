import React, { useState } from 'react'
import{API_URL} from '../../data/apiPath';

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(true);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [count, setCount] = useState(null);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        } else {
            setCategory([...category, value])
        }
    }

    const handleBestSeller = (event) => {
        const value = event.target.value === 'true'
        setBestSeller(value)
    }
    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage)
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            const loginToken = localStorage.getItem('loginToken');
            const firmId = localStorage.getItem('firmId')

            if (!loginToken || !firmId) {
                console.error("user not authenticated")
            }

            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('bestSeller', bestSeller);
            formData.append('image', image);
            formData.append('count', count);

            category.forEach((value) => {
                formData.append('category', value)
            });


            console.log(firmId);

            const response = await fetch(`${API_URL}/product/addproduct/${firmId}`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()

            if (response.ok) {
                console.log(data);
                alert('Product added succesfully')
            }
            setProductName("")
            setPrice("");
            setDescription("")
            setCategory([])
            setBestSeller(false);
            setImage(null);
            setCount(null);
            

        } catch (error) {
            console.log(data.message);
            alert('Failed to add Product')
        }
    }

    return (
        <div className="productSection">

            <form className="tableForm" onSubmit={handleAddProduct}>
                <h3>Add Product</h3>
                <label >Product Name</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder='Enter your product name' />
                <label >Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter your product price' />
                <div className="checkInp">
                    <label >Category</label>
                    <div className="inputsContainer">
                        <div className="checboxContainer">
                            <label>General</label>
                            <input type="checkbox" value="General" checked={category.includes('General')} onChange={handleCategoryChange} />
                        </div>
                        <div className="checboxContainer">
                            <label>Fruits</label>
                            <input type="checkbox" value="Fruits" checked={category.includes('Fruits')} onChange={handleCategoryChange} />
                        </div>
                        <div className="checboxContainer">
                            <label>Dairy</label>
                            <input type="checkbox" value="Dairy" checked={category.includes('Dairy')} onChange={handleCategoryChange} />
                        </div>
                        <div className="checboxContainer">
                            <label>Snakes</label>
                            <input type="checkbox" value="Snakes" checked={category.includes('Snakes')} onChange={handleCategoryChange} />
                        </div>
                    </div>

                </div>
                <label >Product Count</label>
                <input type="number" value={count} onChange={(e) => setCount(e.target.value)} placeholder='Enter your product count' />
                
                <div className="checkInp">
                    <label >Best Seller</label>
                    <div className="inputsContainer">
                        <div className="checboxContainer">
                            <label>Yes</label>
                            <input type="radio" value="true" checked={bestSeller === true} onChange={handleBestSeller} />
                        </div>
                        <div className="checboxContainer">
                            <label>No</label>
                            <input type="radio" value="false" checked={bestSeller === false} onChange={handleBestSeller} />
                        </div>
                    </div>

                </div>

                <label >Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter your description' />
                
                <label >Firm Image</label>
                <input type="file" onChange={handleImageUpload} />
                <br />
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>

        </div>
    )
}

export default AddProduct
