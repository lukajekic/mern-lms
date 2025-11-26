import { CircleAlert } from 'lucide-react'
import React, { useEffect } from 'react'

const ErrorModal = () => {
    useEffect(()=>{
        document.getElementById('errormodal').showModal()
    })


  return (
    <div>


        {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="errormodal" className="modal">
  <div className="modal-box flex flex-col items-center">
    <h3 className="font-bold text-lg w-full text-left">Greška</h3>


    
<CircleAlert className='size-14 text-red-700'></CircleAlert>

    <p className="py-4">Desila se greška, da li želite da pokušate ponovo?</p>
    <div className="modal-action flex w-full justify-end">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn" onClick={()=>{window.location.reload()}}>Pokušaj ponovo</button>
      </form>
    </div>
  </div>
</dialog>



    </div>
  )
}

export default ErrorModal