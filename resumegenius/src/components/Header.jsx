import React, { useState } from 'react'
import useUser from "../hooks/useUser"
import {Link} from "react-router-dom"
import {Logo} from "../assets"
import {AnimatePresence,motion} from "framer-motion"
import { PuffLoader } from 'react-spinners'
import { RiLogoutCircleLine } from "react-icons/ri";
import { fadeInOutWithOpacity, slideUpDownMenu } from '../animations'
import { useQueryClient } from 'react-query'
import { auth } from '../config/firebase.config'
import { adminIds } from '../utils/helpers'
import useFilters from '../hooks/useFilters'

const Header = () => {
    const {data, isLoading, isError} = useUser();
    const [isMenu,setIsMenu] = useState(false)

    const queryClient = useQueryClient()
    const {data: filterData} = useFilters()


    const signOutUser = async() => {
      await auth.signOut().then(() => {
        queryClient.setQueryData("user",null);
      })
    }

    const handleSearchTerm = (e) => {
      queryClient.setQueryData("globalFilter", {
        ...queryClient.getQueryData("globalFilter"),
        searchTerm: e.target.value,
      })
    }

    const clearFilter = () => {
      queryClient.setQueryData("globalFilter", {
        ...queryClient.getQueryData("globalFilter"),
        searchTerm: "",
      })
    }


  return (
    <header className='w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-gray-300 bg-bgPrimary z-50 gap-12 sticky top-0'> 

      {/* logo */}

      <Link to={"/"}>
        <img src={Logo} alt="" className='w-12 h-auto object-contain'/>
      </Link>



      {/* input */}

      <div className='flex-1 border border-black px-4 pt-1 rounded-b-md flex items-center justify-between bg-indigo-200'>
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1 h-10 bg-transparent text-2xl text-black outline-none border-none"
          onChange={handleSearchTerm}
          value={filterData?.searchTerm || ""}
        />


          <AnimatePresence>
            {filterData?.searchTerm && filterData.searchTerm.length > 0 && (
              <motion.div
                onClick={clearFilter}
                {...fadeInOutWithOpacity}
                className="w-8 h-8 flex items-center justify-center cursor-pointer active:scale-95 duration-150"
              >
                <p className="text-2xl text-white">X</p>
              </motion.div>
            )}
          </AnimatePresence>
      </div>



      {/* profile */}
      <AnimatePresence>
        {isLoading ? (<PuffLoader color='$498FCD' size={40}/>) :
         (<React.Fragment>

          {data ? 
            (
            <motion.div className='relative cursor-pointer' onClick={() => setIsMenu(!isMenu)}>
              
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
              
                {isMenu && 
                <motion.div {...fadeInOutWithOpacity}
                {...slideUpDownMenu}
                className='absolute px-4 py-3 rounded-md bg-white right-0 top-10 flex flex-col items-center justify-start gap-3 w-64 pt-12' onMouseLeave={() => setIsMenu(false)}>
                
                {data?.photoURL ? 
                
                (
                
                <div className='w-20 h-20 rounded-full relative flex items-center justify-center'>
                    <img src={data?.photoURL} 
                    className='w-full h-full object-cover rounded-md'
                    referrerPolicy="no-referrer"
                     alt="" 
                     />
  
                    
                </div>
                
                ) : 
                
                (
                
                <div className='w-20 h-20 rounded-full cursor-pointer relative flex items-center justify-center bg-blue-700 shadow-md'>
                  <p className='text-lg text-white'>{data?.email[0]}</p>
                </div>
                
                )}
  
                {data?.displayName && (
                  <p className='text-lg text-black'>
                    {data?.displayName}
                  </p>
                )} 
  
                
                    <div className='w-full flex-col items-start flex gap-8 pt-6'>
  
                    <Link className='text-txtLight hover:text-txtDark text-base whitespace-nowrap' to={"/profile"}>
                      My Account
                    </Link>
  
                    {
                      data?.uid && adminIds.includes(data?.uid) && (
                        <Link className='text-txtLight hover:text-txtDark text-base whitespace-nowrap' to={"/template/create"}>
                        Add New Template
                      </Link>
                      )
                    }
  
                    <div className='w-full px-2 py-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer' onClick={signOutUser}>
                      <p>SignOut</p>
                      
                      <RiLogoutCircleLine className='group-hover:text-txtDark text-txtLight'/>
  
                    </div>
                  
                  </div>
  
                </motion.div>}

          </AnimatePresence>
              
            </motion.div> 
            
            ):

            (<Link to={"/auth"}>
              <motion.button 
              className="px-4 py-2 rounded-md border border-indigo-200 hover:shadow-md active:scale-95 duration-150"
              type='button'
              {...fadeInOutWithOpacity}>
                Login
              </motion.button>
            </Link> ) 

          }

         </React.Fragment>)
        }
      </AnimatePresence>

    </header>
  )
}

export default Header
