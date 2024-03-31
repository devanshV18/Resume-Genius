import React from 'react'
import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { FaTrash, FaUpload } from 'react-icons/fa6';
import { Zoom, toast } from 'react-toastify';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'; 
import { storage } from '../config/firebase.config';
import { initialTags } from '../utils/helpers';
import { deleteDoc, serverTimestamp } from 'firebase/firestore';
import useTemplates from '../hooks/useTemplates';
import { db } from '../config/firebase.config';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';



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

    const [selectedTags, setselectedTags] = useState([]);

    // const {data: templates, isError: templatesError, isLoading: templatesIsLoading, refetch: templatesRefetch} = useTemplates()3

    const {data: templates, isError: templatesError, isLoading: templatesIsLoading, refetch: templatesRefetch} = useTemplates()

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setformData((prevRec) => ({...prevRec, [name]: value}))
    }

    const handleFileSelect = async (e) => {
        const file = e.target.files[0]
        setimageAsset((prev)  => ({...prev,isImageLoading:true}))

        if(file && isAllowed(file)){
          const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`)
          const uploadTask = uploadBytesResumable(storageRef, file)

          uploadTask.on(
            'state_changed', 
            (snapshot)=> {
              setimageAsset((prev) => ({
              ...prev,
              progress:(snapshot.bytesTransferred / snapshot.totalBytes) * 100 }
              ))
            }, 
            (error)=> {
              if(error.message.includes("storage/unauthorized")){
                toast.error(`Error : Authentication revoked`)
              }else{
                toast.error(`Error : ${error.message}`)
              }
            },
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                setimageAsset((prev) => ({
                  ...prev,
                  uri: downloadURL
                }))
              })

              toast.success("Imager Uplaoded")
              setInterval(() => {
                setimageAsset((prevAsset) => (
                  {
                    ...prevAsset,
                    isImageLoading:false,
                  }
                ))
              },2000)
            }
          )
        }
          
        else{
          toast.info("Invalid File Format")
        }

    }

    //deleting from cloud 
    
    const deleteImage = async() => {

      const deleteRef = ref(storage, imageAsset.uri)
      deleteObject(deleteRef).then(()=>{
      toast.success("Image Removed")
            setInterval(() => {
            setimageAsset((prev) => ({
              ...prev,progress:0,
              uri:null,
              }))
          },2000)

          
      })
    }

    const isAllowed = (file) => {
      const allowedTypes = ["image/jpeg","image/jpg","image/png"]
      //returning true if file type includes any of allowed types
      return allowedTypes.includes(file.type) 
    }

    const handleSelectedTags = (tag) => {
      // Check if the tag is selected or not
      if (selectedTags.includes(tag)) {
        setselectedTags(selectedTags.filter((selected) => selected !== tag));
      } else {
        setselectedTags([...selectedTags, tag]);
      }
    };

    const pushToCloud = async() => {
      const timestamp = serverTimestamp()
      const id = `${Date.now()}`
      const _doc = {
        _id: id,
        title: formData.title,
        imageURL: imageAsset.uri,
        tags: selectedTags,
        name: templates && templates.length>0 ? `Templates${templates.length+1}`: "Template1",
        timestamp: timestamp
      }

      await setDoc(doc(db,"templates",id),_doc).then(() => {
        setformData((prevData) => ({...prevData,title:"",imageURL:""}))
        setimageAsset((prevAsset) => ({...prevAsset, uri:null}))
        setselectedTags([])
        templatesRefetch()
        toast.success("Data pushed to the cloud")
      }).catch(error => {
        toast.error(`Error: ${error.message}`);
      })
    }

    const removeTemplate = async() => {
      const deleteRef = ref(storage, templates?.imageURL)
      await deleteObject(deleteRef).then(async () => {
        await deleteDoc(doc(db,"templates", templates?._id)).then(() => {
          toast.success("Template deleted from the cloud")
          templatesRefetch()
        }).catch(err => {
          toast.error(`Error : ${err.message}`)
        })
      })
    }

   

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
          {templates && templates.length>0 ? `Templates${templates.length+1}`: "Template1"}
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
            
        <div className='w-full bg-gray-300 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-100 cursor-pointer flex items-center justify-center'>
              
          {imageAsset.isImageLoading ? (
            <React.Fragment>
              <div className='flex flex-col items-center justify-center gap-4'>
                 <PuffLoader color='#498FCD' size={40}/>
                <p>{imageAsset?.progress.toFixed(2)}%</p>
              </div>
            </React.Fragment>
                
              ) : (
                <React.Fragment>
                  {!imageAsset?.uri ? (
                    <React.Fragment>
                      <label className='w-full cursor-pointer h-full'>
                        <div className='flex flex-col items-center justify-center h-full w-full'>
                          <div className='flex items-center justify-center cursor-pointer flex-col gap-4'>
                            <FaUpload/>
                            <p className='text-lg text-black'>Click to Upload</p>
                          </div>
                        </div>
                        <input 
                          type='file'
                          className='w-0 h-0'
                          accept='.jpeg,.png,.jpg'
                          onChange={handleFileSelect}
                        />
                      </label>
                      </React.Fragment>
                    ) : (
                      // Add your logic for when an image is already uploaded
                      <React.Fragment>
                        <div className='relative w-full h-full overflow-hidden rounded-md'>
                          <img src={imageAsset?.uri} 
                          className='w-full h-full object-cover'
                          loading='lazy'
                          alt="" />
                        </div>

                        <div className='absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-400 cursor-pointer' onClick={deleteImage}>
                          <FaTrash className='text-sm text-white'/>
                        </div>
                      </React.Fragment>
                    )}
                        </React.Fragment>
                      )}

                  
        </div> 

        
          <div className='w-full flex items-center flex-wrap gap-2'>
            {initialTags.map((tag,i)=>(
              <div key={i} 
              className={`border border-black px-2 py-1 rounded-md cursor-pointer ${selectedTags.includes(tag)?"bg-blue-500 text-white":""}`}
              onClick={() => handleSelectedTags(tag)}>
                <p className='text-xl'>{tag}</p>
              </div>
            ))}
          </div>

          
          {/* action button */}

          <button type='button' 
          className='w-full bg-blue-500 text-white rounded-md py-3'
          onClick={pushToCloud}
          >

            Save
          </button>
        

  </div>


      {/* RIGHT CONTAINER */}
            <div className='col-span-12 lg:col-span-8 2xl:col-span-9 px-2 w-full flex-1 py-4'>
              {templatesIsLoading ? (
                <React.Fragment>
                  <div className='w-full h-full flex items-center justify-center'>
                    <PuffLoader color='#498FCD' size={40}/>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {templates && templates.length>0 ? 
                  (
                  <React.Fragment>
                    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
                        {templates?.map((template) => (
                          <div key={template._id} className='w-full h-[500px] rounded-md overflow-hidden relative'>
                            <img 
                            src={template?.imageURL} 
                            alt="" 
                            className='w-full h-full object-cover'/>

                            <div className='absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-400 cursor-pointer' onClick={() => removeTemplate(templates)}>
                              <FaTrash className='text-sm text-white'/>
                            </div>
                          </div>
                        ))}
                    </div>
                  </React.Fragment> 
                  ):(
                    <React.Fragment>
                      <div className='w-full h-full flex flex-col gap-6 items-center justify-center'>
                        {/* <PuffLoader color='#498FCD' size={40}/> */}
                        <p className='text-xl tracking-wider capitalize text-black'>No Data</p>
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
    
    </div>
  )
}

export default CreateTemplate
