import React from 'react'
import './userdashboardhomepage.css'
import { RiLuggageDepositLine } from 'react-icons/ri'
import {MdOutlineDone} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'
import {FaUser} from 'react-icons/fa'
import {MdOutlineContentCopy} from 'react-icons/md'
import { FiLink } from 'react-icons/fi'
import { FaUsers } from 'react-icons/fa'
import { FaExchangeAlt,FaHandHoldingUsd } from 'react-icons/fa'
import { CgArrowsExchange } from 'react-icons/cg'
import Loader from '../Loader'
import TradingViewFinancials from '../TradingViewFinancials'
import TradingViewTechnicalAnalysis from '../TradingViewTechnicalAnalysis'
import TeslaWidget from '../TeslaWidget'
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
    <div className='homewrapper'>
      {
        loader &&
          <Loader />
      }
    <div className='dashboardhomepage'>
       
        <div className="dashboardhomepagewrapper">
            <div className="welcome-kyc-section">
                <p>wallet Balance</p>
                <div className="username-container">
              <h2>${userData ? userData.funded : ''}.00 USD</h2>
              <small className='profit'>${userData ? userData.totalprofit : ''}.00 USD profit earned</small>
                </div>
            </div>
                  <div className="dash-btn-container">
                      <button className='dash-btn' onClick={() => navigate('/fundwallet')}>
                          <CgArrowsExchange />deposit
                      </button>
                      <button className='dash-btn' onClick={() => navigate('/withdraw')}>
                          <FaHandHoldingUsd />withdraw
                      </button>
                  </div>   
            <div className="overview-container">
                      <div className="overview-card">
                        <div className="overview-icon-wrapper" onClick={()=>navigate('/myprofile')}>
                        <div className="overview-icon-container">
                            <FaUser />
                        </div>
                        <small>profile</small>
                        </div>
                        <div className="overview-icon-wrapper" onClick={()=>navigate('/plans')}>
                        <div className="overview-icon-container">
                            <RiLuggageDepositLine />
                        </div>
                        <small>invest</small>
                        </div>
                        <div className="overview-icon-wrapper" onClick={()=>navigate('/referrals')}>
                        <div className="overview-icon-container">
                            <FaUsers />
                        </div>
                        <small>referrals</small>
                        </div>
                        <div className="overview-icon-wrapper" onClick={()=>navigate('/transactions')}>
                        <div className="overview-icon-container">
                            <FaExchangeAlt />
                        </div>
                        <small>transactions</small>
                        </div>             
                    </div>
          </div>
          <section className='trading-view-forex-section dashboard-forex-section'>
                      <div className="videoframe-text-container" data-aos="fade-up">
                        <h1>market <span className="highlight">analysis </span></h1>
                      </div>
                    <div className="trading-view-forex-wrapper">
                        <div className="trading-view-card">
                            <div className="trading-view-card-text-container" data-aos="fade-up">
                                <h1>Technical Analysis</h1>
                                <p>See what the technical analysis says about a given symbol with our display ratings, made for easy viewing.</p>
                            </div>
                            <TeslaWidget />
                        </div>
                        <div className="trading-view-card">
                            <div className="trading-view-card-text-container" data-aos="fade-up">
                                <h1>Fundamental Data</h1>
                                <p>Kick the tires on the fundamentals with this deep dive into how a company is doing beyond simply its stock price.</p>
                            </div>
                            <TradingViewTechnicalAnalysis />
                        </div>
                    </div>
              </section>
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
                        <input type="text" value={userData ? `stockedgecapital.com/user/${userData.username ? userData.username : userData.referral}` : ''} ref={clipRef}/>
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
        </div>
    </div>
    </div>
  )
}

export default Userdashboardhomepage

// sidebar html 
{/* <div class="main">
  <div class="currentplaying">
    <svg height="50px" width="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="spotify"><radialGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(0 -534)" r="43.888" cy="572.064" cx="33.34" id="ipdIa4~cOclR8yt_ClW93a"><stop stop-color="#f4e9c3" offset="0"></stop><stop stop-color="#f8eecd" offset=".219"></stop><stop stop-color="#fdf4dc" offset=".644"></stop><stop stop-color="#fff6e1" offset="1"></stop></radialGradient><path d="M51.03,37.34c0.16,0.98,1.08,1.66,2.08,1.66h5.39c2.63,0,4.75,2.28,4.48,4.96	C62.74,46.3,60.64,48,58.29,48H49c-1.22,0-2.18,1.08-1.97,2.34c0.16,0.98,1.08,1.66,2.08,1.66h8.39c1.24,0,2.37,0.5,3.18,1.32	C61.5,54.13,62,55.26,62,56.5c0,2.49-2.01,4.5-4.5,4.5h-49c-1.52,0-2.9-0.62-3.89-1.61C3.62,58.4,3,57.02,3,55.5	C3,52.46,5.46,50,8.5,50H14c1.22,0,2.18-1.08,1.97-2.34C15.81,46.68,14.89,44,13.89,44H5.5c-2.63,0-4.75-2.28-4.48-4.96	C1.26,36.7,3.36,35,5.71,35H8c1.71,0,3.09-1.43,3-3.16C10.91,30.22,9.45,29,7.83,29H4.5c-2.63,0-4.75-2.28-4.48-4.96	C0.26,21.7,2.37,20,4.71,20H20c0.83,0,1.58-0.34,2.12-0.88C22.66,18.58,23,17.83,23,17c0-1.66-1.34-3-3-3h-1.18	c-0.62-0.09-1.43,0-2.32,0h-9c-1.52,0-2.9-0.62-3.89-1.61S2,10.02,2,8.5C2,5.46,4.46,3,7.5,3h49c3.21,0,5.8,2.79,5.47,6.06	C61.68,11.92,60.11,14,57.24,14H52c-2.76,0-5,2.24-5,5c0,1.38,0.56,2.63,1.46,3.54C49.37,23.44,50.62,24,52,24h6.5	c3.21,0,5.8,2.79,5.47,6.06C63.68,32.92,61.11,35,58.24,35H53C51.78,35,50.82,36.08,51.03,37.34z" fill="url(#ipdIa4~cOclR8yt_ClW93a)"></path><linearGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(0 -534)" y2="590.253" y1="530.096" x2="32" x1="32" id="ipdIa4~cOclR8yt_ClW93b"><stop stop-color="#42d778" offset="0"></stop><stop stop-color="#3dca76" offset=".428"></stop><stop stop-color="#34b171" offset="1"></stop></linearGradient><path d="M57,32c0,12.837-9.663,23.404-22.115,24.837C33.942,56.942,32.971,57,32,57	c-1.644,0-3.25-0.163-4.808-0.471C15.683,54.298,7,44.163,7,32C7,18.192,18.192,7,32,7S57,18.192,57,32z" fill="url(#ipdIa4~cOclR8yt_ClW93b)"></path><path d="M41.683,44.394c-0.365,0-0.731-0.181-1.096-0.365c-3.471-2.009-7.674-3.105-12.24-3.105	c-2.559,0-5.116,0.364-7.491,0.912c-0.365,0-0.914,0.183-1.096,0.183c-0.914,0-1.461-0.732-1.461-1.462	c0-0.913,0.547-1.463,1.279-1.643c2.923-0.732,5.846-1.096,8.951-1.096c5.116,0,9.866,1.276,13.885,3.655	c0.548,0.364,0.914,0.73,0.914,1.642C43.145,43.847,42.414,44.394,41.683,44.394z M44.241,38.181c-0.547,0-0.912-0.18-1.279-0.364	c-3.835-2.375-9.135-3.839-15.163-3.839c-2.924,0-5.664,0.366-7.674,0.916c-0.549,0.18-0.731,0.18-1.096,0.18	c-1.096,0-1.827-0.912-1.827-1.826c0-1.096,0.549-1.645,1.461-2.009c2.74-0.73,5.481-1.279,9.317-1.279	c6.213,0,12.241,1.463,16.991,4.384c0.73,0.364,1.096,1.096,1.096,1.826C46.069,37.269,45.337,38.181,44.241,38.181z M47.165,30.876	c-0.548,0-0.731-0.182-1.279-0.364c-4.385-2.559-10.961-4.021-17.356-4.021c-3.289,0-6.577,0.366-9.5,1.096	c-0.366,0-0.731,0.182-1.279,0.182c-1.279,0.183-2.193-0.912-2.193-2.192c0-1.279,0.731-2.009,1.644-2.192	c3.471-1.096,7.125-1.462,11.327-1.462c6.943,0,14.25,1.462,19.731,4.567c0.73,0.366,1.278,1.096,1.278,2.193	C49.357,29.961,48.442,30.876,47.165,30.876z" fill="#fff"></path></svg>
    <p class="heading">Currently Playing</p>
  </div>
  <div class="loader">
    <div class="song">
      <p class="name">Time in a Bottle</p>
      <p class="artist">Jim Corce</p>
    </div>
    <div class="albumcover"></div>
    <div class="loading">
      <div class="load"></div>
      <div class="load"></div>
      <div class="load"></div>
      <div class="load"></div>
    </div>
  </div>
  <div class="loader">
    <div class="song">
      <p class="name">My Way</p>
      <p class="artist">Frank Sinatra</p>
    </div>
    <div class="albumcover"></div>
    <div class="play"></div>
  </div>
  <div class="loader">
    <div class="song">
      <p class="name">Lemon Tree</p>
      <p class="artist">Fools Garden</p>
    </div>
    <div class="albumcover"></div>
    <div class="play"></div>
  </div>
</div> */}

// css
// .main {
//   background-color: white;
//   padding: 1em;
//   padding-bottom: 1.1em;
//   border-radius: 15px;
//   margin: 1em;
// }

// .loader {
//   display: flex;
//   flex-direction: row;
//   height: 4em;
//   padding-left: 1em;
//   padding-right: 1em;
//   transform: rotate(180deg);
//   justify-content: right;
//   border-radius: 10px;
//   transition: .4s ease-in-out;
// }

// .loader:hover {
//   cursor: pointer;
//   background-color: lightgray;
// }

// .currentplaying {
//   display: flex;
//   margin: 1em;
// }

// .spotify {
//   width: 50px;
//   height: 50px;
//   margin-right: 0.6em;
// }

// .heading {
//   color: black;
//   font-size: 1.1em;
//   font-weight: bold;
//   align-self: center;
// }

// .loading {
//   display: flex;
//   margin-top: 1em;
//   margin-left: 0.3em;
// }

// .load {
//   width: 2px;
//   height: 33px;
//   background-color: limegreen;
//   animation: 1s move6 infinite;
//   border-radius: 5px;
//   margin: 0.1em;
// }

// .load:nth-child(1) {
//   animation-delay: 0.2s;
// }

// .load:nth-child(2) {
//   animation-delay: 0.4s;
// }

// .load:nth-child(3) {
//   animation-delay: 0.6s;
// }

// .play {
//   position: relative;
//   left: 0.35em;
//   height: 1.6em;
//   width: 1.6em;
//   clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);
//   background-color: black;
//   transform: rotate(-90deg);
//   align-self: center;
//   margin-top: 0.7em;
//   justify-self: center;
// }

// .albumcover {
//   position: relative;
//   margin-right: 1em;
//   height: 40px;
//   width: 40px;
//   background-color: rgb(233, 232, 232);
//   align-self: center;
//   border-radius: 5px;
// }

// .song {
//   position: relative;
//   transform: rotate(180deg);
//   margin-right: 1em;
//   color: black;
//   align-self: center;
// }

// .artist {
//   font-size: 0.6em;
// }

// @keyframes move6 {
//   0% {
//     height: 0.2em;
//   }

//   25% {
//     height: 0.7em;
//   }

//   50% {
//     height: 1.5em;
//   }

//   100% {
//     height: 0.2em;
//   }
// }

// notification html
{/* <div class="card">
  <svg class="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
      fill-opacity="1"
    ></path>
  </svg>

  <div class="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke-width="0"
      fill="currentColor"
      stroke="currentColor"
      class="icon"
    >
      <path
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
      ></path>
    </svg>
  </div>
  <div class="message-text-container">
    <p class="message-text">Success message</p>
    <p class="sub-text">Everything seems great</p>
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    stroke-width="0"
    fill="none"
    stroke="currentColor"
    class="cross-icon"
  >
    <path
      fill="currentColor"
      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
      clip-rule="evenodd"
      fill-rule="evenodd"
    ></path>
  </svg>
</div> */}

// Notification css 
/* From Uiverse.io by akshat-patel28 */ 
// .card {
//   width: 330px;
//   height: 80px;
//   border-radius: 8px;
//   box-sizing: border-box;
//   padding: 10px 15px;
//   background-color: #ffffff;
//   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
//   position: relative;
//   overflow: hidden;
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
//   gap: 15px;
// }
// .wave {
//   position: absolute;
//   transform: rotate(90deg);
//   left: -31px;
//   top: 32px;
//   width: 80px;
//   fill: #04e4003a;
// }
// .icon-container {
//   width: 35px;
//   height: 35px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #04e40048;
//   border-radius: 50%;
//   margin-left: 8px;
// }
// .icon {
//   width: 17px;
//   height: 17px;
//   color: #269b24;
// }
// .message-text-container {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   flex-grow: 1;
// }
// .message-text,
// .sub-text {
//   margin: 0;
//   cursor: default;
// }
// .message-text {
//   color: #269b24;
//   font-size: 17px;
//   font-weight: 700;
// }
// .sub-text {
//   font-size: 14px;
//   color: #555;
// }
// .cross-icon {
//   width: 18px;
//   height: 18px;
//   color: #555;
//   cursor: pointer;
// }
