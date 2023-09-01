import React from 'react'

interface Props {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  return (
    <button
      className='hover:bg-white hover:text-blue-600 hover:shadow-2xl transition-all w-full py-[7px] bg-blue-600 rounded-lg text-white'
    >
      {text}
    </button>
  )
}

export default SubmitButton