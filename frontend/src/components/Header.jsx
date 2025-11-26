import React, { useEffect, useState } from 'react'
import '../css/AuthMenu.css';
import { ArrowRight, LogOut, PlusSquare, Rows3, Settings, User } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Header = () => {

const [image, setImage] = useState(null)
  const [user, setUser] = useState({})
   

  const [profile, setProfile] = useState({})

const rolesMap = {
  student: "Učenik",
  teacher: "Predavač"
}

  const onChangeEditProfile = (e)=>{
    const field = e.target.name
    const value = e.target.value

    setProfile((prev)=>({
      ...prev,
      [field]: value
    }))
  }
const navigate = useNavigate()
   const handleLogout = async()=>{
    await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/logout`)
    navigate("/login")
  }
  useEffect(()=>{

    const getUser = async (req, res) =>{
      const repsonse = await axios.get(`${import.meta.env.VITE_BACKEND}/api/user/me`)
      console.log("user", repsonse)
      setUser(repsonse.data)

      const {name, email} = repsonse.data
      setProfile({
        name: name,
        email: email,
        password: ""
      })

      if (repsonse.data.profileimage && repsonse.data.profileimage.length > 0) {
        setImage(`${import.meta.env.VITE_BACKEND}/api/upload/${repsonse.data.profileimage}`)
      } else {

      
      setImage(`${import.meta.env.VITE_BACKEND}/api/upload/missing.png`)
      }
    }

    getUser()
  }, [])

const handleProfileUpdate = async()=>{
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND}/api/user/update`, profile)
    console.log(response)
  if (response.status === 200) {
    toast.success("Uspešno ažuriranje profila.")
    window.location.reload(true)
  }
  } catch (error) {
    if (error.response.status === 500) {
      toast.error("Greška.")
    }
  }
}
 
  const handleJoin = async () =>{
    const value = document.getElementById('coursecode').value
    console.log(value)
    if (value && value.length > 0) {
      console.log(`${import.meta.env.VITE_BACKEND}/api/join/${value}/`)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/join/${value}/`)
      console.log(response)
      if (response.status === 200) {
        window.location.reload(true)
      } else if (response.status === 404) {
        toast.error("Wrong code!")
      } else if (response.status === 500) {
        toast.error(response.data.error)
      }
    }
  }
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


        
        <div className="navbar bg-base-100 bg-white shadow-sm rounded-[15px]">
  <div className="flex-none">
{/*     <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
    </button> */}
  </div>
  <div className="flex-1">
    <div className="tooltip tooltip-info" data-tip="Povratak na kurseve">
            <a className="btn btn-ghost text-xl" href='/'>LMS</a>

    </div>
  </div>
<div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS Navbar component"
        src={image}
      />
    </div>
  </div>{" "}
  <ul
    tabIndex={-1}
    className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 auth-menu"
  >



<div className='ml-1'>
  <div className='font-bold text-lg flex flex-row gap-2 items-center'>
    LMS
    <div className='relative'>
      <svg
        style={{ height: '35px', width: '35px' }}
        viewBox='0 0 160 160'
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        fill='black'
      >
        <path
          d='M 0 80 C 0 8.8, 8.8 0, 80 0 S 160 8.8, 160 80, 151.2 160, 80 160, 0 151.2, 0 80'
          transform='rotate(0,80,80) translate(0,0)'
        ></path>
      </svg>
      <div className='absolute inset-0 flex items-center justify-center text-white text-lg font-semibold'>
        ID
      </div>
    </div>
  </div>
</div>

<div className='mt-5 w-full flex flex-col items-center gap-2'>
  <img className='w-20 rounded-[50px] shadow-lg'
        alt="Tailwind CSS Navbar component"
      src={image}
      ></img>


      <p className="text-lg">{user.name}</p>

{user?.roles?.map((item, index)=>{
  return (
    <div key={index} className="badge badge-soft badge-info">{rolesMap[item]}</div>

  )
})}


{user?.roles?.includes('teacher') && (
      <button className='btn bg-black text-white'>LMS za profesore</button>

)}
</div>






 
<div className='mt-3 flex'>
  

{/*   AUTH BUTTONS*/}
 <button onClick={()=>{document.getElementById('joinmodal').showModal()}} onMouseEnter={()=>{showLabel("auth-btn-label-settings")}} onMouseLeave={()=>{hideLabel("auth-btn-label-settings")}} className="auth-btn"><span><PlusSquare></PlusSquare></span><span id='auth-btn-label-settings' className="label">Učlani se</span></button>

 <button onClick={()=>{document.getElementById('editprofile').showModal()}} onMouseEnter={()=>{showLabel("auth-btn-label-settings")}} onMouseLeave={()=>{hideLabel("auth-btn-label-settings")}} className="auth-btn"><span><User></User></span><span id='auth-btn-label-settings' className="label">LMS Profil</span></button>
  <button onMouseEnter={()=>{showLabel("auth-btn-label-logout")}} onMouseLeave={()=>{hideLabel("auth-btn-label-logout")}} className="auth-btn" onClick={()=>{handleLogout()}}><span><LogOut></LogOut></span><span id='auth-btn-label-logout' className="label">Odjava</span></button>

 
 </div>
    
  </ul>
</div>

</div>








{/* MODAL */}


{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="joinmodal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Pridruži se kursu</h3>
    <p className="py-4">Unesi kod kursa ispod.</p>
<div className="flex gap-2 justify-center items-end">
  <input type="text" id='coursecode' placeholder="Unesi kod..." className="input mt-2" />
<button className="btn btn-primary" onClick={()=>{handleJoin()}}><ArrowRight></ArrowRight></button>
</div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Zatvori</button>
      </form>
    </div>
  </div>
</dialog>


    {/* END MODAL */}
    


{/* MODAL 2 */}


{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="editprofile" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-left">Izmeni profil</h3>
<div className="flex gap-5 mt-5 justify-left items-center w-full">
  
<img className='w-20 rounded-[50px] shadow-lg'
        alt="Tailwind CSS Navbar component"
      src={image}
      ></img>


<div className='flex flex-col items-start gap-1 w-[80%]'>
    <span className="label">Ime i prezime:</span>

  <input type='text' name='name' className='input mb-3 text-lg' value={profile.name} onChange={onChangeEditProfile}/>


      <span className="label">Adresa el. pošte:</span>

    <input type='email' name='email' className='input input-sm' value={profile.email} onChange={onChangeEditProfile}/>


        <span className="label">Nova lozinka (promena lozinke):</span>

    <input type='password' name='password' className='input input-sm' onChange={onChangeEditProfile} />


</div>
      

</div>
    <div className="modal-action">
        {/* if there is a button in form, it will close the modal */}
      <div className="flex gap-2">
          <button type='button' className="btn" onClick={()=>{document.getElementById('editprofile').close()}}>Zatvori</button>
                <button className="btn btn-primary" type='submit' onClick={()=>{handleProfileUpdate()}}>Sacuvaj</button>

      </div>
    </div>
  </div>
</dialog>


    {/* END MODAL 2 */}

    </div>
  )
}

export default Header