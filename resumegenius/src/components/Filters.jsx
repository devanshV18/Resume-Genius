import React, {useState} from 'react'
import {MdLayersClear} from "react-icons/md"
import { AnimatePresence, motion } from 'framer-motion';
import { slideDownWithScale } from '../animations';

const Filters = () => {
    const [isHover, setIsHover] = useState(false);
  return (
    <div className='w-full flex items-center justify-start py-4'>

      <div className='border border-red-400 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-red-300 relative'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      >
        <MdLayersClear className='text-xl'/>

        <AnimatePresence>
            {isHover && (
                <motion.div
                 {...slideDownWithScale}
                classname='absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1'
                >
                    <p className='whitespace-nowrap text-lg'>Clear All</p>
                </motion.div>
            )}
        </AnimatePresence>
        </div>
        

    </div>
  )
}

export default Filters
