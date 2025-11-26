import React from 'react'
import '../css/AuthMenu.css';
import { LogOut, Rows3, Settings, User } from 'lucide-react';
import { useParams } from 'react-router';

const SubHeader = ({active}) => {
  const {id} = useParams()
  const showLabel = (id) => {
const label = document.getElementById(id)
label.classList.add('display-block')
  }

 const hideLabel = (id) => {
const label = document.getElementById(id)
label.classList.remove('display-block')
  }

  return (
    <div>


        
        <div style={{backgroundColor: "#333"}} className="navbar mt-3 bg-base-100 shadow-sm rounded-[15px]">

<div className="flex flex-row gap-2">
  {active && active === "courses" ? (
    <>
          <div className="h-full p-2 rounded-[8px] hover:bg-[#666] text-white transition-all duration-200 bg-[#4D4D4D]">KURS</div>
              <a href={`/tasks/${id}`}>
    <div className="h-full p-2 rounded-[8px] hover:bg-[#666] text-white transition-all duration-200">ZADACI</div>
    </a>

</>
  ) : (
    <>
                  <a href={`/course/${id}`}>

      <div className="h-full p-2 rounded-[8px] hover:bg-[#666] text-white transition-all duration-200 ">KURS</div>
      </a>
    <div className="h-full p-2 rounded-[8px] hover:bg-[#666] text-white transition-all duration-200 bg-[#4D4D4D]">ZADACI</div>
</>
  )}

</div>
</div>




    </div>
  )
}

export default SubHeader