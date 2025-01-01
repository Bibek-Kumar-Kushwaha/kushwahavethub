import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Utils/IsAdmin";
import logo from '../../assets/shopLogo.jpg'

const PrintInvoice = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AppContext);
    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/invoice/print/${id}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setInvoice(response.data.data.invoice); // Set the invoice data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching invoice:", error);
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!invoice) {
        return <div>No invoice found</div>;
    }

    // Function to generate PDF
    const downloadPDF = () => {
        const doc = new jsPDF("p", "mm", "a4");
    
        // Header Section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Kushwaha", 95, 20, { align: "center" });
        doc.setTextColor(51, 0, 255);
        doc.text("VetHub", 120, 20, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(42, 157, 143); // Cool Teal
        doc.text("Godaita-5, Sarlahi", 105, 26, { align: "center" });
    
        // Pan Number and Logo
        const logoImage = logo; // Base64 encoded image string
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text(`Pan Number: 123456789`, 10, 40);
        if (logoImage) {
            doc.addImage(logoImage, "JPEG", 180, 30, 20, 20, 8); // Adjust dimensions and position
        }
    
        // Invoice Details Section
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        let y = 50;
        doc.text(`Name: ${invoice.name}`, 10, y);
        doc.text(`Phone: ${invoice.phone}`, 10, y + 6);
        doc.text(`Address: ${invoice.address}`, 10, y + 12);
    
        doc.text(`Bill No: ${invoice.billNumber}`, 150, y);
        doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 150, y + 6);
        doc.text(`ID: ${invoice._id || "N/A"}`, 150, y + 12);
    
        // Table Header
        y += 20;
        const tableHeaders = ["SN", "Product Name", "Quantity", "Rate", "Amount"];
        const tableHeaderX = [10, 20, 60, 80, 100];
        tableHeaders.forEach((header, index) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setFillColor(255, 255, 255); // Deep Royal Blue
            doc.setTextColor(0, 0, 0);
            doc.rect(tableHeaderX[index], y, 30, 8, "F"); // Fill rectangle
            doc.text(header, tableHeaderX[index] + 2, y + 6);
        });
    
        // Table Content
        y += 12;
        invoice.products.forEach((product, index) => {
            const tableRow = [
                `${index + 1}`,
                product.productName,
                product.quantity.toString(),
                product.sellingPrice.toString(),
                product.amount.toString(),
            ];
            tableRow.forEach((cell, cellIndex) => {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                doc.text(cell, tableHeaderX[cellIndex] + 2, y);
            });
            y += 8;
        });
    
        // Summary Section
        y += 10;
        const summaryData = [
            ["Grand Total", invoice.grandTotal || 0],
            ["Discount Amount", invoice.discountAmount || 0],
            ["Due Amount", invoice.oldCreditAmount || 0],
            ["Total Amount", (invoice.grandTotal || 0) - (invoice.discountAmount || 0) + (invoice.oldCreditAmount || 0)],
            ["Paid Amount", invoice.paidAmount || 0],
            ["Credit Amount", invoice.creditAmount || 0],
        ];
    
        summaryData.forEach(([label, value]) => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`${label}:`, 100, y);
            doc.text(`${value}`, 160, y, { align: "right" });
            y += 8;
        });
    
        // Footer
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(119, 119, 119); // Light Grey
        doc.text('"Your satisfaction is our priority."', 105, y + 10, { align: "center" });
    
        // Save the document
        doc.save(`${invoice.billNumber || "Invoice"}_invoice.pdf`);
    };

    const printInvoice = () => {
        const content = `
            <html>
            <head>
                <title>Invoice Print</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                    }
                    .container {
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        background-color: #f9f9f9;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        font-size: 24px;
                        color: #000;
                        margin: 0;
                    }
                    .header h1 span {
                    color: #0000FF;
                    }
                    .header h2 {
                        font-size: 14px;
                        color: #2A9D8F;
                        margin: 5px 0;
                    }
                    .summary {
                        margin-top: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        background-color: #f1f1f1;
                        padding: 15px;
                        border-radius: 8px;
                    }
                    .summary div {
                        margin-bottom: 5px;
                        font-size: 14px;
                    }
                    .summary .total {
                        font-weight: bold;
                        font-size: 16px;
                        color: #4A47A3;
                    }
                    .table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    .table th, .table td {
                        padding: 10px;
                        border: 1px solid #ddd;
                        text-align: left;
                    }
                    .table th {
                        background-color: #4A47A3;
                        color: #fff;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                    }
                        .invoice-details {
                      display: flex;
                      justify-content: space-between;
                      gap: 20px;
                    }
                    
                    .left-section {
                      flex: 1;
                      text-align: left;
                    }
                    
                    .right-section {
                      flex: 1;
                      text-align: right;
                    }
                    .pan-number {
                      font-size: 16px;
                      font-weight: bold;
                    }
                    .logo-container img {
                     background-color: #1a1a1a; /* Tailwind gray-950 */
                     border-radius: 50%;
                     width: 90%;
                     height: 90%;
                    }        
                     .logo-container {
                     width: 80px;
                     height: 80px;
                     background-color: #3b82f6; /* Tailwind blue-500 */
                     border-radius: 50%;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                    }
                     .container1 {
                     display: flex;
                     justify-content: space-between;
                     align-items: center;
                     padding: 10px;
                   }
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <div class="header">
                                            <h1>Kushwaha <span class="color"> VetHub </span></h1>
                                            <h2>Godaita-5, Sarlahi</h2>
                                        </div>
                                        <div class="container1">
                                            <div class="pan-number">Pan Number: 123456789</div>
                                            <div class="logo-container">
                                                <img src=${logo} alt="logo" />
                                            </div>
                                        </div>

                    <div class="invoice-details">
                      <!-- Left Section -->
                      <div class="left-section">
                        <p><strong>Name:</strong> ${invoice.name}</p>
                        <p><strong>Phone:</strong> ${invoice.phone}</p>
                        <p><strong>Address:</strong> ${invoice.address}</p>
                      </div>
                      <!-- Right Section -->
                      <div class="right-section">
                        <p><strong>Bill No:</strong> ${invoice.billNumber}</p>
                        <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()} </p>
                        <p><strong>ID:</strong> ${invoice._id}</p>
                      </div>
                     </div>
                
    
                    <table class="table">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${invoice.products
                .map(
                    (product, index) => `
                                    <tr>
                                        <td>${product.SN}</td>
                                        <td>${product.productName}</td>
                                        <td>${product.quantity}</td>
                                        <td>${product.sellingPrice}</td>
                                        <td>${product.amount}</td>
                                    </tr>
                                `
                )
                .join("")}
                        </tbody>
                    </table>
    
                    <div class="summary">
                        <div>Grand Total: <span>${invoice.grandTotal || 0}</span></div>
                        <div>Discount Amount: <span>${invoice.discountAmount || 0}</span></div>
                        <div>Due Amount: <span>${invoice.oldCreditAmount || 0}</span></div>
                        <div>Total Amount: <span>${(invoice.grandTotal) - (invoice.paidAmount) + (invoice.oldCreditAmount) || 0}</span></div>
                         <div>Paid Amount: <span>${invoice.paidAmount || 0}</span></div>
                        <div class="total">Credit Amount: <span>${invoice.creditAmount || 0}</span></div>
                    </div>
    
                    <div class="footer">
                        "Your satisfaction is our priority."
                    </div>
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '', 'height=700,width=900');
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    };



    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-700 capitalize">
            <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg" id="invoice-content">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        Kushwaha <span className="text-blue-600">VetHub</span>
                    </h1>
                    <p className="text-sm text-gray-500">Godaita-5, Sarlahi</p>
                </div>

                {/* Invoice Details */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm">
                        <p className="font-semibold">Pan Number: <span className="text-gray-600">123456789</span></p>
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20  bg-blue-500 rounded-full flex items-center justify-center">
                        <img
                            className='bg-gray-950 rounded-full w-[90%] h-[90%]'
                            src={logo}
                            alt="logo" />
                        {/* <span className="text-black font-bold text-2xl">K</span> */}
                    </div>
                </div>

                <hr className="border-t border-gray-200 mb-6" />

                {/* Customer and Invoice Info */}
                <div className="flex justify-between gap-4 mb-6">
                    <div>
                        <p className="font-semibold">Name: <span className="text-gray-600">{invoice.name}</span></p>
                        <p className="font-semibold">Phone: <span className="text-gray-600">{invoice.phone}</span></p>
                        <p className="font-semibold">Address: <span className="text-gray-600">{invoice.address}</span></p>
                    </div>
                    <div>
                        <p className="font-semibold">Bill No: <span className="text-gray-600">{invoice.billNumber}</span></p>
                        <p className="font-semibold">Date: <span className="text-gray-600">{new Date(invoice.date).toLocaleDateString()}</span></p>
                        <p className="font-semibold">ID: <span className="text-gray-600">{invoice._id.slice(-5)}</span></p>
                    </div>
                </div>

                <hr className="border-t border-gray-200 mb-6" />

                {/* Invoice Title */}
                <div className="text-center text-2xl font-bold text-gray-800 mb-4">INVOICE</div>

                {/* Table Headers */}
                <div className="grid grid-cols-5 font-semibold text-gray-600 bg-gray-100 p-2 rounded-t-md">
                    <div>SN</div>
                    <div>Product Name</div>
                    <div>Quantity</div>
                    <div>Rate</div>
                    <div>Amount</div>
                </div>

                {/* Product List */}
                <div className="border border-gray-200 rounded-b-md overflow-hidden">
                    {invoice.products.map((product, index) => (
                        <div
                            key={product._id}
                            className="grid grid-cols-5 items-center p-2 border-b border-gray-200 last:border-b-0"
                        >
                            <div>{product.SN}</div>
                            <div>{product.productName}</div>
                            <div>{product.quantity}</div>
                            <div>{product.sellingPrice}</div>
                            <div>{product.amount}</div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="bg-gray-100 p-4 rounded-lg mt-6 max-w-xs
                 ml-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Grand Total:</span>
                        <span className="font-semibold text-gray-800">{invoice.grandTotal || 0}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Discount Amount:</span>
                        <span className="font-semibold text-gray-800">{invoice.discountAmount || 0}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Due Amount:</span>
                        <span className="font-semibold text-gray-800">{invoice.oldCreditAmount || 0}</span>
                    </div>
                    <hr className='bg-black h-0.5' />
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Total Amount:</span>
                        <span className="font-semibold text-gray-800">{invoice.grandTotal - invoice.discountAmount + invoice.oldCreditAmount}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Paid Amount:</span>
                        <span className="font-semibold text-gray-800">{invoice.paidAmount || 0}</span>
                    </div>
                    <hr className='bg-black h-0.5' />
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-700 font-medium text-lg">Total Credit:</span>
                        <span className="font-bold text-xl text-blue-600">{invoice.creditAmount || 0}</span>
                    </div>
                </div>


                {/* Buttons */}
                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={printInvoice}
                    >
                        Print
                    </button>
                    <button
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        onClick={downloadPDF}
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );

};

export default PrintInvoice;
