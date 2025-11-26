import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import CourseBlocks from '../components/CourseBlock'
import TeacherInfoCard from '../components/TeacherInfoCard'
import Loader from '../components/Loader'
import { useParams } from 'react-router'
import axios from 'axios'
import SubHeader from '../components/SubHeader'
import TasksTable from '../components/TasksTable'

const Tasks = () => {
  const { id } = useParams()
const [tasks, setTasks] = useState([]) //final tasks with statuses
  const [loading, setLoading] = useState(true)
  const [courseData, setCourseData] = useState({})

  const [showAccepted, setShowAccepted] = useState(false)
const [tabledata, settabledata] = useState([])
const studentid = '123456'
  useEffect(()=>{
   
const getTasks = async()=>{
    const lessons = await axios.get(`${import.meta.env.VITE_BACKEND}/api/lessons?courseref=${id}`)
const lessonids = lessons.data.map(item => item._id)
console.log("ids", lessonids) //OK


const tasks = await axios.get(`${import.meta.env.VITE_BACKEND}/api/tasks`)
const filteredtasks = tasks.data.filter(item => lessonids.includes(item.lessonref._id))
console.log("TASKS", filteredtasks) //ok

const studentresponses = await axios.get(`${import.meta.env.VITE_BACKEND}/api/response?studentid=${studentid}`)
console.log(`responses for ${studentid}`, studentresponses.data) //ok

const mergedtasks = filteredtasks.map(item => {
  const correspondingrepsonse = studentresponses.data.find(r => r.task_id === item._id.toString())
  const status = correspondingrepsonse?.status
  const statusbeautiful = status === "assigned" ? "Zadato" : status === "awaiting" ? "Čeka na pregled" : status === "revise" ? "Pokušaj ponovo" : status === "accepted" ? "Prihvaćeno" : "Zadato"
  return {
    ...item,
    status: statusbeautiful
  }
})

setTasks(mergedtasks)
console.log(mergedtasks)
}

getTasks()
  }, [])
console.log(tabledata)
  useEffect(() => {
    console.log('showAccepted:', showAccepted)
  }, [showAccepted])

  useEffect(() => {
    async function getCourseData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/courses/${id}`)
        if (response.status === 200) {
          console.log(response.data)
          setCourseData(response.data)
          setLoading(false)
        }
      } catch (err) {
        console.error('Error fetching course:', err)
        setLoading(false)
      }
    }



    setTimeout(() => {
      getCourseData()
    }, 700)
  }, [id])

  return (
    <div>
      <Header />
      <SubHeader active="tasks" />

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-start px-8">
          <h1 className="text-4xl font-bold mt-5">{courseData.title}</h1>

          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={showAccepted}
              onChange={(e) => setShowAccepted(e.target.checked)}
            />
            <span>Prikaži prihvaćene odgovore</span>
          </label>

          {showAccepted ? (
            <TasksTable data={tasks}></TasksTable>
          ) : (
            <TasksTable data={tasks.filter(item => item.status != "Prihvaćeno")}></TasksTable>
          )}
        </div>
      )}
    </div>
  )
}

export default Tasks
