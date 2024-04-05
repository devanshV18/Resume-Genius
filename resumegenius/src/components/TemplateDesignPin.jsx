import React from 'react'
import {motion} from "framer-motion"

const TemplateDesignPin = ({data, index}) => {
  return (
    <motion.div 
    initial = {{opacity:0, scale:0.85}}
    animate = {{opacity:1, scale:1}}
    exit = {{opacity:0, scale:0.85}}
    transition={{delay : index*0.3}}
    >
     <div className='w-full h-[500px] 2xl:h-[740px] rounded-md bg-gray-200 overflow-hidden relative'>
        <img src={data?.imageURL} className='w-full h-full object-cover' alt="" />
     </div>
    </motion.div>
  )
}

export default TemplateDesignPin
