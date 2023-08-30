import React from 'react'

interface Props {
  type: string,
  onchange: React.ChangeEventHandler<HTMLInputElement>,
  placeholder: string,
  name: string
}

const Input: React.FC<Props> = ({ type, onchange, placeholder, name }) => {
  return (
    <input
      className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600'
      name={name}
      placeholder={placeholder}
      onChange={onchange}
      type={type}
    />
  )
}

export default Input