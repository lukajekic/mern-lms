import React, { useEffect } from 'react'
import Loader from './Loader'

const LoadingModal = () => {

  useEffect(() => {
    const dialog = document.getElementById('my_modal_1')
    if (dialog) dialog.showModal()
  }, [])

  return (
    <dialog 
      id="my_modal_1" 
      className="modal p-0 modal-open"
    >
      <div 
        className="
          modal-box 
          p-0
          pb-7
          m-0 
          h-[120px] 
          w-[120px]
          flex 
          justify-center 
          items-center 
          shadow-none 
          border-none
        "
      >
        <Loader />
      </div>
    </dialog>
  )
}

export default LoadingModal
