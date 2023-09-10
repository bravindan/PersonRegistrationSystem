import React from 'react'

export default function Loader() {
  return (
    <div>
      <div className='flex justify-center items center'>
        <div className='loader animate-ping border-4 border-t-4 border-gray-200 rounded-full  w-12 h-12 ease-linear'></div>
      </div>
    </div>
  )
}
