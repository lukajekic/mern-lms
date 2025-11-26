import React from 'react'
import { useNavigate } from 'react-router'

const Welcome = () => {
    const navigate = useNavigate()
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-white'>
        <video src="/icons/welcome.mp4" className='w-full h-full' muted={true} autoPlay={true} controls={false} onEnded={()=>navigate("/")}></video>
    </div>
  )
}

export default Welcome