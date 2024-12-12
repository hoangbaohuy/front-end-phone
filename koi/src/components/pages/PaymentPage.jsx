import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PaymentPage = () => {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await fetch("https://localhost:7295/api/VnPay");
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setPayments(data); // Store data in state
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
    
            fetchProducts();
        }, []);
    return (
        <div className="order-page-content w-100">
            <div className="card shadow border-0 p-3 mt-4">
                <h3 className="hd">Payment List</h3>
                <div className="table-responsive mt-3">
                    <table className="table table-hover table-bordered v-algin">
                        <thead className="thead-dark">
                            <tr>
                                <th>PaymentId</th>
                                <th>OrderId</th>
                                <th>PaymentDate</th>
                                <th>PaymentMethod</th>
                                <th>AmountPaid</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.paymentId}>
                                        <td>{payment.paymentId}</td>
                                        <td>{payment.orderId}</td>
                                        <td>{payment.paymentDate}</td>
                                        <td>{payment.paymentMethod}</td>
                                        <td>{payment.amountPaid}</td>
                                        <td>
                                            <div className="actions align-items-center">
                                                <Button className="secondary" color="secondary"><FaEye /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
