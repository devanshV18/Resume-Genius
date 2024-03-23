import React from 'react'
import useUser from "../hooks/useUser"
import {Link} from "react-router-dom"
import {Logo} from "../assets"
import {AnimatePresence,motion} from "framer-motion"
import { PuffLoader } from 'react-spinners'

const Header = () => {
    const {data, isLoading, isError} = useUser();
  return (
    <header className='w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-gray-300 bg-bgPrimary z-50 gap-12 sticky top-0'> 

      {/* logo */}

      <Link to={"/"}>
        <img src={Logo} alt="" className='w-12 h-auto object-contain'/>
      </Link>



      {/* input */}

      <div className='flex-1 border border-black px-4 pt-1 rounded-b-md flex items-center justify-between bg-indigo-200'>
        <input type="text" 
        placeholder='Search here...' 
        className='flex-1 h-10 bg-transparent text-2xl text-black outline-none border-none'
        />
      </div>



      {/* profile */}
      <AnimatePresence>
        {isLoading ? (<PuffLoader color='$498FCD' size={40}/>) :
         (<React.Fragment>

          {data ? 
            (<motion.div className='relative'>
              
              {data?.photoURL ? 
              
              (<div className='w-12 h-12 rounded-md relative flex items-center justify-center'>
                  <img src={data?.photoURL} 
                  className='w-full h-full object-cover rounded-md'
                  referrerPolicy="no-referrer"
                   alt="" 
                   />
              </div>) : 
              
              (<div className='w-12 h-12 rounded-md cursor-pointer relative flex items-center justify-center bg-blue-700 shadow-md'>
                  <p className='text-lg text-white'>{data?.email[0]}</p>
              </div>
              
              )}

              {/* dropdown menu */}
              <AnimatePresence>
              
              <motion.div className='absolute px-4 py-3 rounded-md bg-white right-0 top-10 flex flex-col items-center justify-start gap-3 w-64 pt-12'>
                
              {data?.photoURL ? 
              
              (<div className='w-12 h-12 rounded-md relative flex items-center justify-center'>
                  <img src={data?.photoURL} 
                  className='w-full h-full object-cover rounded-md'
                  referrerPolicy="no-referrer"
                   alt="" 
                   />
              </div>) : 
              
              (<div className='w-12 h-12 rounded-md cursor-pointer relative flex items-center justify-center bg-blue-700 shadow-md'>
                  <p className='text-lg text-white'>{data?.email[0]}</p>
              </div>
              
              )}

              </motion.div>
              
              </AnimatePresence>
              
            </motion.div> ):

            (<Link to={"/auth"}>
              <motion.button>Login</motion.button>
            </Link> ) 

          }

         </React.Fragment>)
        }
      </AnimatePresence>

    </header>
  )
}

export default Header
