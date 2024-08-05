import React, { useState } from 'react'

export default function QrCode() {
 const[img,setImg]=useState("")
 const[loading,setLoading]=useState(false)
 const[qrData,setQrData]=useState("")
 const[qrSize,setQrSize]=useState("")
 


function generateQR(){
  setLoading(true)
  try {
    const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x{qrSize}&data=${encodeURIComponent(qrData)}`
    setImg(url)
  } 
  catch (error) {
    console.log("Error generating QR code",error)
  }
  finally{
      setLoading(false)
  }
}
function downloadQR(){
  fetch(img)
  .then((response)=>response.blob())
  .then((blob)=>{
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob)
    link.download="qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch((error)=>{
    console.log("Error downloading QR code",error);
    
  })
}
  return(
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please Wait...</p>}
        {img&&<img src={img}   className='qr-code-img' alt="" />}
      <div>
        <label htmlFor="dataInput" className='input-label'>
            Data for QR code
        </label>
        <input type="text" value={qrData} id='dataInput' placeholder='Enter data for QR code' onChange={(e)=>setQrData(e.target.value)}/>
        
        <label htmlFor="sizeInput" className='input-label'>
            Image Size(e.g.,150):
        </label>
        <input type="text" value={qrSize}   id='sizeInput' placeholder='Enter image size' onChange={(e)=>setQrSize(e.target.value)} />
        <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className='download-button' onClick={downloadQR}>Download QR Code</button>
      </div>
      <p className='footer'>Designed By <a href="https://www.linkedin.com/in/muzammel-ms/?trk=opento_sprofile_details" target='blank'>Muzammel</a> </p>
    </div>
  )
}
