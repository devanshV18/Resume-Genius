import React from 'react'
import {useParams, Link} from "react-router-dom"
import {useQuery} from "react-query"
import { getTemplateDetails } from '../api'
import { MainSpinner } from '../components'
import { FaHouse } from 'react-icons/fa6'
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi'
import useUser from '../hooks/useUser'
import { saveToCollections, saveToFavourites} from '../api'
import useTemplates from '../hooks/useTemplates'
import {AnimatePresence} from "framer-motion"
import {TemplateDesignPin} from '../components'


const TemplateDesignPinDetails = () => {
  const {templateID} = useParams()

  const {data, isError, isLoading, refetch} = useQuery(
    ["template", templateID], 
    () => getTemplateDetails(templateID)
  )

  const {data:user, refetch:userRefetch} = useUser()

  const {data: templates, refetch: temp_refetch, isLoading: temp_isLoading} = useTemplates()

  const addToCollection = async (e) => {
    e.stopPropagation()
    await saveToCollections(user,data)
    userRefetch()
  }

  const addToFavourites = async (e) => {
    e.stopPropagation()
    await saveToFavourites(user,data)
    temp_refetch()
    refetch()
  }
  

  if(isLoading) return <MainSpinner/>

  if(isError){
    return (
      <div className='w-full flex flex-col items-center justify-center'>
        <p>Error While fetching data. Please try Again</p>
      </div>
    )
  }

  return (
    <div className='w-full h-[60vh] flex flex-col items-center justify-start px-4 py-12'>
      <div className='w-full flex items-center pb-8 gap-2'>

        <Link 
        to={"/"}
        className='flex items-center justify-center gap-2 text-black'
        >
          <FaHouse/> Home
        </Link>

        <p>/</p>
        <p>{data?.name}</p>

      </div>

      <div className='w-full grid grid-cols-1 lg:grid-cols-12'>
        <div className='col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4'>
          <img className='w-full h-auto object-contain rounded-md' src={data?.imageURL} alt="" />

          <div className='w-full flex flex-col items-start justify-start gap-2'>
            <div className='w-full flex items-center justify-between'>
              <p>
                {data?.title}
              </p>

              {data?.favourites?.length>0 && (
               <div className='flex items-center justify-center gap-1'>
                <BiSolidHeart className="text-lg text-red-500"/>
                <p className='text-black font-semibold'>{data?.favourites?.length} Likes</p>
               </div>
              )}
            </div>

              {user && (
                <div className='flex items-center justify-center gap-3'>
                  {user?.collections?.includes(data?._id) 
                    ? (
                    <React.Fragment>
                      <div 
                      onClick={addToCollection}
                      className='flex items-center justify-center px-4 py-2 rounded-md border border-indigo-200 gap-2 hover:bg-indigo-400 cursor-pointer'>
                        <BiSolidFolderPlus className='text-base text-black'/>
                        <p className="text-lg text-black whitespace-nowrap">Remove From Collections</p>
                      </div>
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                      <div 
                      onClick={addToCollection}
                      className='flex items-center justify-center px-4 py-2 rounded-md border border-indigo-200 gap-2 hover:bg-indigo-400 cursor-pointer'>
                        <BiFolderPlus className='text-base text-black'/>
                        <p className="text-lg text-black whitespace-nowrap'">Add To Collections</p>
                      </div>
                    </React.Fragment>
                    )
                  }

                  {data?.favourites?.includes(user?.uid)
                    ? (
                    <React.Fragment>
                      <div 
                      onClick={addToFavourites}
                      className='flex items-center justify-center px-4 py-2 rounded-md border border-indigo-200 gap-2 hover:bg-indigo-400 cursor-pointer'>
                        <BiSolidHeart className='text-base text-black'/>
                        <p className="text-lg text-black whitespace-nowrap">Remove From Favourites</p>
                      </div>
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                      <div 
                      onClick={addToFavourites}
                      className='flex items-center justify-center px-4 py-2 rounded-md border border-indigo-200 gap-2 hover:bg-indigo-400 cursor-pointer'>
                        <BiHeart className='text-base text-black'/>
                        <p className="text-lg text-black whitespace-nowrap">Add To Favourites</p>
                      </div>
                    </React.Fragment>
                    )
                  }
                </div>
              )}
            
          </div>
        </div>

        <div className='col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 gap-6'>
          <div className='w-full h-72 bg-indigo-400 rounded-md overflow-hidden relative' 
            style={{
              background:"url(https://cdn.pixabay.com/photo/2023/10/04/03/04/ai-generated-8292699_1280.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover"
              }}
            >

            <div className='absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]'>
              <Link to={"/"} 
              className='px-4 py-2 rounded-md border-2border-gray-50 text-black'>
                Discover More
              </Link>
            </div>

          </div>

            {/* localhost:3000/resume/professional/123 */}
            {user && (
              <Link className='w-full px-4 py-3 rounded-md flex items-center justify-center bg-indigo-400 cursor-pointer' 
              to={`/resume/${data?.name}?templateId=${data?._id}`}>
                <p className='text-white font-semibold text-lg'>Edit this Template</p>
              </Link>
            )}

            <div className='w-full flex items-center justify-center flex-wrap gap-2'>
              {data?.tags?.map((tag,index) => (
                <p 
                key={index}
                className='text-2xl border bg-black text-white px-2 py-1 rounded-md whitespace-nowrap'>
                  {tag}
                </p>
              ))}
            </div>
        </div>

      </div>

      {templates?.filter((temp) => temp._id !== data?._id)?.length>0 && (
        <div className='w-full py-8 flex flex-col items-start justify-start gap-4'>
          <p className='text-lg font-semibold text-black'>You might also like</p>

          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2'>
            <React.Fragment>
              <AnimatePresence>
                {templates && templates?.filter((temp) => temp._id !== data?._id).map((template, index) => (
                  <TemplateDesignPin key={template?._id} data={template} index={index}/>
                ))}
              </AnimatePresence>
            </React.Fragment>
  
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateDesignPinDetails
