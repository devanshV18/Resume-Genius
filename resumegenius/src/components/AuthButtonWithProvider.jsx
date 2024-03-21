import React from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import {GoogleAuthProvider,GithubAuthProvider, signInWithRedirect} from "firebase/auth"
import { auth } from "../config/firebase.config.js"

const AuthButtonWithProvider = ({Icon, label, provider}) => {

        const googleAuthProvider = new GoogleAuthProvider()
        const gitAuthProvider = new GithubAuthProvider()
    

    const handleClick = async () => {
        switch(provider){
            case "GoogleAuthProvider" :
                await signInWithRedirect(auth, googleAuthProvider).then((result) => {
                    console.log(result)
                }).catch(err => {
                    console.log(`Error : ${err.Message}`)
                })
                break

            case "GithubAuthProvider" :
                console.log("github")
                break

            default:
                await signInWithRedirect(auth, gitAuthProvider).then((result) => {
                    console.log(result)
                }).catch(err => {
                    console.log(`Error : ${err.Message}`)
                })
                break
        }
    }




  return (

    <div onClick={handleClick} className='w-full px-4 py-3 rounded-md border-2 border-blue-700 flex items-center justify-between cursor-pointer group hover:bg-indigo-500 active:scal-85 duration-150 hover:shadow-md'>

      <Icon className='text-txtPrimary text-xl group-hover:white'/>
      <p className='text-black text-lg group-hover:white'>{label}</p>
      <FaChevronRight className='text-txtPrimary text-base group-hover:text-white'/>

    </div>
  )
}

export default AuthButtonWithProvider
