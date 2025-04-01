import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [bgColor, setBgColor] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const changeOnScroll = () => {
        if (window.scrollY >= 90) {
            setBgColor(true);
        } else {
            setBgColor(false);
        }
    };
    window.addEventListener('scroll', changeOnScroll);
    const navigate = useNavigate();

    const menuItems = [
        { name: "home", path: "/", dropdown: [] },
        { name: "about", path: "/about", dropdown: [] }, // Removed dropdown from about
        { name: "markets", path: "/markets", dropdown: ["Forex", "Indices", "stocks", "crypto", "metals"] },
        { name: "analytics", path: "/faq", dropdown: ["General Questions", "Technical Support"] },
        { name: "company", path: "/policy", dropdown: ["Privacy Policy", "Terms & Conditions"] },
        { name: "trading", path: "/buybitcoin", dropdown: ["Bitcoin", "Ethereum"] }
    ];

    return (
        <motion.header className={`${bgColor && 'scroll-color'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65 }}
        >
            <div className="logo-container"></div>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}
                            className="relative"
                            onMouseEnter={() => item.dropdown.length > 0 && setOpenDropdown(index)}
                            onMouseLeave={(e) => {
                                if (!e.relatedTarget || !e.relatedTarget.closest(".drop-down-container")) {
                                    setOpenDropdown(null);
                                }
                            }}>
                            <Link to={item.path}>{item.name}</Link>
                            {openDropdown === index && item.dropdown.length > 0 && (
                                <div className="drop-down-container"
                                    onMouseEnter={() => setOpenDropdown(index)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <div className="drop-wrapper">
                                        {item.dropdown.map((subItem, subIndex) => (
                                            <a key={subIndex} href={`/${subItem}`} className="dropdown-link">{subItem}</a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sign-up-btn-container">
                <button className='signup-btn' onClick={() => { navigate('/login') }}><span>login</span></button>
            </div>
            <div className="mobile-menu-container" onClick={() => { setShowModal(!showModal) }}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
            <div className={`overlay ${showModal ? 'showing-modal' : ''}`} onClick={() => { setShowModal(false); }}>
                <div className="menu-card">
                    <ul className="list">
                        <li className="element"><Link to='/'>home</Link></li>
                        <li className="element"><Link to='/services'>services</Link></li>
                        <li className="element"><Link to='/buybitcoin'>buy crypto</Link></li>
                        <li className="element"><Link to='/policy'>policy</Link></li>
                        <li className="element"><Link to='/login'>login</Link></li>
                    </ul>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
