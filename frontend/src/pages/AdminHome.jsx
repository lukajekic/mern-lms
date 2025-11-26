// AdminHome.jsx
import React, { useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'

const AdminHome = () => {
    //dev
useEffect(()=>{
    async function check() {
            await axios.post('http://localhost:5000/api/user/checkteacher')

    }

    check()
}, [])
  return (



    <div>

        <Header></Header>


            <div className='flex w-full h-screen mt-5'> 


<div className="w-[100%]">
    <div className="flex w-full justify-between pb-2">
            <p className="text-left w-full truncate font-bold text-3xl">Najnoviji odgovori</p>
<button className='btn btn-primary'>Oceni prvi</button>
    </div>


    <div className="flex gap-2 justify-left items-center w-full mt-2">
        



        <select defaultValue="Pick a color" className="select">
  <option disabled={true}>Pick a color</option>
  <option>Crimson</option>
  <option>Amber</option>
  <option>Velvet</option>
</select>




<select defaultValue="Pick a color" className="select">
  <option disabled={true}>Pick a color</option>
  <option>Crimson</option>
  <option>Amber</option>
  <option>Velvet</option>
</select>




    </div>


    <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>company</th>
        <th>location</th>
        <th>Last Login</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Littel, Schaden and Vandervort</td>
        <td>Canada</td>
        <td>12/16/2020</td>
        <td>Blue</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>company</th>
        <th>location</th>
        <th>Last Login</th>
        <th>Favorite Color</th>
      </tr>
    </tfoot>
  </table>
</div>






</div>


    </div>


    </div>

  )
}
export default AdminHome