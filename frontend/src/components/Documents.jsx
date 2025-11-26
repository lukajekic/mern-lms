import { ArrowDownToLine, Eye, EyeClosed } from 'lucide-react'
import React from 'react'
import demopdf from "../assets/sample.pdf";

const Documents = ({data}) => {
  return (
    <div>

        <ul className="list bg-base-100 bg-white rounded-box shadow-md">
  
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Svi materijali za citanje uz ovu lekciju su ovde.</li>
  
{data.map((item, index) => {
  return (
      <li className="list-row bg-white">
    <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
    <div></div>
    <div className="list-col-grow">
      <div className='text-left'>{item.title}</div>
      <div className="text-xs uppercase font-semibold text-left opacity-60">{item.description}</div>
    </div>
    
      <a  className='btn btn-square btn-ghost'  href={`${import.meta.env.VITE_BACKEND}/api/upload/${item.filename}`}>
                <ArrowDownToLine ></ArrowDownToLine>

      </a>

      <a target='blank'  className='btn btn-square btn-ghost'  href={`${import.meta.env.VITE_BACKEND}/api/upload/${item.filename}?view=true`}>
                <Eye ></Eye>

      </a>
    
  </li>
  )
})}
  

  

</ul>


    </div>
  )
}

export default Documents