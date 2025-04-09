import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import './userdashboardtraders.css'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
const UserdashboardTraders = ({route}) => {
    const [loader, setLoader] = useState(false)
      const [userData, setUserData] = useState()
      const navigate = useNavigate()
      
      useEffect(() => {
        const getData = async () => {
          try {
            setLoader(true);
      
            // Check if a token exists
              const token = localStorage.getItem('token');
              console.log(token)
            if (!token) {
              navigate('/login');
              return;
            }
      
            // Fetch user data from the API
            const response = await fetch(`${route}/api/getData`, {
              headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
              },
            });
      
            // Parse the response
            const data = await response.json();
      
            // Handle errors from the API
            if (data.status === 'error') {
              localStorage.removeItem('token'); // Clear invalid token
              navigate('/login');
            } else {
              setUserData(data); // Set user data
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/login'); // Navigate to login on failure
          } finally {
            setLoader(false); // Stop loader
          }
        };
      
        getData();
         }, [navigate, route]);
  return (
    <main className='homewrapper'>
         {
           loader &&
             <Loader />
         }
       <Userdashboardheader />
        <section className='dashboardhomepage'>
           
          <div className="dashboardheaderwrapper">
            <div className="dashboardheaderwrapper">
              <div className="header-notification-icon-container">
                  <IoMdNotifications />
              </div>
              <div className="header-username-container">
                <h3>Hi, {userData ? userData.firstname : ''}</h3>
              </div>
              <div className="header-userprofile-container">
                <div className="user-p-icon-container">
                  <FaUserAlt/>
                </div>
                <div className="user-p-drop-icon">
                  <FaAngleDown />
                </div>
              </div>
            </div>
        </div>
        <div className="traders-showcase">
          <h2 className="traders-showcase-header">expert traders</h2>
          <p>choose from the list of our expert traders. Any trader you select would trade and manage your portfolio.</p>
        </div>
        <div className="traders-section">
          <div className="videoframe-text-container treader-header">
            <h1>select your  <span className="highlight">trader</span></h1>
            <div className="search-input-container">
              <span className='search-btn'><FiSearch /></span>
              <input type="text" placeholder='search for a trader' className='search-input' />
            </div>
          </div>
          <div className="traders-card-container">
            <div className="traders-card">
              <div className="trader-card-header">
                <div className="trader-card-image-container">
                <img src="/black3.jpg" alt="" className='trader-card-image' />
                </div>
                <div className="trader-card-text-container">
                  <h3 className="trader-name">John Doe</h3>
                  <p className="trader-description">nec ligula.</p>
                </div>
              </div>
              <div className="trader-perfomance-container">
                <div className="trader-performance">
                  <div className="trader-performance-item">
                    <p className="performance-label">Win Rate</p>
                    <p className="performance-value">85%</p>
                  </div>
                  <div className="trader-performance-item">
                    <p className="performance-label">Average Return</p>
                    <p className="performance-value">12%</p>
                  </div>
                </div>
                <div className="trader-performance-btn-container">
                  <button className='trader-card-btn'>view</button>
                  <button className='trader-card-btn'>copy</button>
                </div>
              </div>
            </div>
            <div className="traders-card">
              <div className="trader-card-header">
                <div className="trader-card-image-container">
                <img src="/black2.jpg" alt="" className='trader-card-image' />
                </div>
                <div className="trader-card-text-container">
                  <h3 className="trader-name">John Doe</h3>
                  <p className="trader-description">nec ligula.</p>
                </div>
              </div>
              <div className="trader-perfomance-container">
                <div className="trader-performance">
                  <div className="trader-performance-item">
                    <p className="performance-label">Win Rate</p>
                    <p className="performance-value">85%</p>
                  </div>
                  <div className="trader-performance-item">
                    <p className="performance-label">Average Return</p>
                    <p className="performance-value">12%</p>
                  </div>
                </div>
                <div className="trader-performance-btn-container">
                  <button className='trader-card-btn'>view profile</button>
                  <button className='trader-card-btn'>copy trades</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        </section>
    </main>  
  )
}

export default UserdashboardTraders