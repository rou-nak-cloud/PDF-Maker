import React from 'react'

const Navbar = () => {
  return (
    <div className='shadow-lg shadow-emerald-700 fixed top-0 left-0 w-full rounded-full z-50'>
    <div className='max-w-screen-2xl mx-auto px-6 md:px-40 container rounded-full '>
      <div className='flex justify-between py-6'>
        <h1 className='text-3xl text-teal-500 cursor-pointer hover:scale-125 duration-300'>Word <span className='text-red-700 text-4xl '>To</span> Pdf</h1>
        <h1 className='text-3xl text-teal-600'>Only Text <span className='text-4xl text-red-800'>Docs</span></h1>
      </div>
    </div>
    </div>
  )
}

export default Navbar
