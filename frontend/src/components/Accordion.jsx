import { CircleCheck, CircleDashed, CircleX, Clock } from 'lucide-react'
import React, { useState } from 'react'

const Accordion = ({ title, icon, data }) => {
      const id = "1"

  return (
    <div className='[width:calc(100%-20px)] bg-white shadow-xs'>
     <div  className=" bg-white collapse  bg-base-100 border border-base-300 w-full">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold flex items-center gap-2">
          {/* Render icon (if provided) and the title */}
          {icon}
          <span>{title}</span>
        </div>
        <div style={{borderBottom: "1px solid #e3e3e3"}}></div>
        <div className="w-full bg-white p-3" style={{borderBottom: "1px solid #e3e3e3"}}>

        {data.map((item, index)=>{
          return (
            <a  href={`/assignment/${item._id}/view`}>

            <div key={index} className={`flex w-full justify-between  mt-0  items-center ${data.length > 1 ? "border-b border-solid border-[#e3e3e3]" : ""}`}>
            <div className="flex gap-3 py-2  ">
                  {item.status === 'assigned'? <CircleDashed className='text-gray-600'></CircleDashed> : item.status === 'accepted' ?<CircleCheck className='text-green-600'></CircleCheck> : item.status === 'revise' ? <CircleX className='text-red-600'></CircleX> : item.status === 'awaiting' ? <Clock className='text-orange-400'></Clock>: ''}

            <span>{item.title}</span>
            </div>
<span className={`badge ${item.status === 'assigned'? "badge-info" : item.status === 'accepted' ? 'badge-success' : item.status === 'revise' ? 'badge-error' : item.status === 'awaiting' ? 'badge-warning': ''}`}>

  {item.status === 'assigned'? "Zadato" : item.status === 'accepted' ? 'Prihvaćeno' : item.status === 'revise' ? 'Pokušaj ponovo' : item.status === 'awaiting' ? 'Čeka na pregled': ''}


</span>


        </div>
        </a>
          )
        })}
        </div>
      </div>

 








    </div>
  )
}

export default Accordion