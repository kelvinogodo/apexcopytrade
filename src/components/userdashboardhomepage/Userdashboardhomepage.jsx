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
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
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
    <Userdashboardheader />
    <div className='dashboardhomepage'>
        <div className="dashboardhomepagewrapper">
          
        </div>
    </div>
    </div>
  )
}

export default Userdashboardhomepage

