import React from 'react'
import  ButtonGradient from "../assets/svg/ButtonGradient.jsx"
import Header from '../Components/Header.jsx'
import Hero from '../Components/Hero.jsx'
import AboutUs from '../Components/AboutUs.jsx'
import Footer from '../Components/Footer.jsx'

function HomePage() {
  return (
    <>
    <h1 className="text-3xl font-bold underline ">
   
   </h1>
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
