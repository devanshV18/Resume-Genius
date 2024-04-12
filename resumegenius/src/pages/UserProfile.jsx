import React, { useState, useEffect } from 'react'
import useUser from '../hooks/useUser'
import { TemplateDesignPin } from '../components'
import {AnimatePresence} from "framer-motion"
import useTemplates from '../hooks/useTemplates'
import {useNavigate} from "react-router-dom"

const UserProfile = () => {

  const {data:user} = useUser()
  const [activeTab, setActiveTab] = useState("collections")
  const navigate = useNavigate()

  const {
    data: templates,
    isLoading:temp_isLoading,
    isError:temp_isErro,
  } = useTemplates()

 useEffect(() => {
  if(!user){
    navigate("/auth", {replace:true})
  }
 },[])

  return (
    <div className='w-full flex flex-col items-center justify-start py-12'>
        <div className='w-full h-72 bg-indigo-300'>
          <img 
            src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="" 
            className='w-full h-full object-cover'
          />

          <div className='flex items-center justify-center flex-col gap-4'>
              {user?.photoURL ? (
                <React.Fragment>
                  <img 
                  src={user?.photoURL} 
                  className='w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md'
                  alt="" 
                  referrerPolicy="no-referrer"
                  loading='lazy'
                  />
                </React.Fragment>
                ) : (
                <React.Fragment>
                  <img 
                  src={"https://img.freepik.com/premium-vector/boy-character-white-background_995281-5601.jpg?w=740"}
                  className='w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md'
                  referrerPolicy='no-referrer'
                  loading='lazy'
                  alt="" />
                </React.Fragment>
                )
              }

              <p className='text-2xl text-black'>{user?.displayName}</p>
          </div>

          <div className='flex items-center justify-center mt-12'>
              <div 
              className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer `}
              onClick={()=> setActiveTab("collections")}
              >
                <p className={`text-xl text-black group-hover:text-indigo-700 px-4 py-1 rounded-full ${activeTab === 'collections' && "bg-white shadow-md text-indigo-700"}`}
                >
                  Collections
                </p>
              </div>

              <div 
              className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer `}
              onClick={()=> setActiveTab("resumes")}
              >
                <p className={`text-xl text-black group-hover:text-indigo-700 px-4 py-1 rounded-full ${activeTab === 'resumes' && "bg-white shadow-md text-indigo-700"}`}
                >
                  My Resumes
                </p>
              </div>
          </div>

              <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6'>
                <AnimatePresence>
                  {activeTab==='collections' && (
                    <React.Fragment>
                      {user?.collections.length > 0 && user?.collections ? (
                        <RenderATemplate 
                          templates={templates?.filter((temp) => 
                            user?.collections?.includes(temp?._id)
                          )}
                        />
                      ) : (
                        <div></div>
                      )
                    }
                    </React.Fragment>
                  )}
                </AnimatePresence>
              </div>


        </div>
    </div>
  )
}

const RenderATemplate = ({templates}) => {
  return (
    <React.Fragment>
      {templates && templates.length > 0 &&
      (
      <React.Fragment>
        <AnimatePresence>
          {templates && templates.map((template, index) => (
            <TemplateDesignPin key={template?._id} data={template} index={index}/>
          ))}
        </AnimatePresence>
      </React.Fragment>
      ) 
      }
    </React.Fragment>
  )
}

export default UserProfile
    