import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserPage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await fetch("https://localhost:7295/odata/Users");
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setUsers(data); // Store data in state
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
    
            fetchProducts();
        }, []);
    return (
        <div className="order-page-content w-100">
            <div className="card shadow border-0 p-3 mt-4">
                <h3 className="hd">User List</h3>
                <div className="table-responsive mt-3">
                    <table className="table table-hover table-bordered v-algin">
                        <thead className="thead-dark">
                            <tr>
                                <th>UserId</th>
                                <th>UserName</th>
                                <th>FullNamee</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Address</th>
                                <th>PhoneNumber</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                {users.map((user) => (
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <img src={user.image} alt={user.userName} width="50" />
                                        </td>
                                        <td>{user.address}</td>
                                        <td>{user.phoneNumber}</td>

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

export default UserPage;
