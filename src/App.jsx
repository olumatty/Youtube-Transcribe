import React from 'react'

const App = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl sm:text-3xl font-bold text-center'>Youtube + Transcribe</h1> 
      <p className='text-sm sm:text-md mb-4 text-center'>Transcribe Youtube Videos into Text</p> 
      <div className='flex flex-col sm:flex-row gap-2 w-full max-w-md sm:max-w-lg'>
        <input
          type='text'
          placeholder='Enter Youtube Link'
          className='flex-1 w-full px-4 py-2 text-base sm:text-lg bg-transparent rounded-lg border-2 border-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm'
        />
        <button className='text-sm px-2 py-3 bg-blue-500 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white mt-2 sm:mt-0'>
          Transcribe
        </button>
      </div>

      <div className='mt-10 flex flex-col items-center justify-center w-full max-w-lg'> 
          <textarea
            className='w-full px-4 py-2 text-sm bg-transparent rounded-lg border-2 border-gray-700 focus:outline-none focus:border-blue-500'
            rows='10'
            placeholder='Transcript will appear here'
          ></textarea>
      </div>
    </div>
  )
}

export default App