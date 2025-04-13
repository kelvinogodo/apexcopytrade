import React from 'react'
import './userdashboardhomepage.css'
import { FaUserAlt,FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'
import { IoMdNotifications } from "react-icons/io";
import Loader from '../Loader'
import { IoCloseSharp } from "react-icons/io5";
import { RiLuggageDepositLine } from "react-icons/ri";
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import { BsFillAwardFill } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import TeslaWidget from '../TeslaWidget'
import {MdOutlineDone} from 'react-icons/md'
import {MdOutlineContentCopy} from 'react-icons/md'
import { FiLink } from 'react-icons/fi'

const Userdashboardhomepage = ({route}) => {
    const navigate = useNavigate()
    const [clipBoard, setClipBoard] = useState(false)
    const [userData, setUserData] = useState()
    const [loader,setLoader] = useState(false)
    const copy = ()=>{
        navigator.clipboard.writeText(clipRef.current.value)
    }
    const clipRef = useRef(null)

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
        <div className="notification-dashoboard-container">
          <div className="notification-card">
            <p>you have not deposited yet click <Link to='deposit'>Here</Link> to make your first deposit</p>
            <div className="close-notification-container">
                <IoCloseSharp />
            </div>
          </div>
        </div>
        <div className="dashboard-overview-container">
          <div className="upper-overview-card">
            <div className="total-balance-container">
              <h2 className="main-balance">
                Total Balance
              </h2>
              <div className="amount">
                <h3>$0.00</h3>
                <span className="usd-btn">usd</span>
              </div>
            </div>
            <div className="overview-btn-container">
              <div className="deposit-btn-container">
                <button className='user-deposit-btn'>
                  <span>deposit</span>
                </button>
                <button className='user-deposit-btn'>
                  <span>withdraw</span>
                </button>
              </div>
              <div className="rank-container">
                <p>Current Rank : <span className="silver">silver</span></p>
                <BsFillAwardFill />
              </div>
            </div>
          </div>
          <div className="lower-overview-card-container">
            <div className="lower-overview-card">
              <div className="lower-card-icon-container">
                <RiLuggageDepositLine />
              </div>
              <div className="lower-card-text-container">
                <h3>total deposit</h3>
                <p>$0.00</p>
              </div>
            </div>
            <div className="lower-overview-card">
              <div className="lower-card-icon-container">
                  <BiMoneyWithdraw />
              </div>
              <div className="lower-card-text-container">
                <h3>total withdrawal</h3>
                <p>$0.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-chart-container">
          <TeslaWidget />
        </div>
        <div className="referral-section">
                <div className="referral-card1">
                    <div className="referraltext-wrapper">
                        <div className="referral-text-container">
                            <h2>refer us and earn 10% of every downline deposit</h2>
                            <p>Use the bellow link to invite your friends.</p>
                        </div>
                        <button className="invite-btn">invite</button>
                    </div>
                    <div className="click-to-copy-container">
                        <span className='clipboard-btn'>
                            <FiLink />
                        </span>
                        <input type="text" value={userData ? `www.apexcopytrade.com/user/${userData.username ? userData.username : userData.referral}` : ''} ref={clipRef}/>
                        <span className={`clipboard-btn ${clipBoard ? <MdOutlineDone /> : ''}` } onClick={()=>{
                            copy()
                            setClipBoard(!clipBoard)
                              }}>   
                            {
                                clipBoard ?
                                <MdOutlineDone /> : <MdOutlineContentCopy />
                            }
                        </span>
                    </div>  
                </div>
                <div className="referral-card1">
                    <div className="referraltext-wrapper">
                        <div className="referral-text-container">
                            <h2>my referral</h2>
                        </div>
                        <div className="referral-text-container small-card">
                            <h2>{userData ? userData.referred.length : '      '}</h2>
                            <p>referred users</p>
                        </div>
                        <div className="referral-text-container small-card">
                            <h2>{userData ? userData.refBonus : '        '} USD</h2>
                            <p>referral commission</p>
                        </div>

                    </div>
                    <img src="/bar4.png" alt="" className="bar4" />
                </div>
            </div>
    </section>
    </main>
  )
}

export default Userdashboardhomepage

