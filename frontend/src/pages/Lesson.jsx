import { useState } from 'react'
import Header from '../components/Header'
import TeacherInfoCard from '../components/TeacherInfoCard'
import Loader from '../components/Loader'
import { UNSAFE_getTurboStreamSingleFetchDataStrategy, useParams } from 'react-router'
import Accordion from '../components/Accordion'
import { Boxes, ChevronsUp, House, Sunset } from 'lucide-react'
import Documents from '../components/Documents'
import { useEffect } from 'react'
import axios from 'axios'

const Lesson = () => {

  const studentid = "123456"
  const [textbooks, settextbooks] = useState([])
  const [groupworktasks, setgroupworktasks] = useState([])
    const [homeworktasks, sethomeworktasks] = useState([])
    const [roles, setRoles] = useState([])


      const [additionaltasks, setadditionaltasks] = useState([])

const [lessonData, setLessonData] = useState({})
const {id} = useParams()
useEffect(()=>{
const getlsessondata = async () =>{
const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/lessons/${id}`)
if (response.status === 200) {
  setLessonData(response.data)
}
}

const getTasks = async () =>{
try {
  const tasks = await axios.get(`${import.meta.env.VITE_BACKEND}/api/tasks?lessonref=${id}`)
const data = tasks.data
const studentresponses = await axios.get(`${import.meta.env.VITE_BACKEND}/api/response?studentid=${studentid}`)
console.log(studentresponses.data)
const combined = data.map(item => {
  let correspondingresponse = studentresponses.data.find(r => r.task_id == item._id)

  return {
    ...item,
    status: correspondingresponse ? correspondingresponse.status : "assigned"
  }
})

console.log(combined)
const groupworktasks = combined.filter(item => item.type === "groupwork")
const homeworktasks = combined.filter(item => item.type === "homework")

const additionaltasks = combined.filter(item => item.type === "additional")
if (studentresponses.status === 200) {
  const data = studentresponses.data
  let mappeddata = data.map(item => {
    return {
      task_id: item.task_id,
      status: item.status
    }
  })

}
setgroupworktasks(groupworktasks)
sethomeworktasks(homeworktasks)
setadditionaltasks(additionaltasks)




} catch (error) {
  console.error(error)
}
}


const getDocuments = async()=>{
  const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/textbooks?lessonref=${id}`)
  const data = response.data

  settextbooks(data)
}

const getRoles = async()=>{
try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/user/roles`)
  setRoles(response.data)
} catch (error) {
  console.log(error)
}
}


getlsessondata()
getTasks()
getDocuments()
getRoles()
}, [])
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000);

    const gropuicon = <Boxes></Boxes>
  return (
    <div>
      <Header />


      {loading ? (
<Loader/>

      ) : (
      <div className="flex flex-col items-start px-8">
        <h1 className="text-4xl font-bold mt-5 w-full truncate text-left">{lessonData.title}</h1>
                            <p className="text-lg mt-5 w-full truncate text-left">{lessonData.description}</p>


        {/* Two columns side by side */}
        <div className="flex flex-row w-full mt-8 gap-3">
          {/* Left part */}
          <div className="w-3/5 flex flex-col items-start gap-3">
            <h2 className="text-2xl font-bold mb-3">Zadaci</h2>
            <Accordion title={"Grupni rad"} data={groupworktasks} icon={gropuicon} />
            <Accordion title={"Domaci zadaci"} data={homeworktasks} icon={<House></House>}></Accordion>
            <Accordion title={"Zadaci za vise"} data={additionaltasks} icon={<ChevronsUp></ChevronsUp>}></Accordion>
  
          </div>

          {/* Right part - centered content */}
          <div className="w-2/5 flex flex-col items-right gap-3 text-right">
            <h2 className="text-2xl font-bold mb-3 w-full">Dokumenti</h2>
            <Documents data={textbooks}></Documents>
     
          </div>




       
        </div>
      </div>
      )}

    </div>
  )
}

export default Lesson
