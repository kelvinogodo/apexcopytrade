import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from "react-icons/ai";
import './userdashboardcopytrade.css'

const UserdashboardCopytrade = ({route}) => {
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
                {userData && userData.transaction.length !== 0 ? 
                      <div className="page-swiper-wrapper trans-page">
                        <div className="floating-btn trans-page-float" onClick={()=>{
                        navigate('/dashboard')
                      }}>
                          <AiOutlineArrowLeft />
                        </div>
                      <div className="page-header">
                          <h3>checkout your trade logs</h3>
                          <h2>trade logs</h2>
                          <p>we keep track of all the trades taken by your trader</p>
                      </div>
                      <div className="transaction-container no-ref">
                        <table>
                            <thead>
                              <tr>
                                <td>trade pair</td>
                                <td>type</td>
                                <td>profit</td>
                                <td>date</td>
                                <td>balance</td>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                userData.transaction.map(refer =>
                                  <tr>
                                    <td>USD/GBP</td>
                                    <td>Buy</td>
                                    <td>$ {refer.amount} USD</td>
                                    <td>{refer.date}</td>
                                    <td>$ {refer.balance} USD</td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                          </div>
                        </div>
                      :
                        <div className="empty-page">
                          <img src="/preview.gif" alt="" className='empty-img'/>
                          <p>you have not performed any transaction yet</p> 
                          <Link to='/fundwallet'>deposit</Link>
                        </div>
                  }
          </section>
        </main>  
  )
}

export default UserdashboardCopytrade