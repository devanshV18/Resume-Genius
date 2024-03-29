import React from 'react'
import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { FaUpload } from 'react-icons/fa6';

const CreateTemplate = () => {

    const [formData, setformData] = useState({
      title: "",
      imageURL: null
    });

    const [imageAsset, setimageAsset] = useState({
      isImageLoading: false,
      uri : null,
      progress: 0
    });

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setformData((prevRec) => ({...prevRec, [name]: value}))
    }

    // const handleFileSelect = async (e) => {
    //     const file = e.target.files[0]
    // }

   

  return (
    
    
    
    
    <div className='w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12'>
        {/* LEFT conatiner */}
      
            <div className='col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2'>

              <p className='text-2xl   text-black'>Create a new Template</p>  

              {/* DUMMY RECORD FOR TEMPLATE ID */}
              <div className='w-full flex items-center justify-end'>
                
                <p className='text-base text-gray=400 uppercase font-semibold'>
                  TempID : {""}
                </p>

                <p className='text-sm text-black capitalize font-bold'>
                  Template1
                </p>
              
              </div>

              {/* template title section */}

              <input
                className='w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-gray-200 focus:text-black focus:shadow-md outline-none`'
                type='text'
                name='title'
                placeholder='Template title'
                value={formData.title}
                onChange={handleInputChange}
              />

              
              {/* FILE UPLOADER SECTION */}
            
            <div className='w-full bg-gray-300 backdrop-blur-md h-[420px lg;h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-100 cursor-pointer flex items-center justify-center'>
              
              {/* {imageAsset.isImageLoading ? (
                
                <div className='flex flex-col items-center justify-center gap-4'>
                  <PuffLoader color='#498FCD' size={40}/>
                  <p>{imageAsset?.progress.toFixed(2)}%</p>
                </div>
                
              ):(
                
              // <React.Fragment>
              //   {!imageAsset?.uri ? (
                  
              //   ): (

              //   )}
              // </React.Fragment>
                
                
              )} */}
                  
            </div> 

     </div>


      {/* RIGHT CONTAINER */}
      <div className='col-span-12 lg:col-span-8 2xl:col-span-9 bg-red-200'>
        2  
      </div>
    </div>
  )
}

export default CreateTemplate
