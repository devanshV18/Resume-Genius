import React from 'react'
import {AnimatePresence, delay, easInOut, motion} from "framer-motion"
import { fadeInOutWithOpacity, scaleInOut } from '../animations'
import {BiFolderPlus, BiHeart} from "react-icons/bi"


const TemplateDesignPin = ({data, index}) => {

    const addToCollection = async () => {

    }

    const addToFavourites = async () => {
        
    }

  return (
    <motion.div 
    {...scaleInOut}
    >
     <div className='w-full h-[500px] 2xl:h-[740px] rounded-md bg-gray-200 overflow-hidden relative'>
        <img src={data?.imageURL} className='w-full h-full object-cover' alt="" />

        <AnimatePresence>
          <motion.div
          {...fadeInOutWithOpacity}
          className='absolute inset-0  flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer'
          >
            <div className='flex flex-col items-end justify-start w-full gap-8 m-4'>
                <InnerBoxCard label={"Add to Collection"} Icon={BiFolderPlus} onHandle={addToCollection}/>
                <InnerBoxCard label={"Add to Favourites"} Icon={BiHeart} onHandle={addToFavourites}/>
            </div>
          </motion.div>
        </AnimatePresence>
     </div>
    </motion.div>
  )
}

const InnerBoxCard = ({label, Icon, onHandle}) => {
    return(
        <div 
        onClick={onHandle}
        className='w-10 h-10 rounded-md bg-indigo-500 flex items-center justify-center hover:shadow-md relative'
        >
          <Icon className='text-white text-base'/>

          <AnimatePresence>
            <motion.div
            initial = {{opacity:0, scale:0.6, x:50}}
            animate = {{opacity:1, scale:1, x:0}}
            exit = {{opacity:0, scale:0.6, x:50}}
            className='px-3 py-2 rounded-md bg-indigo-400 absolute -left-44 after:w-2 after:h-2 after:bg-indigi-300 after:absolute after:right-1 after:top-[14px] after:rotate-45'
            >
             <p className='text-sm text-black whitespace-nowrap'>{label}</p>   
            </motion.div>
          </AnimatePresence>
        </div>
    )
}

export default TemplateDesignPin
