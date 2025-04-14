import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import Swal from 'sweetalert2';
import axios from 'axios';
import './userdashboardkyc.css'; 
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1duesyx3zu/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'upload';

const UserdashboardKyc = ({route}) => {
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
   const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.document) {
      return Swal.fire('Incomplete Form', 'Please fill all fields and upload a document.', 'warning');
    }

    try {
      // Upload document to Cloudinary
      const data = new FormData();
      data.append('file', formData.document);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const uploadRes = await axios.post(CLOUDINARY_URL, data);
      const uploadedUrl = uploadRes.data.secure_url;

      // Show confirmation
      Swal.fire('KYC Submitted', 'Your document is under review.', 'success');

      console.log('Uploaded file URL:', uploadedUrl);

      // Reset form
      e.target.reset();
      setFormData({ fullName: '', email: '', document: null });
    } catch (error) {
      console.error(error);
      Swal.fire('Upload Failed', 'Something went wrong while uploading.', 'error');
    }
  };
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
        <form className="kyc-form" onSubmit={handleSubmit}>
            <h2>KYC Submission</h2>

            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Upload Document</label>
            <input type="file" name="document" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} required />

            <button type="submit">Submit KYC</button>
          </form>
          </section>
        </main>  
  )
}

export default UserdashboardKyc