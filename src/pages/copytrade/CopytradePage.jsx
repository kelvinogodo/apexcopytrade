import React from 'react'
import './copytrade.css'
import Header from '../../components/Header/Header'
import Plan from '../../components/plans/Plan'
import Footer from '../../components/footer/Footer'
import ForexAnalysisSection from '../../components/ForexAnalysisSection/ForexAnalysisSection'
import Contact from '../../components/contact/Contact'

const CopytradePage = () => {
  return (
    <> 
      <section className='copytrade-page-section'>
        <Header />
        <div className="copytrade-gap"></div>
        <Plan />
        <ForexAnalysisSection />
      </section>
      <Contact />
      <Footer />
      </>
  )
}

export default CopytradePage