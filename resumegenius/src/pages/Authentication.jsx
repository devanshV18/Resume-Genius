import React from 'react'
import {Logo} from "../assets"
import { Footer } from '../containers'
import {AuthButtonWithProvider} from '../components'
import {FaGoogle, FaGithub} from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useUser from '../hooks/useUser'



const Authentication = () => {

  const {data, isLoading, isError} = useUser()

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoading && data){
      navigate("/",{replace:true})
    }
  },[isLoading, data])

  return (
    <div className='auth-section'>
      {/* top section */}
      <img src={Logo} className='w-20 h-auto object-contain' alt="" />

      {/* main section */}
      <div className='w-full flex flex-1 flex-col items-center justify-center gap-6 bg-indigo-300'>

        <h1 className='text-3xl lg:text-4xl'>Welocme to Resume Genius</h1>
        <p className='text-3xl'>Fast and Convinient resume creation in minutes</p>
        <h2 className='text-3xl'>Authentication</h2>

        <div className='w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6'>
          <AuthButtonWithProvider Icon={FaGoogle} label={"Signin with Google"} provider={"GoogleAuthProvider"}/>
          <AuthButtonWithProvider Icon={FaGithub} label={"Signin with Github"} provider={"GitHubAuthProvider"}/>
          
        </div>


      </div>

      

      {/* footer */}
      <Footer/>
      
    </div>
  )
}

export default Authentication
