import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './userdashboardranking.css'

const UserdashboardRanking = ({route}) => {
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)
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
            <div className="current-rank-section">
                <div className="active-trader-container">
              <div className="videoframe-text-container treader-header">
              <h1>Your current <span className="highlight">Rank</span></h1>
                </div>
                  <div className="traders-card active-trader-card">
                  <div className="trader-card-header">
                    <div className="trader-card-image-container">
                    <img src={`${userData && userData.funded > 5000 ? '/gold.png' : '/images-removebg-preview.png' }`} alt="" className='trader-card-image' />
                    </div>
                    <div className="trader-card-text-container">
                      <h3 className="trader-name">Silver</h3>
                      <p className="trader-description">Rank</p>
                    </div>
                  </div>
                  <div className="trader-perfomance-container">
                    <div className="trader-performance">
                      <div className="trader-performance-item">
                        <p className="performance-label">capital Range</p>
                        <p className="performance-value"> $0- $5000</p>
                      </div>
                          <div className="trader-performance-item">
                            <p className="performance-label">bonus</p>
                            <p className="performance-value"> $50</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </section>
        </main>  
  )
}

export default UserdashboardRanking