import React from 'react'

const ModuleCard = ({item}) => {
  return (
    <div>


<div className="card card-border  bg-white bg-base-100 w-96 ">
  <div className="card-body p-0">
    <h2 className="card-title">{item.title}</h2>
    <p className='w-full text-left wrap-break-word'>{item.description}</p>
    <div className="card-actions justify-end">
        <a href={`http://localhost:5173/course/${item._id}`}>
        <button className="btn btn-primary mt-2">Otvori kurs</button></a>
      
    </div>
  </div>
</div>


    </div>
  )
}

export default ModuleCard