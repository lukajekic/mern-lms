import React, { useState } from 'react'
import Header from '../components/Header'
import ModuleCard from '../components/ModuleCard'
import Loader from '../components/Loader'
import dotenv from 'dotenv'
import { useEffect } from 'react'
import axios from 'axios'
import SubHeader from '../components/SubHeader'
import ErrorModal from '../components/ErrorModal'
import MissingCard from '../components/MissingCard'
import { CircleOff } from 'lucide-react'

const HomePage = () => {
    const studentid = "123456"
    const [error1, setError1] = useState(false)
    useEffect(()=>{
           async function getCourses() {
            try {
                console.log(import.meta.env.VITE_BACKEND)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/courses?studentid=${studentid}`)
            console.log(response)
            if (response.status === 200) {
                setData(response.data)
            } else {
                setError1(true)
                setLoading(false)
            }
            setLoading(false)
            } catch (error) {
                                setError1(true)
                                setLoading(false)

            }
             
           }
setTimeout(() => {
               getCourses()

}, 1000);

    }, [])
        const [loading, setLoading] = useState(true)

      const [data, setData] = useState([])
 
  return (
    <div>

<Header></Header>
{loading ? (<Loader/>) : (
    <div className="flex flex-col items-start">
    <h1 className="text-4xl font-bold mt-5">Kursevi</h1>
    {data.length === 0 && (
        
<MissingCard className="w-full" title={"Nemate nijedan kurs."} description={"Unesite kod kursa kako biste otkljucali lekcije."} icon={<CircleOff className='size-8 text-white'/>}></MissingCard>

    )}

    <div className='mt-5 w-full gap-3 max-w-full flex flex-row flex-wrap'>
        {data.map((item)=>{
                        return <ModuleCard key={item._id} item={item}/>

        })}
    </div>



</div>
)}

{error1 && (
  <ErrorModal></ErrorModal>
)}
    </div>
  )
}

export default HomePage