// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Document, Page, pdfjs } from 'react-pdf';
// // import { FaFilePdf } from 'react-icons/fa';

// // const PDFViewer = () => {
// //   const [pdfUrls, setPdfUrls] = useState([]);

// //   useEffect(() => {
// //     const fetchPDFs = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:8000/fetch`);
// //         const fileBuffers = response.data;

// //         // Convert each buffer to a Blob and create URL for each Blob
// //         const urls = fileBuffers.map(buffer => {
// //           const blob = new Blob([buffer], { type: 'application/pdf' });
// //           return URL.createObjectURL(blob);
// //         });

// //         // Set the array of PDF URLs
// //         setPdfUrls(urls);
// //       } catch (error) {
// //         console.error('Error fetching PDFs:', error);
// //       }
// //     };

// //     fetchPDFs();

// //     // Clean up URL objects when component unmounts
// //     return () => {
// //       pdfUrls.forEach(url => {
// //         URL.revokeObjectURL(url);
// //       });
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       {pdfUrls.length > 0 ? (
// //         pdfUrls.map((pdfUrl, index) => (
// //           <div key={index} style={{ marginBottom: '20px' }}>
// //             <div style={{ cursor: 'pointer' }} onClick={() => window.open(pdfUrl, '_blank')}>
// //               <Document file={pdfUrl}>
// //                 <Page pageNumber={1} width={200} />
// //               </Document>
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p>No PDF files found.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default PDFViewer;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Document, Page, pdfjs } from 'react-pdf';

// const PDFViewer = () => {
//   const [pdfData, setPDFData] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(null);

//   useEffect(() => {
//     const fetchPDF = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/fetch');
//         const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(pdfBlob);
//         setPDFData(pdfUrl);
//       } catch (error) {
//         console.error('Error fetching files:', error);
//       }
//     };

//     fetchPDF();
//   }, []);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   const handleOpenPdf = () => {
//     window.open(pdfData, '_blank');
//   };


//   return (
//     <div>
//       <h1>File Viewer</h1>
//       {pdfData ? (
//         <div style={{ cursor: 'pointer' }} onClick={handleOpenPdf}>
//           <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
//             <Page pageNumber={1} width={200} />
//           </Document>
//         </div>
//       ) : (
//         <p>Loading PDF...</p>
//       )}

//     </div>
//   );
// };

// export default PDFViewer;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PDFViewer = () => {
    const [pdfFiles, setPdfFiles] = useState([]);

    useEffect(() => {
        const fetchPDFs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/fetch");
                console.log(response)
                setPdfFiles(response.data);
            } catch (error) {
                console.error('Error fetching PDF files:', error);
            }
        };

        fetchPDFs();
    }, []);

    return (
        <div>
            {pdfFiles.map((file, index) => (
                <div key={index}>
                    <embed src={`/pdf/${file.filename}`} type="application/pdf" width="600" height="400" />
                    <a href={`/pdf/${file.filename}`} target="_blank" rel="noopener noreferrer">{file.filename}</a>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default PDFViewer;