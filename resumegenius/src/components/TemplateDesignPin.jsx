import {React, useState} from 'react'
import {AnimatePresence, delay, easInOut, motion} from "framer-motion"
import { fadeInOutWithOpacity, scaleInOut } from '../animations'
import {BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart} from "react-icons/bi"
import useUser from '../hooks/useUser'
import { saveToCollections, saveToFavourites } from '../api'
import useTemplates from '../hooks/useTemplates'
import {useNavigate} from "react-router-dom"


const TemplateDesignPin = ({data, index}) => {

    const [isHovered, setisHovered] = useState(false);

    const navigate = useNavigate()

    const {data:user, refetch:userRefetch} = useUser()
    const {refetch: temp_refetch} = useTemplates()

    const addToCollection = async (e) => {
        e.stopPropagation()
        await saveToCollections(user,data)
        userRefetch()
    }

    const addToFavourites = async (e) => {
        e.stopPropagation()
        await saveToFavourites(user,data)
        temp_refetch()
    }

    const handleRouteNavigation = () => {
        navigate(`/resumeDetail/${data?._id}`,{replace:true})
    }

  return (
    <motion.div 
    {...scaleInOut}
    >
     <div className='w-full h-[500px] 2xl:h-[740px] rounded-md bg-gray-200 overflow-hidden relative'
     onMouseEnter={() => setisHovered(true)}
     onMouseLeave={() => setisHovered(false)}
     >
        <img src={data?.imageURL} className='w-full h-full object-cover' alt="" />

        <AnimatePresence>
          {isHovered && (
            <motion.div
            {...fadeInOutWithOpacity}
            onClick={handleRouteNavigation}
            className='absolute inset-0  flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer'
            >
              <div className='flex flex-col items-end justify-start w-full gap-8 m-4'>
  
                  <InnerBoxCard 
                   label={user?.collections?.includes(data?._id) 
                   ? "Already added to Collections" 
                   : "Add to Collections!"}
  
                   Icon={user?.collections?.includes(data?.uid) 
                   ? BiSolidFolderPlus
                   : BiFolderPlus
                   } 
  
                   onHandle={addToCollection}
                  />
  
                  <InnerBoxCard 
                   label={data?.favourites?.includes(user?.uid)
                   ?"Added to Favourites" 
                   : "Add to Favourites Now!"} 
  
                   Icon={data?.favourites?.includes(user?.uid) 
                   ? BiSolidHeart 
                   : BiHeart} 
  
                   onHandle={addToFavourites}/>
  
              </div>
  
            </motion.div>
          )}
        </AnimatePresence>
     </div>
    </motion.div>
  )
}

const InnerBoxCard = ({label, Icon, onHandle}) => {

    const [isHoverred, setisHoverred] = useState(false);

    return(
        <div 
        onMouseEnter={() => setisHoverred(true)}
        onMouseLeave={() => setisHoverred(false)}
        onClick={onHandle}
        className='w-10 h-10 rounded-md bg-indigo-500 flex items-center justify-center hover:shadow-md relative'
        >
          <Icon className='text-white text-base'/>

          <AnimatePresence>
            {isHoverred && (
                <motion.div
                initial = {{opacity:0, scale:0.6, x:50}}
                animate = {{opacity:1, scale:1, x:0}}
                exit = {{opacity:0, scale:0.6, x:50}}
                className='px-3 py-2 rounded-md bg-indigo-400 absolute -left-44 after:w-2 after:h-2 after:bg-indigi-300 after:absolute after:right-1 after:top-[14px] after:rotate-45'
                >
                 <p className='text-lg text-black whitespace-nowrap'>{label}</p>   
                </motion.div>
            )}
          </AnimatePresence>
        </div>
    )
}

export default TemplateDesignPin
