import React from 'react'

const CourseBlocks = ({item}) => {
  return (
    <div className="p-0">
      <a href={`http://localhost:5173/lesson/${item._id}`}>
         <div className="card card-border bg-white bg-base-100 w-96 overflow-hidden">
        <div className="card-body gap-2 p-3 flex flex-row justify-between items-center">
          
          {/* LEFT SIDE */}
          <h2 className="text-left card-title max-w-[50%] break-all">
            {item.title}
          </h2>

          {/* RIGHT SIDE */}
          <div className="w-[45%] flex flex-col items-end mt-4">
            <progress className="progress progress-success w-full" value="13" max="14"></progress>
            <p className="text-sm mt-2">13/14</p>
          </div>

        </div>
      </div></a>
   
    </div>
  )
}

export default CourseBlocks
