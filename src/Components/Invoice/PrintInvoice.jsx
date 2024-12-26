import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Utils/IsAdmin";

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
        const doc = new jsPDF();

        // Set up document content in A4 paper size
        doc.setFontSize(12);
        doc.text("Kushwaha Pharma", 10, 10);
        doc.text("Godaita-5, Sarlahi", 10, 15);

        doc.text(`Name: ${invoice.name}`, 10, 30);
        doc.text(`Phone: ${invoice.phone}`, 10, 35);
        doc.text(`Address: ${invoice.address}`, 10, 40);

        doc.text(`Bill No: ${invoice.billNumber}`, 150, 30);
        doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 150, 35);
        doc.text(`ID: INV1234`, 150, 40);

        // Table header
        const headers = ["SN", "Product Name", "Quantity", "Rate", "Amount"];
        let y = 50; // Starting Y position for table

        headers.forEach((header, i) => {
            doc.text(header, 10 + i * 35, y); // Table headers
        });

        // Table data
        invoice.products.forEach((product, index) => {
            y += 5; // Move down for each row
            doc.text(`${index + 1}`, 10, y);
            doc.text(`${product.productName}`, 45, y);
            doc.text(`${product.quantity}`, 80, y);
            doc.text(`${product.sellingPrice}`, 115, y);
            doc.text(`${product.amount}`, 150, y);
        });

        // Save the document as a PDF
        doc.save(`${invoice.billNumber}_invoice.pdf`);
    };

    // Function to print invoice
    const printInvoice = () => {
        const content = document.getElementById("invoice-content");
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Invoice Print</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(content.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="p-6 bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md" id="invoice-content">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Kushwaha Pharma</h1>
                    <h2 className="text-lg">Godaita-5, Sarlahi</h2>
                </div>
                <div className="flex justify-between mb-4">
                    <div className="text-gray-600">Pan Number: 123456789</div>
                    <div className="text-gray-600">Logo</div>
                </div>
                <hr className="h-1 bg-red-700 mb-4" />
                <div className="flex justify-between mb-4">
                    <div>
                        <div>Name: {invoice.name}</div>
                        <div>Phone: {invoice.phone}</div>
                        <div>Address: {invoice.address}</div>
                    </div>
                    <div>
                        <div>Bill No: {invoice.billNumber}</div>
                        <div>Date: {new Date(invoice.date).toLocaleDateString()}</div>
                        <div>ID: INV1234</div>
                    </div>
                </div>
                <hr className="h-1 bg-red-700 mb-4" />
                <div className="text-center text-xl font-semibold mb-4">INVOICE</div>

                <div className="grid grid-cols-5 font-bold border-b border-gray-300 pb-2 mb-2">
                    <div>SN</div>
                    <div>Product Name</div>
                    <div>Quantity</div>
                    <div>Rate</div>
                    <div>Amount</div>
                </div>

                {invoice.products.map((product, index) => (
                    <div key={product._id} className="grid grid-cols-5 items-center gap-2 mb-2">
                        <div>{index + 1}</div>
                        <div>{product.productName}</div>
                        <div>{product.quantity}</div>
                        <div>{product.sellingPrice}</div>
                        <div>{product.amount}</div>
                    </div>
                ))}

                <div className="mt-4">
                    <label>Paid Amount: </label>
                    <input
                        type="number"
                        value={invoice.paidAmount || ''}
                        onChange={(e) => setPaidAmount(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                {/* <div className="mt-4">
                    <label>Discount Name: </label>
                    <input
                        type="text"
                        value={discountName}
                        onChange={(e) => setDiscountName(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div> */}
            </div>
            <div className="flex justify-between mt-6">

                <div className="flex justify-end p-4 space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={printInvoice}>
                        Print
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        onClick={downloadPDF} // Trigger PDF download
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrintInvoice;
