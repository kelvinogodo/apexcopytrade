import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import './userdashboardtraders.css'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdCandlestickChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
const UserdashboardTraders = ({route}) => {
  const [loader, setLoader] = useState(false)
  const [showTrader, setShowTrader] = useState(false)
  const [activeTrader,setActiveTrader]= useState({})
  
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
  const traders = [
    {
      id: 1,
      firstname: 'bobby',
      lastname: 'jones',
      winRate: '85%',
      averageReturn: '25%',
      followers: '702',
      rrRatio: '1:6',
      nationality: 'united states of America',
      minimumCapital: 7000,
      traderImage:'black3.jpg'
    },
    {
      id: 2,
      firstname: 'jerome',
      lastname: 'bush',
      winRate: '95%',
      averageReturn: '85%',
      followers: '1,002',
      rrRatio: '1:7',
      nationality: 'united states of America',
      minimumCapital: 10000,
      traderImage:'blackInvestor.jpeg'
    },
    {
      id: 3,
      firstname: 'ada',
      lastname: 'vekury',
      winRate: '95%',
      averageReturn: '85%',
      followers: '1,290',
      rrRatio: '1:5',
      nationality: 'canada',
      minimumCapital: 10000,
      traderImage:'coporate-woman.jpg'
    },
    {
      id: 4,
      firstname: 'john',
      lastname: 'white',
      winRate: '95%',
      averageReturn: '85%',
      followers: '20,200',
      rrRatio: '1:4',
      nationality: 'united kingdom',
      minimumCapital: 10000,
      traderImage:'fortune-vieyra-QIMjYJSFoXM-unsplash.jpg'
    },
  ]
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
        {
          showTrader && activeTrader ?
          <div className="trader-profile-page">
              <div className="trader-page-close-btn" onClick={()=> setShowTrader(false)}>
                <IoIosArrowBack />
              </div>
              <div className="trader-profile-container">
                <div className="trader-profile-card">
                <div className="trader-card-header">
                  <div className="trader-card-image-container">
                  <img src={`/${activeTrader.traderImage}`} alt="" className='trader-card-image' />
                  </div>
                  <div className="trader-card-text-container">
                    <h3 className="trader-name">{activeTrader.firstname}</h3>
                    <p className="trader-description">{activeTrader.lastname}</p>
                  </div>
                </div>
                <div className="trader-perfomance-container">
                  <div className="trader-performance">
                    <div className="trader-performance-item">
                      <p className="performance-label">Win Rate</p>
                      <p className="performance-value"><MdCandlestickChart /> {activeTrader.winRate}</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">Average Return</p>
                      <p className="performance-value"><MdOutlineShowChart /> {activeTrader.averageReturn}</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">followers </p>
                      <p className="performance-value"> {activeTrader.followers}</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">minimum Risk/Reward Ratio </p>
                      <p className="performance-value">{activeTrader.rrRatio}</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">nationality </p>
                      <p className="performance-value">{activeTrader.nationality}</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">minimum Trading Capital </p>
                      <p className="performance-value">{activeTrader.minimumCapital}</p>
                    </div>
                  </div>
                  <div className="trader-performance-btn-container">
                    <button className='trader-card-btn'>copy trade</button>
                  </div>
                </div>
              </div>
              </div>
            </div> : ''
        }
        {
          !showTrader && 
          <>
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
                { 
                  traders.map(trader => 
                    <div className="traders-card">
                        <div className="trader-card-header">
                          <div className="trader-card-image-container">
                          <img src={`/${trader.traderImage}`} alt="" className='trader-card-image' />
                          </div>
                          <div className="trader-card-text-container">
                            <h3 className="trader-name">{trader.firstname}</h3>
                            <p className="trader-description">{trader.lastname}</p>
                          </div>
                        </div>
                        <div className="trader-perfomance-container">
                          <div className="trader-performance">
                            <div className="trader-performance-item">
                              <p className="performance-label">Win Rate</p>
                              <p className="performance-value"><MdCandlestickChart /> {trader.winRate}</p>
                            </div>
                            <div className="trader-performance-item">
                              <p className="performance-label">Average Return</p>
                              <p className="performance-value"><MdOutlineShowChart /> {trader.averageReturn}</p>
                            </div>
                          </div>
                          <div className="trader-performance-btn-container">
                          <button className='trader-card-btn' onClick={() => {
                            setActiveTrader(
                            {
                              firstname: trader.firstname,
                              lastname: trader.lastname,
                              winRate: trader.winRate,
                              averageReturn: trader.averageReturn,
                              followers: trader.followers,
                              rrRatio: trader.rrRatio,
                              nationality: trader.nationality,
                              minimumCapital: trader.minimumCapital,
                              traderImage:trader.traderImage
                              })
                            setShowTrader(true)
                          }}>view profile</button>
                          <button className='trader-card-btn' >copy trade</button>
                          </div>
                        </div>
                      </div>
                  )
              }
              
            </div>
          </div>
        </>
        }
        </section>
    </main>  
  )
}

export default UserdashboardTraders