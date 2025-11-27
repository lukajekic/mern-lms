import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { ArrowUpFromLine, Check, CircleAlert, CodeXml, Send, SendHorizonal } from 'lucide-react'
import '../css/AssignmentNC.css';
import { useParams } from 'react-router'
import axios from 'axios'
import moment from 'moment-timezone'
import toast from 'react-hot-toast'
const AssignmentNC = () => {
    const [code, setcode] = useState("//Start coding here\n")
    const [language, setLanguage] = useState("python")
    const [output, setoutput] = useState("")
    const [assignemtnData, setAssigmentData] = useState({})
    const [responseData, setResponseData] = useState({})
    const { id } = useParams()
    const studentid = "123456"

    const getLanguage = () => {
        if (language === "python") return python()
        if (language === "javascript") return javascript()
    }

const deleteResponse = async()=>{
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/api/response/${responseData._id}`)
  console.log("deletion response", response)
  if (response.status === 200) {
    window.location.reload(true)
  } else {
    toast.error("Error on deletion")
  }
}


    const createResponsebject = () =>{
      let obj = {
        "studentid": studentid,
        "taskid": id,
        "status": "awaiting",
        "points": 0,
        "solutions": []
    }

    

    return obj
    }



    const sendResponseObject = async () =>{
      const responseobj = createResponsebject()
      console.log("this will be sent", responseobj)

      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/response`, responseobj)

      if (response.status === 201) {
        toast.success("Zadatak je poslat!")
        window.location.reload(true)
      } else {
        toast.error("Desila se greška, zadatak nije poslat!")
        document.getElementById('sendcode').close()
      }
    }

    useEffect(() => {
        const getAssignmentDetails = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/tasks/${id}`)
            const responsedata = response.data
            setAssigmentData(responsedata)
        }

        getAssignmentDetails()
    }, [])

    useEffect(() => {
        const getResponse = async () => {
            if (!assignemtnData._id) return

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND}/api/response?studentid=${studentid}&taskid=${assignemtnData._id}`
            )

            const data = response.data
            console.log("student response", data)

            if (data.length > 0) {
                setResponseData(data[0])
            } else {
                setResponseData({ status: "assigned" })
            }
        }

        getResponse()
    }, [assignemtnData])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            <Header />

            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col items-start">

                    <h1 className="text-4xl font-bold mt-5">{assignemtnData.title}</h1>
                    <p className="text-lg mt-5">{assignemtnData.description}</p>

                    {/* STATUS CARDS */}
                    {responseData.status === "assigned" ? (
                        <div id="submittedresult" style={{ backgroundColor: "#dfdfdf" }} className="mt-5 w-full p-4 rounded-md">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col w-[65%] items-start">
                                    <h1 className="text-3xl font-bold text-gray-500">{assignemtnData.title}</h1>
                                </div>
                                <div className="w-[35%] font-bold text-gray-500 text-3xl text-right">
                                    <p className="text-3xl text-gray-500">{`max. ${assignemtnData.maxpoints}`}</p>
                                </div>
                            </div>
                        </div>
                    ) : responseData.status === "accepted" ? (
                        <div id="submittedresult" className={`mt-5   w-full p-4 rounded-md ${responseData.points === assignemtnData.maxpoints ? "bg-green-600" : "bg-[#73de00]"}`}>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col w-[62%] items-start">
                                    <h1 className="text-3xl font-bold text-white">Prihvaćeno</h1>
                                    <p className="text-lg text-white">{moment.utc(responseData.updatedAt).tz("Europe/Belgrade").format("DD.MM.YYYY. HH:mm")}</p>
                                </div>
                                <div className="w-[38%] font-bold text-white text-4xl text-right">{`${responseData.points}/${assignemtnData.maxpoints}`}</div>
                            </div>
                        </div>
                    ) : responseData.status === "revise" ? (
                        <div id="submittedresult" className="mt-5 bg-red-700 w-full p-4 rounded-md">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col w-[38%] items-start">
                                    <h1 className="text-3xl font-bold text-white">Pokušaj ponovo</h1>
                                </div>
                                <div className="w-[62%] font-bold text-white text-4xl text-right">
                                    <p className="text-lg text-white">{moment.utc(responseData.updatedAt).tz("Europe/Belgrade").format("DD.MM.YYYY. HH:mm")}</p>
                                </div>
                            </div>
                        </div>
                    ) : responseData.status === "awaiting" ? (
                      <div className='w-full flex flex-col items-end'>
                          <div id="submittedresult" className="mt-5 bg-yellow-700 w-full p-4 rounded-md">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col w-[38%] items-start">
                                    <h1 className="text-3xl font-bold text-white">Čeka na pregled</h1>
                                </div>
                                <div className="w-[62%] font-bold text-white text-4xl text-right">
                                    <p className="text-lg text-white">{moment.utc(responseData.updatedAt).tz("Europe/Belgrade").format("DD.MM.YYYY. HH:mm")}</p>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-error mt-3" onClick={()=>{document.getElementById('cancel').showModal()}}>Poništi slanje</button>
                      </div>

                    ) : null}

                    {/* ACTION CARDS */}
           {(responseData.status === "assigned" || responseData.status === "revise") && (
                     <div className="flex flex-row gap-7 items-center w-full justify-center mt-8">

                        <a href={`/assignment/${id}/code`}>
                            <div className="card card-border bg-white w-96 submitcard">
                                <div className="card-body p-0">
                                    <div className="icon-wrapper modal-icon-wrapper" style={{ marginTop: "0px" }}>
                                        <CodeXml className="icon" />
                                    </div>
                                    <h2 className="w-full text-center wrap-normal whitespace-normal font-semibold text-2xl mt-2">
                                        Napiši kod
                                    </h2>
                                </div>
                            </div>
                        </a>

                        <a href={`/assignment/${id}/upload`}>
                            <div className="card card-border bg-white w-96 submitcard">
                                <div className="card-body p-0">
                                    <div className="icon-wrapper modal-icon-wrapper" style={{ marginTop: "0px" }}>
                                        <ArrowUpFromLine className="icon" />
                                    </div>
                                    <h2 className="w-full text-center wrap-normal whitespace-normal font-semibold text-2xl mt-2">
                                        Otpremi fajl
                                    </h2>
                                </div>
                            </div>
                        </a>

                        <div className="card card-border bg-white w-96 submitcard" onClick={()=>{document.getElementById('sendcode').showModal()}}>
                            <div className="card-body p-0">
                                <div className="icon-wrapper modal-icon-wrapper" style={{ marginTop: "0px" }}>
                                    <Check className="icon" />
                                </div>
                                <h2 className="w-full text-center wrap-normal whitespace-normal font-semibold text-2xl mt-2">
                                    Označi kao završeno
                                </h2>
                            </div>
                        </div>

                    </div>
           )}

                </div>
            )}

            {/* MODAL */}
            <dialog id="sendcode" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-left">Označi kao gotovo</h3>
                    <div className="icon-wrapper modal-icon-wrapper">
                        <SendHorizonal className="icon" />
                    </div>
                    <p className="py-4">Klikom na dugme „Pošalji“ označićeš profesoru da si uradio zadatak, ali nećeš poslati svoje rešenje. <br />
                    <br />
                    Da li želiš da nastaviš?
                    </p>
                    <div className="modal-action">
                        <form  method="dialog">
                          <div className="flex flex-row gap-2">
                                 <button className="btn">Close</button>
                            <button className="btn btn-primary" onClick={()=>{sendResponseObject()}}>Submit</button>
                          </div>
                       
                        </form>
                    </div>
                </div>
            </dialog>




            <dialog id="cancel" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-left">Poništi slanje</h3>
                    <div className="icon-error-wrapper modal-icon-wrapper">
                        <CircleAlert className="icon" />
                    </div>
                    <p className="py-4">Klikom na dugme „Poništi“ opozvaćeš slanje svog zadataka. <br />
                    <br />
                    Da li želiš da nastaviš?
                    </p>
                    <div className="modal-action">
                        <form  method="dialog">
                          <div className="flex flex-row gap-2">
                                 <button className="btn">Odustani</button>
                            <button className="btn btn-error" onClick={()=>{deleteResponse()}}>Poništi</button>
                          </div>
                       
                        </form>
                    </div>
                </div>
            </dialog>



        </div>
    )
}

export default AssignmentNC
