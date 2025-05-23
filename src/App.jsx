import React, { useState } from 'react'
import { LuLoader } from 'react-icons/lu'

const App = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [transcription, setTranscription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const API_URL = 'https://youtubetranscribeserver-1.onrender.com/api/transcribe'

  const isValidYoutubeUrl = (url) => {
    const regex = /^https:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!youtubeUrl.trim()){
      setError('Please enter a valid Youtube URL')
      return
    }

    if(!isValidYoutubeUrl(youtubeUrl)){
      setError('Please enter a valid Youtube URL')
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeUrl }),
          
      })
      console.log('Response Status:', response.status)
      const data = await response.json()
      console.log('Data:', data)
      if (data.success) {
        setTranscription(data.transcription)
        setSuccess(true)
      } else{
        setError(data.error)
      }
    }catch(error){
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
    
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl sm:text-3xl font-bold text-center'>Youtube + Transcribe</h1> 
      <p className='text-sm sm:text-md mb-4 text-center'>Transcribe Youtube Videos into Text</p> 
      <div className='flex flex-col sm:flex-row gap-2 w-full mt-4  max-w-md sm:max-w-lg'>
        <input
          type='url'
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Enter Youtube Link'
          disabled={isLoading}
          className='flex-1 w-full px-4 py-2 text-base sm:text-md bg-transparent duration-200 transition-colors rounded-lg border-2 border-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm'
        />
        <button
         className='text-sm px-2 py-3 bg-blue-500 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white mt-2 sm:mt-0'
         onClick={handleSubmit}
         disabled={isLoading || !youtubeUrl.trim()}
         >
          {isLoading ?
          "transcribing..."
          :  "Transcribe"
        }
        </button>
      </div>

      {success && !isLoading && (
        <div className='mt-4 text-sm text-green-500'>
          <p>Transcription Successful!</p>
        </div>
      )}

      {isLoading && (
        <div className= 'text-center py-8 '>
          <LuLoader className='flex-shrink w-10 h-10 animate-spin mx-auto mb-4' />
          <p className='text-gray-300 mb-2'>Transcribing Video...</p>
          <p className='text-gray-500 text'>This may take a few seconds</p>
        </div>
      )}

      {error && (
        <div className='mt-4 text-sm text-red-500'>
          <p>{error}</p>
        </div>
      )}

      <div className='mt-10 flex flex-col items-center justify-center w-full max-w-lg md:max-w-xl'> 
          <textarea
            value = {transcription}
            disabled={isLoading}
            readOnly
            className='w-full h-72 text-white px-4 py-2 resize-none leading-relaxed text-base sm:text-lg bg-transparent duration-200 transition-colors rounded-lg border-2 border-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm'
            placeholder='Transcript will appear here'
          />
      </div>
    </div>
  )
}

export default App