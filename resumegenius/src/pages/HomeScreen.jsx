import React, { Suspense } from 'react'
import {Header, MainSpinner} from '../components'
import { HomeContainer } from '../containers'
import { Route, Routes } from 'react-router-dom'
import {CreateTemplate} from "../pages"

const HomeScreen = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {/* Header part */}
      <Header />

      <main className='w-full'>
        <Suspense fallback={<MainSpinner/>}>

          <Routes>
            <Route path="/" element={<HomeContainer/>} />
            <Route path="/template/create" element={<CreateTemplate/>} />
            
          </Routes>

        </Suspense>
      </main>

      
    </div>
  )
}

export default HomeScreen
