import axios from 'axios'
import { Mail, Lock, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const Login = () => {

  useEffect(()=>{
displayerror(false, "")
  }, [])
const navigate = useNavigate()
  const [formdata, setformdata] = useState({
    email: '',
    password: ''    
  })

  const {email, password} = formdata

const displayerror = (visible, error) => {
  const errorelement = document.getElementById('errmessage')
if (error) {
  errorelement.innerText = error
} else {
  errorelement.innerText = "Desila se greška."
}

if (visible === true) {
errorelement.style.display = 'block'
} else if (visible === false) {
  errorelement.style.display = 'none'
}
}

const onChange = (e) =>{
  setformdata((prevSttate) => ({
    ...prevSttate,
    [e.target.name]: e.target.value
  }))

}


const onSubmit = async (e) =>{
e.preventDefault()

const body = {
  email, password
}


try {
  displayerror(false, "")

const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/login`, body)
if (response.status === 200) {
  navigate('/')
}
} catch (error) {
  if (error.response.status === 500 && error.response.data.message === "Invalid credentials") {
    console.log("netacni podaci za prijavu")
displayerror(true, "Netačni podaci za prijavu")
  }
}

}

  return (
    <div className='fixed top-0 left-0 flex h-screen w-[100%] flex-row'>

<div className="h-full bg-[url('/icons/mathpattern-opacity-30.png')]  w-[50%] flex items-center justify-center">
<div className="flex flex-col gap-3">
        <h1 className='text-3xl font-bold'>Dobrodošao nazad u <span className='p-1 bg-yellow-500'>LMS</span></h1>
        <p>Na korak si od znanja bilo čega!</p>

    </div>
    
    </div>
<div className="h-full bg-[#f9fbfc]  w-[50%] flex items-center justify-center">
   



   <div className="flex flex-col gap-3">
     <h1 className='text-3xl font-bold w-full text-left pb-4'>Prijava</h1>

     <div id='errmessage' className="border-1 border-red-500 w-full  rounded-md text-red-600 py-2">Netačni podaci za prijavu.</div>


<form action="" className='flex flex-col gap-3' onSubmit={onSubmit}>




    <label className="input validator mt-2">
  <Mail className='text-gray-500'></Mail>
  <input className='w-[250px]' type="email" name='email' onChange={onChange} value={email} placeholder="mail@site.com" required />
</label>
<div className="validator-hint hidden ">Unesi ispravnu email adresu</div>


    <label className="input validator mt-2">
  <Lock className='text-gray-500'></Lock>
  <input className='w-[250px]' type="password" name='password' onChange={onChange} value={password} placeholder="" required />
</label>



<div className="flex gap-2 w-full justify-end">
    <button className="btn btn-ghost w-fit" type='button' onClick={()=>{navigate('/register')}}>Registracija</button>
<button className="btn btn-primary w-fit" type='submit'>Prijavi se</button>

</div>
</form>
   

   </div>







</div>

    </div>
  )
}

export default Login