import React from 'react'
import {motion} from "framer-motion"
import { scaleInOut } from '../animations'

const TemplateDesignPin = ({data, index}) => {
  return (
    <motion.div 
    {...scaleInOut}
    >
     <div className='w-full h-[500px] 2xl:h-[740px] rounded-md bg-gray-200 overflow-hidden relative'>
        <img src={data?.imageURL} className='w-full h-full object-cover' alt="" />
     </div>
    </motion.div>
  )
}

export default TemplateDesignPin
