import React, { useState } from 'react'
import Header from '../components/Header'
import CourseBlocks from '../components/CourseBlock'
import TeacherInfoCard from '../components/TeacherInfoCard'
import Loader from '../components/Loader'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import axios from 'axios'
import SubHeader from '../components/SubHeader'
import ErrorModal from '../components/ErrorModal'
axios.defaults.withCredentials = true
const Course = () => {

const [error1, setError1] = useState(false)
  const [courseData, setCourseData] = useState({})
  useEffect(()=>{
    async function getCourseData() {
      try {
       const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/courses/${id}`)
      if (response.status === 200) {
      console.log(response.data)
      setCourseData(response.data)
      setLoading(false)
      

      } else {
        setError1(true)
        setLoading(false)
      } 
      } catch (error) {
        setError1(true)
        setLoading(false)
      }
      
    }
    setTimeout(() => {
          getCourseData()

    }, 700);



    async function getLessons() {
      try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/lessons?courseref=${id}`)
      if (response.status === 200) {
        console.log(response.data)
        setData(response.data)
      } else {
        setError1(true)
        setLoading(false)
      }
      } catch (error) {
        setError1(true)
        setLoading(false)

      }
    
    }
    setTimeout(() => {
      getLessons()
    }, 700);
  }, [])
      const [data, setData] = useState([])


    const [loading, setLoading] = useState(true)
const {id} = useParams()

  return (
    <div>
      <Header />
<SubHeader active={"courses"}/>

      


      {loading ? (
<Loader/>

      ) : (
        
      <div className="flex flex-col items-start px-8">
        <h1 className="text-4xl font-bold mt-5">{courseData.title}</h1>

        {/* Two columns side by side */}
        <div className="flex flex-row w-full mt-8">
          {/* Left part */}
          <div className="w-1/2 flex flex-col items-start gap-3">
            <h2 className="text-2xl font-bold mb-3">Lekcije</h2>



            <ul className="list bg-white rounded-box shadow-md w-[calc(100%-50px)]">
  
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Ovde se nalaze sve lekcije ovog kursa.</li>
  
{data.map((item, index)=>{
  return (
    <a href={`/lesson/${item._id}`}>
       <li className="list-row lessons-row">
    <div className='flex gap-4 items-center'>
      <div className='text-3xl uppercase font-semibold'>{index + 1} <span className='font-normal text-gray-500'>| </span></div>
      <div>
           <div className='text-left w-85 truncate'>{item.title}</div>
      <div className="text-xs text-left w-85  font-semibold opaciaty-60 truncate">{item.description}</div>
      </div>
   
    </div>
  
  </li>
    </a>
     
  
  )
})}

  
</ul>
        
          </div>

          {/* Right part - centered content */}
          <div className="w-1/2 flex flex-col items-right gap-3 text-right">
            <h2 className="text-2xl font-bold mb-3 w-full">Predavač</h2>
            <TeacherInfoCard item={courseData} />
     
          </div>
        </div>
      </div>
      )}







{error1 && (
  <ErrorModal></ErrorModal>
)}


    </div>
  )
}

export default Course
