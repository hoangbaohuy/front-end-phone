import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart, FaChevronRight } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import { RiLogoutBoxFill } from "react-icons/ri";
import { MyContext } from '../../layouts/MainLayout';
import { FaMobileAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
    const isOpenSubMenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }
    const [activeTabOrder, setActiveTabOrder] = useState(null);
    const [isToggleSubmenuOrder, setIsToggleSubmenuOrder] = useState(false);
    const isOpenSubMenuOrder = (index) => {
        setActiveTabOrder(index);
        setIsToggleSubmenuOrder(!isToggleSubmenuOrder);
    }
    
    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to="/dashboard">
                        <Button className='w-100'>
                            <span className='icon'><MdDashboard /></span>
                            Dashboard
                            <span className='arrow'><FaChevronRight /></span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Button
                        className={`w-100 ${activeTab === 1 && isToggleSubmenu === false ? 'active' : ''}`}
                        onClick={() => isOpenSubMenu(1)}
                    >
                        <span className='icon'><FaMobileAlt /></span>
                        Phones
                        <span className='arrow'><FaChevronRight /></span>
                    </Button>

                    <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu=== true ? 'collapse' : 'collapsed'}`}>
                        <div className='submenu'>
                            <ul>
                                <li><Link to="/dashboard">Phone List</Link></li>
                                <li><Link to="/product-upload">Phone Upload</Link></li>
                            </ul>
                        </div>
                    </div>
                </li>

                <li>
                    <Button className={`w-100 ${activeTabOrder === 1 && isToggleSubmenuOrder === false ? 'active' : ''}`}
                        onClick={() => isOpenSubMenuOrder(1)}>
                            <span className='icon'><FaShoppingCart /></span>
                            Orders
                            <span className='arrow'><FaChevronRight /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTabOrder === 1 && isToggleSubmenuOrder=== true ? 'collapse' : 'collapsed'}`}>
                        <div className='submenu'>
                            <ul>
                                <li><Link to="/order">Order List</Link></li>
                                <li><Link to="/payment">Payment List</Link></li>
                            </ul>
                        </div>
                    </div>                   
                </li>
                <li>
                <Link to="/user">
                    <Button className='w-100'>
                        <span className='icon'><FaUser /></span>
                        User
                        <span className='arrow'><FaChevronRight /></span>
                    </Button>
                    </Link>
                </li>
                <li>
                <Link to="/notification">
                    <Button className='w-100'>
                        <span className='icon'><FaBell /></span>
                        Notification
                        <span className='arrow'><FaChevronRight /></span>
                    </Button>
                    </Link>
                </li>


                <li>
                <Link to="/setting">
                    <Button className='w-100'>
                        <span className='icon'><IoIosSettings /></span>
                        Setting
                        <span className='arrow'><FaChevronRight /></span>
                    </Button>
                    </Link>
                </li>
            </ul>

            <br/>
            <div className='logoutWrapper'>
                <div className='logoutBox'>
                    <Button  variant="contained" 
            sx={{ backgroundColor: 'orange', color: '#fff' }}><RiLogoutBoxFill/> Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
