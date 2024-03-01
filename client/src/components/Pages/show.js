import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPDF = () => {
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        fetchPDF();
    }, []);

    const fetchPDF = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getpdf');
            setFileUrl(URL.createObjectURL(new Blob([response.data])));
        } catch (error) {
            console.error('Error fetching PDF file:', error);
            alert("An error occurred while fetching the PDF file.");
        }
    };

    return (
        <>
            <h2>View PDF</h2>
            {fileUrl && <iframe src={fileUrl} style={{ width: '100%', height: '500px' }} />}
        </>
    );
};

export default ViewPDF;
