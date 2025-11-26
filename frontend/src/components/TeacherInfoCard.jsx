import { CircleUserRound, Mail, X } from 'lucide-react'
import React from 'react'

const TeacherInfoCard = ({item}) => {

    const close_contactmodal = () =>{
        document.getElementById("contactmodal").close()
    }
  return (
    <div>

        <div className="card lg:card-side bg-base-100 shadow-sm right-0 bg-white ">
            <div className="flex flex-row items-center gap-5">

                 <CircleUserRound className='size-8'></CircleUserRound>
  <div className="card-body p-0">
    <h2 className="card-title">{item.teacher_name}</h2>
    <p>{item.teacher_email}</p>

  </div>

            </div>
 
</div>

    <button disabled onClick={()=>document.getElementById("contactmodal").showModal()}  className="btn btn-primary mt-3 flex flex-row items-center"><span><Mail className='size-5'></Mail></span>Kontaktiraj</button>



{/* MODAL */}


{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="contactmodal" className="text-left modal fullscreenmodal w-screen h-screen p-0">
    <button className="btn top-2 right-2 fixed z-50"  onClick={()=> close_contactmodal()}><X></X></button>
  <div className="modal-box w-full fullscreenmodal h-full m-0 rounded-none p-4 ">
    <h3 className="font-bold text-2xl">Kontaktiraj predavača!</h3>
    <p className="text-center text-lg py-4">Unesite naslov poruke i poruku.<br></br>
    Ukoliko je pitanje vezano za zadatak, navedite zadatak.
    </p>


    <div className="flex flex-col gap-3 w-full items-center">
        <input type="text" placeholder="Type here" className="input w-3xl" />
    <textarea className="textarea w-3xl min-h-40 h-40" placeholder="Bio"></textarea>
    <div className="w-3xl flex flex-row justify-end gap-2">
        <button className="btn"  onClick={()=> close_contactmodal()}>Close</button>
                <button className="btn btn-primary">Close</button>

    </div>
    </div>
    <div className="modal-action">
      <form method="dialog">
        
      </form>
    </div>
  </div>
</dialog>




    </div>
  )
}

export default TeacherInfoCard