import React from 'react'
import {ImStack} from 'react-icons/im'
import {SiReactos} from 'react-icons/si'
import {TbCertificate,TbChartDots2} from 'react-icons/tb'
import {TfiPieChart} from 'react-icons/tfi'
import {BsBarChartLine} from 'react-icons/bs'
import {BiNetworkChart} from 'react-icons/bi'
import {GiChart} from 'react-icons/gi'
import { MdOutlineAddchart } from 'react-icons/md'
import CountUp from 'react-countup'
const Faqcard = () => {
  return (
    <div className='why-choose-section'>
      <div className="why-choose-us-img-container">
        <div className="videoframe-text-container" data-aos="fade-up">
            <h1>Market  <span className="highlight">rates</span></h1>
            <p>Grab an overview of global markets including price changes, open, high, low, and close values for selected instruments.</p>
        </div>
        <img src="/web-phone.png" alt="" className="mockup" data-aos="fade-up"/>
        </div>
      <div className="why-choose-us-card-container">
        <div className="why-choose-us-text-container">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>why choose us</h2>
            </div>
            <h1 data-aos="fade-up">best qualities</h1>
            <p data-aos="fade-up">Our Team combines a passion for esports, industry experise & proven record in finance, development, marketing.</p>
        </div>
            <div class="outer" data-aos="fade-up">
              <div class="dot"></div>
              <div class="card">
                <div class="ray"></div>
                <div class="text"><CountUp end={973} />k</div>
                <div>active traders</div>
                <div class="line topl"></div>
                <div class="line leftl"></div>
                <div class="line bottoml"></div>
                <div class="line rightl"></div>
              </div>
            </div>
            <div class="outer" data-aos="fade-up">
              <div class="dot"></div>
              <div class="card">
                <div class="ray"></div>
                <div class="text"><CountUp end={186} /></div>
                <div>supported countries</div>
                <div class="line topl"></div>
                <div class="line leftl"></div>
                <div class="line bottoml"></div>
                <div class="line rightl"></div>
              </div>
              </div>
              <div class="outer" data-aos="fade-up">
                <div class="dot"></div>
                <div class="card">
                  <div class="ray"></div>
                  <div class="text"><CountUp end={152} />k</div>
                  <div>transactions</div>
                  <div class="line topl"></div>
                  <div class="line leftl"></div>
                  <div class="line bottoml"></div>
                  <div class="line rightl"></div>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Faqcard