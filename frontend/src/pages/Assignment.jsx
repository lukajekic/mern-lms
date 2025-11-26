import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ModuleCard from '../components/ModuleCard'
import Loader from '../components/Loader'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { CodeXml } from 'lucide-react'
import CodeEditor from '../components/CodeEditor'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
const Assignment = () => {
    const navigate = useNavigate()
    const studentid = "123456"
    const {id} = useParams()
    console.log(id)
    const [assigmentData, setAssigmentData] = useState({})
    const [language, setLanguage] = useState("")
    const [returnedfilelist, setreturnedfilelist] = useState([])
const extensionmap = {
    javascript: ".js",
    html: ".html",
    css: ".css",
    python: ".py"
}

useEffect(()=>{
    const checkAwaitingProcess = async () =>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/response?taskid=${id}&studentid=${studentid}`)
        if (response.status === 200) {
            if (response.data.length > 0) {
if (response.data[0].status === 'awaiting' || response.data[0].status === 'accepted') {
    navigate(`/assignment/${id}/view`)
}
            }
        } else {
    navigate(`/assignment/${id}/view`)
        }
    }

    checkAwaitingProcess()
}, [])

 const sendResponseObject = async (solutions) =>{
      const responseobj = {
        "studentid": studentid,
        "taskid": id,
        "status": "awaiting",
        "points": 0,
        "solutions": solutions
    }
      console.log("this will be sent", responseobj)

      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/response`, responseobj)

      if (response.status === 201) {
        navigate(`/assignment/${id}/view`)
      } else {
        toast.error("Desila se greška, zadatak nije poslat!")
      }
    }

    
 useEffect(() => {
        const getAssignmentDetails = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/tasks/${id}`)
            const responsedata = response.data
            setAssigmentData(responsedata)
            setLanguage(responsedata.language)
            console.log(responsedata.language)
        }

        getAssignmentDetails()
    }, [])




const handleSubmit = async () =>{
    const file = new File([code], `solution${extensionmap[language]}`, {type: 'text/plain'})
const formdata = new FormData()
formdata.append('files', file)
const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/upload`, formdata)
console.log(response.data)    
setreturnedfilelist(response.data)
sendResponseObject(response.data)
}
const [code, setCode] = useState("//hello there")
        const [loading, setLoading] = useState(true)

    setTimeout(() => {
        setLoading(false)
    }, 1000);
  return (
    <div>

<Header></Header>

{loading ? (<Loader/>) : (


    
    <div className="flex flex-col items-start">

    <h1 className="text-4xl font-bold mt-5">{assigmentData.title}</h1>
<p className="text-lg mt-5">{assigmentData.description}</p>



<div className="mockup-window bg-base-100 border border-base-300 w-full mt-3 ">
  {language && (
                <img className='w-8 h-8 z-30 top-2 right-2 absolute' src={`/icons/${language}.png`} alt="" />

  )}

    <div className="h-[500px]">
           <CodeEditor language={language} value={code} onChange={setCode}></CodeEditor>

    </div>
</div>

<div className="w-full flex justify-end mt-3">

  {language && (
    <button className='btn btn-primary' onClick={()=>{[console.log(code), handleSubmit()]}}>Pošalji kod</button>

  )}

</div>


</div>
)}




{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="sendcode" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-left">Hello!</h3>
    <div className="icon-wrapper modal-icon-wrapper">
        <CodeXml className='icon'></CodeXml>
    </div>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
                <button className="btn btn-primary">Submit</button>

      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default Assignment