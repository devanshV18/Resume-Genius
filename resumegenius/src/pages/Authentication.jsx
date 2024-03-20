import React from 'react'
import {Logo} from "../assets"
import { Footer } from '../containers'

const Authentication = () => {
  return (
    <div className='auth-section'>
      {/* top section */}
      <img src={Logo} className='w-20 h-auto object-contain' alt="" />

      {/* main section */}
      <div className='w-full flex flex-1 flex-col items-center justify-center gap-6 bg-indigo-300'>
        <h1 className='text-3xl lg:text-4xl'>Welocme to Resume Genius</h1>
        <p className='text-3xl'>Fast and Convinient resume creation in minutes</p>
        <h2 className='text-3xl'>Authentication</h2>
      </div>

      {/* footer */}
      <Footer/>
      
    </div>
  )
}

export default Authentication
