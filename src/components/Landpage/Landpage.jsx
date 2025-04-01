import React from 'react'
import './landpage.css'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TypoAnime from '../typo/TypoAnime'
import Tickertape from '../Tickertape'
const Landpage = () => {
    const navigate= useNavigate()
  return (
      <main className='landpage' >
          <Header />
          
        <div className='landpage-content-wrapper'>
           
              <motion.div className="landpage-text-container" 
                  
              >
                  <motion.div className="landpage-header">
                      <motion.span className="landpage-line"></motion.span>
                      <motion.div className="site-name"><span className="highlight">apexcopytrade</span></motion.div>
                      <motion.span className="landpage-line"></motion.span>
                  </motion.div>
                <motion.h1
                    initial={{y:45, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.65,delay:0.2}}
                >
                    <span className="landpage-highlight">copytrading</span> made seemless
                </motion.h1>
                <motion.p
                    initial={{y:45, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.65,delay:0.4}}
                >
                    Providing you the opportunity to copy experts in more than 50 assets for continuous income. 
                </motion.p>
                
              </motion.div>
              
          </div>
          <motion.button className='launch-btn'
                    initial={{y:45, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.65,delay:0.6}}
                    onClick={()=>{
                        navigate('/signup')
                    }}
                >
                    <span>start trading</span>
                </motion.button>
          <Tickertape />
    </main>
  )
}

export default Landpage





