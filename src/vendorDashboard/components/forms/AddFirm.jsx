import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
    const [shopName, setShopName] = useState("");
    const [address, setAddress] = useState("");
    const [offer, setOffer] = useState("");
    const [file, setFile] = useState(null);

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setFile(selectedImage);
        console.log("Selected file: ", selectedImage);
    };

    const handleFirmSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginToken = localStorage.getItem('loginToken');
            if (!loginToken) {
                console.error("User not authenticated");
                return;
            }

            const formData = new FormData();
            formData.append('shopName', shopName);
            formData.append('address', address);
            formData.append('offer', offer);
            formData.append('image', file);

            console.log("Form Data before submission:", formData);

            const response = await fetch(`${API_URL}/firm/addfirm`, {
                method: 'POST',
                headers: {
                    'token': `${loginToken}`
                },
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setShopName("");
                setAddress("");
                setOffer("");
                setFile(null);
                localStorage.setItem('shopName',shopName );
                alert("Firm added successfully");
                window.location.reload()
            } else if (data.message === "vendor can have only one firm") {
                alert("Firm Exists . Only 1 firm can be added  ")
                return;
            } else {
                alert('Failed to add Firm')
            }
            const firmId = data.firmId;
            localStorage.setItem('firmId', firmId);


        } catch (error) {
            console.error("Error during submission:", error); // Log error
            alert("Failed to add Firm");
        }
    };

    return (
        <div className="firmSection">
            <form className="tableForm" onSubmit={handleFirmSubmit} encType="multipart/form-data">
                <h3>Add Shop</h3>
                <label>Shop Name</label>
                <input type="text" name='shopName' value={shopName} onChange={(e) => setShopName(e.target.value)} />
                <label>Address</label>
                <input type="text" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                <label>Offer</label>
                <input type="text" name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />
                <label>Shop Image</label>
                <input type="file" onChange={handleImageUpload} />
                <br />
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddFirm;
