import { CircleOff } from 'lucide-react'
import React from 'react'
const MissingCard = ({icon, title, description}) => {

  return (
    <div className='w-full'>
        <div className="w-full bg-gray-200 rounded-2xl p-3 flex flex-col gap-2  mt-3 items-center">
            <div className='p-4 rounded-[999px] bg-gray-600 mt-2'>
{icon}

            </div>
            <h1 className="text-2xl truncate font-bold mt-3">{title}</h1>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default MissingCard