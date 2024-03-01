import React, { useState } from 'react';
import axios from 'axios';

const UploadPDF = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post("http://127.0.0.1:8000/uploadfile", formData);
            // alert("PDF file uploaded successfully!");
        } catch (error) {
            console.error("Error uploading PDF file:", error);
            //alert("An error occurred while uploading the PDF file.");
        }
    };

    return (
        <>
            <h2>Upload PDF</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload File</button>
        </>
    );
};

export default UploadPDF;
