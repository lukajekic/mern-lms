import React from 'react'

const UploadDEV = () => {
  return (
    <div>

        <form  encType='multipart/form-data' action="http://localhost:5000/upload"  method="post">
        <input type="file" name="files" id="" multiple />
        <button type="submit">UPLOAD</button>
        </form>
    </div>
  )
}

export default UploadDEV