import React from 'react'
import ButtonGradient from './assets/svg/ButtonGradient'
 
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Benefits from './components/Benefits.jsx'

import Footer from './components/Footer.jsx'
const App = () => {
  return (
    <>
     <h1 className="text-3xl font-bold underline ">
    
    </h1>
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
    <Header/>
    <Hero/>
    <Benefits/>
    
    <Footer/>
    </div>
    <ButtonGradient/>
    </>
  )
}

export default App


