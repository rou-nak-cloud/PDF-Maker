import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa6";
import axios from 'axios'


const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [convertMessage, setConvertMessage] = useState('')
    const [downloadError, setDownloadError] = useState("")

    const handleFileChange = (e) => {
        console.log(e.target.files)
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!selectedFile){
            setConvertMessage("Please select a file!!")
            return
        }
        const formData = new FormData()
        formData.append("file",selectedFile)
        try {
            const response = await axios.post("http://localhost:8000/convertFile",formData, {
                responseType: "blob",   //boundary object like images files (doc)
            })
                 console.log(response.data)
            const url = window.URL.createObjectURL(new Blob([response.data]))  //syntax
                //  console.log(url)
            const link = document.createElement("a")  //Anchor for the link
                //  console.log(link)
            link.href = url
            link.setAttribute("download",setSelectedFile.name.replace(/\.[^/.]+$/,"")+".pdf")   //Azex symbols
                //  console.log(link);
            document.body.appendChild(link)
                //  console.log(link)
            link.click()
            link.parentNode.removeChild(link)
            setSelectedFile(null)
            setDownloadError("")
            setConvertMessage("File converted successfully")
        } catch (error) {
            console.log(error)
            if(error.response && error.response.status == 400){
                setDownloadError("Error Occurred", error.response.data.message)
            } else{
                setConvertMessage("")
            }
        }
    }

  return (
    <div className='max-w-screen-2xl mx-auto my-4 px-6 md:px-40 container '>
      <div className='h-screen flex justify-center items-center'>
        <div className='border-2 border-dashed border-teal-800 rounded-lg px-20 py-14 shadow-lg'>
            <h1 className='text-4xl text-center font-semibold mb-4'>Convert <span className='text-blue-500'>WORD</span> to <span className='text-red-500'>PDF</span> online</h1>
            <p className='text-sm text-gray-500 text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum debitis cum magnam?</p>
        
        <div className='flex flex-col items-center space-y-10 mt-10'>
            <input type="file" accept='.doc,.docx' 
            onChange={handleFileChange}
            className='hidden' id='fileInput' />
            <label htmlFor="fileInput"
                className='flex w-full items-center justify-center px-4 py-6 bg-emerald-700 text-emerald-300 rounded-lg shadow-lg shadow-emerald-700 border-0 outline-none border-teal-800 hover:bg-emerald-600 cursor-pointer duration 300 hover:scale-90 duration-300 hover:text-emerald-900 duration-400 hover:font-bold' 
            >
                <FaFileWord  className='text-2xl'/>  
                <span className='text-2xl ml-4'>{selectedFile?selectedFile.name : "Choose File"}</span>
            </label>
            <button disabled={!selectedFile}
            onClick={handleSubmit}
             className='text-white bg-emerald-800 hover:bg-emerald-500 duration-300 font-semibold px-15 hover:tracking-widest text-light py-4 rounded-lg disabled:bg-gray-700 disabled:pointer-events-none'>Convert File</button>

             {convertMessage && (<div className='text-green-600 text-center'>{convertMessage}</div>)}
             {downloadError && (<div className='text-red-600 text-center'>{downloadError}</div>)}

        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
