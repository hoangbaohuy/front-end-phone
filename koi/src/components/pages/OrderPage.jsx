import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await fetch("https://localhost:7295/odata/Order");
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setOrders(data); // Store data in state
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
    
            fetchProducts();
        }, []);
    return (
        <div className="order-page-content w-100">
            <div className="card shadow border-0 p-3 mt-4">
                <h3 className="hd">Order List</h3>
                <div className="table-responsive mt-3">
                    <table className="table table-hover table-bordered v-algin">
                        <thead className="thead-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>UserId</th>
                                <th>OrderDate</th>
                                <th>TotalAmount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                {orders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.userId}</td>
                                        <td>{order.orderDate}</td>
                                        <td>{order.totalAmount} VND</td>
                                        <td>{order.status}</td>
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

export default OrderPage;
