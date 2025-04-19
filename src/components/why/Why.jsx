import React from 'react'
import './why.css'
import { FaUserPlus } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { BsBarChartFill } from "react-icons/bs";
const Why = () => {
  return (
      <div className='why-choose-section'>
          <div className="why-choose-us-img-container">
              <div className="videoframe-text-container" data-aos="fade-up">
                    <h1>Market  <span className="highlight">rates</span></h1>
                    <p>comprehensive features</p>
                </div>
              <img src="/apexmockup10.png" alt="" className="mockup" data-aos="fade-up"/>
          </div>
        
          <div className="why-choose-us-card-container">
              <div className="why-choose-us-text-container">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>our comprehensive features</h2>
            </div>
            <h1 data-aos="fade-up">apexcopytrade</h1>
            <p data-aos="fade-up">the following are our comprehensive features.</p>
            </div>
            <div className="why-choose-us-card" data-aos="fade-up">
                <span className="card-counter">01</span>
                <IoWallet />
                <h2>Market review</h2>
                <p>Analyze all trades to select prospective assets and enter/exit positions in time, earning the most.</p>
            </div>
            <div className="why-choose-us-card" data-aos="fade-up">
                <span className="card-counter">02</span>
                <BsBarChartFill />
                <h2>Access</h2>
                <p>Get a global investment experience with all sorts of tools on the stock, foreign exchange and commodity market.</p>
            </div>
        </div>
    </div>
  )
}

export default Why