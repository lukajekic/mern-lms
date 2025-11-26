import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { ArrowUpFromLine, Axis3DIcon, Check, CodeXml, FileExclamationPoint, SendHorizonal, Trash } from 'lucide-react'
import '../css/AssignmentNC.css';
import UploadNCList from '../components/UploadNCList'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { StandardizeText } from '../utlis/StandardizeText'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import ErrorModal from '../components/ErrorModal'
const UploadNC = () => {
  const studentid = "123456"
  const navigate = useNavigate()
const {id} = useParams()
let totalMB = useState(0)

const [error1, setError1] = useState(false)
const formatMB = (bytes) =>{
const MB = bytes / (1024*1024)
const MBround = MB.toFixed(2)
totalMB = totalMB + MBround








console.log("filesize:", MB)
return MBround
}




 const createResponsebject = (solutions) =>{
      let obj = {
        "studentid": studentid,
        "taskid": id,
        "status": "awaiting",
        "points": 0,
        "solutions": solutions,
    }

    

    return obj
    }



    const sendResponseObject = async (solutions) =>{
      const responseobj = createResponsebject(solutions)
      console.log("this will be sent", responseobj)

      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/response`, responseobj)

      if (response.status === 201) {
        toast.success("Zadatak je poslat!")
        navigate(`/assignment/${id}/view`)
      } else {
        toast.error("Desila se greška, zadatak nije poslat!")
      }
    }


  const [files, setFiles] = useState([])
    const [code, setcode] = useState("//Start coding here\n")
    const [language, setLanguage] = useState("python")
    const [output, setoutput] = useState("")
    const [uploadloading, setUploadLoading] = useState(false)
    const getLanguage = ()=>{
        if (language === "python") {
            return python()
        } else if (language === "javascript") {
            return javascript()
        }
    }
  
const removeFiles = () =>{
  setFiles([])
}

const showUploadLoader = () =>{
  setUploadLoading(true)
}
        const [loading, setLoading] = useState(true)


    setTimeout(() => {
        setLoading(false)
    }, 1000);


    const HandleChoose = (e) =>{
const filelist = e.target.files
console.log("fajlovi:", filelist)
const filename = Array.from(filelist)[0].name
const filesize = Array.from(filelist)[0].size
console.log(filename)
console.log(StandardizeText(filename))

const duplicate = Array.from(files).find(item=> item.name === filename)

if (duplicate){
toast('Već ste otpremili ovaj fajl!', {
  icon: 'ℹ️',
});
} else {
setFiles(prev => [...(prev || []), ...e.target.files])

}
console.log(e)
e.target.value = null

    }

  
const handleSubmit = async () =>{
setTimeout(async() => {
  const formdata = new FormData()
  files.forEach((file)=>{
    formdata.append('files', file)
  })
  try {
    console.log(formdata)
    const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/upload`, formdata,
      {headers: {
        "Content-Type": "multipart/formdata"
      }}
    )

    if (response.status === 200) {
      const uploaded = response.data
      sendResponseObject(uploaded)

    }
  } catch (error) {
    toast.error("ERROR ON AXIOS POST, UPLOADING FILES...")
    setError1(true)
    console.error(error)
  }
}, 1000);
  
}


  return (
    <div>
<Header></Header>

{loading ? (<Loader/>) : (
    <div className="flex flex-col items-start">
    <h1 className="text-4xl font-bold mt-5">Kursevi</h1>
<p className="text-lg mt-5">Opis kursa</p>





{!uploadloading ? (
  <div className='flex flex-row gap-7 items-start w-full justify-center mt-8'>



   {!files || files.length < 5 ? (
    <label 
      htmlFor="file-upload"
      style={{ border: "2px dashed #cecece" }}
      className="card border-dashed bg-white w-150 submitcard uploadnc-card cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="card-body p-0">
        <div className="icon-wrapper modal-icon-wrapper" style={{ marginTop: "0px" }}>
          <ArrowUpFromLine className="icon mx-auto" />
        </div>
        <h2 className="w-full text-center whitespace-normal font-semibold text-2xl mt-2">
          Otpremi fajl
        </h2>
        <p>Maksimalna ukupna veličina: 5MB</p>
        <div className="card-actions justify-end">
          <input
            id="file-upload"
            type="file"
            hidden
            className="file-input"
            
            onChange={HandleChoose}
          />
        </div>
      </div>
      <p><span>Ukupna veličina fajlova: </span><span>{totalMB}</span></p>
    </label>

   ) : (

    <label 
      htmlFor="file-upload"
      style={{ border: "2px dashed #cecece" }}
      className="card border-dashed bg-white w-150  uploadnc-card cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="card-body p-0">
        <div className="icon-wrapper modal-icon-wrapper" style={{ marginTop: "0px" }}>
          <FileExclamationPoint className="icon mx-auto" />
        </div>
        <h2 className="w-full text-center whitespace-normal  text-2xl mt-2">
          Optremio si maksimalan broj fajlova (5)
        </h2>
   
      </div>
    </label>

    
   )}







      <ul className="list bg-base-100 bg-white rounded-box shadow-md w-120">
        <div className="flex flex-col gap-0">
  <div className="flex flex-row justify-between items-center">
    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Ovde se nalaze fajlovi koji će biti prosleđeni na pregled.</li>
    {files && files.length > 0 && (
   <button className='w-fit h-fit' onClick={()=>{removeFiles()}}>
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide text-red-600 flex flex-row gap-1 items-center"><span><Trash></Trash></span> Obriši sve</li>

    </button>
    )}
 
  </div>
  {files && files.length > 0 && (
  <div className="divider w-full mt-0 mb-0"></div>

  )}
</div>
  

{files && files.map((item, index)=>
  {
    return (<li key={index} className="list-row bg-white">
    <div className="text-4xl font-thin opacity-30 tabular-nums">{index +1}</div>
    <div></div>
    <div className="list-col-grow">
      <div className='text-left text-clip'>{item.name}</div>
      <div className="text-xs uppercase font-semibold text-left opacity-60">~{formatMB(item.size)}MB</div>
    </div>
   
  </li>)
   
  }
)}
  
  {files && files.length > 0 && (
    <div className="flex flex-row w-full justify-end pb-2"><button className="btn btn-primary w-fit mt-2 mr-2" onClick={()=>{[showUploadLoader(), handleSubmit()]}}>Pošalji <span><SendHorizonal className='size-5'></SendHorizonal></span></button>
</div>
  )}
  
</ul>
</div>

):(

/* SENDING FILES*/
<div className="flex flex-col gap-2 w-full items-center">
  <Loader></Loader>
  <p className="font-semibold text-lg">Slanje zadataka....</p>
</div>
)}


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

{error1 && (
  <ErrorModal></ErrorModal>
)}

    </div>





  )
}



export default UploadNC