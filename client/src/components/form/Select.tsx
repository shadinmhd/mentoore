import React from 'react'

interface Optoins {
  name: string
}

interface Props {
  onchange: React.ChangeEventHandler<HTMLSelectElement>
  options: Array<Optoins>,
  name: string,
  className : string,
  value : string
}

const Select: React.FC<Props> = ({ onchange, options, name , className, value}) => {
  return (
    <select value={value} onChange={onchange} name={name} className={'focus:outline-none px-2 py-1 w-full border-[1.4px] aria-expanded:rounded-lg text-blue-600 rounded-md border-blue-500 '+ className}>
      {options && options.map((e, i) => {
        return (
          <option key={i} value={e.name}>{e.name}</option>
        )
      })}
    </select>
  )
}

export default Select