import React from 'react'
import {useParams, Link} from "react-router-dom"
import {useQuery} from "react-query"
import { getTemplateDetails } from '../api'
import { MainSpinner } from '../components'
import { FaHouse } from 'react-icons/fa6'


const TemplateDesignPinDetails = () => {
  const {templateID} = useParams()

  const {data, isError, isLoading, refetch} = useQuery(
    ["template", templateID], 
    () => getTemplateDetails(templateID)
  )

  if(isLoading) return <MainSpinner/>

  if(isError){
    return (
      <div className='w-full h-[60vh] flex flex-col items-center justify-center'>
        <p className='text-lg text-black'>Error While fetching data. Please try Again</p>
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col items-center justify-start px-4 py-12'>
      <div className='w-full flex items-center gap-2'>
        <Link to={"/"}>
          <FaHouse/> Home
        </Link>
      </div>
    </div>
  )
}

export default TemplateDesignPinDetails
