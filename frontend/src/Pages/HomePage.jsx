import React from 'react'
import  ButtonGradient from "../assets/svg/ButtonGradient.jsx"
import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import AboutUs from '../components/AboutUs.jsx'
import Footer from '../components/Footer.jsx'

function HomePage() {
  return (
    <>
    
   <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
   <Header/>
   <Hero/>
   <AboutUs/>
   
   <Footer/>
   </div>
   <ButtonGradient/>
   </>
  )
}

export default HomePage
