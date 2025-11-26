import { CircleOff } from 'lucide-react'
import React from 'react'
const MissingCardSmall = ({icon, title, description}) => {

  return (
    <div className='w-full'>
        <div className="w-full bg-gray-200 rounded-2xl p-2 flex flex-row  gap-2   items-center">
            <div className='p-3 rounded-[999px] bg-gray-600'>
{icon}

            </div>
            <h1 className="text-lg truncate font-bold">{title}</h1>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default MissingCardSmall