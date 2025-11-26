import axios from 'axios'
import { Mail, Lock, User } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import authService from '../authService'

const Register = () => {
const navigate = useNavigate()
  const [formdata, setformdata] = useState({
    name: '',
    email: '',
    password: '',
    profileimage: []
    
  })

  const {name, email, password, profileimage} = formdata
const onChange = (e) =>{

  if (e.target.name === "profileimage") {
    setformdata((prevstate)=>({
      ...prevstate,
      profileimage: e.target.files[0]
    }))
  } else {  
setformdata((prevSttate) => ({
    ...prevSttate,
    [e.target.name]: e.target.value
  }))
  }
  

}


const onSubmit = async (e) =>{
e.preventDefault()

const data = new FormData()

let path = 'missing.png'
if (profileimage) {
  const formdataupload = new FormData()
  formdataupload.append('files', profileimage)
const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/upload`, formdataupload)
if (response.status === 200 && response.data.length > 0) {
  path = response.data[0]
}
}

data.append('name', name)
data.append('email', email)
data.append('password', password)
data.append('roles', 'student')
data.append('profileimage', path)

const body = {name, email, password, roles: 'student', profileimage: path}
console.log(data)
console.log(path)

const response2 = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/register`, body)
if (response2.status === 200) {
  navigate('/welcome')
} else {
  console.log(response2)
}

}

  return (
    <div className='fixed top-0 left-0 flex h-screen w-[100%] flex-row-reverse'>

<div className="h-full bg-[url('/icons/mathpattern-opacity-30.png')]  w-[50%] flex items-center justify-center">
<div className="flex flex-col gap-3">
        <h1 className='text-3xl font-bold'>Welcome to <span className='p-1 bg-yellow-500'>LMS</span></h1>
        <p>Let's get to know you. This will take a minute.</p>

    </div>
    
    </div>
<div className="h-full bg-[#f9fbfc]  w-[50%] flex items-center justify-center">
   



   <div className="flex flex-col gap-3">
     <h1 className='text-3xl font-bold w-full text-left pb-4'>Registracija</h1>


<form action="" className='flex flex-col gap-3' onSubmit={onSubmit}>
   <label className="input validator mt-2">
  <User className='text-gray-500'></User>
  <input  className='w-[250px]' type="text" value={name} onChange={onChange}  name='name' placeholder="" required />
</label>



    <label className="input validator mt-2">
  <Mail className='text-gray-500'></Mail>
  <input className='w-[250px]' type="email" name='email' onChange={onChange} value={email} placeholder="mail@site.com" required />
</label>
<div className="validator-hint hidden ">Unesi ispravnu email adresu</div>


    <label className="input validator mt-2">
  <Lock className='text-gray-500'></Lock>
  <input className='w-[250px]' type="password" name='password' onChange={onChange} value={password} placeholder="" required />
</label>


<label className='mt-2  text-left w-full' htmlFor="profileimage">Tvoja profilna slika</label>
<input  accept=".png, .jpg, .jpeg" type="file" name='profileimage'  onChange={onChange} className="file-input" id='profileimage'/>

<div className="flex gap-2 w-full justify-end">
    <button className="btn btn-ghost w-fit" type='button' onClick={()=>{navigate('/login')}}>Prijava</button>
<button className="btn btn-primary w-fit" type='submit'>Registruj se</button>

</div>
</form>
   

   </div>







</div>

    </div>
  )
}

export default Register