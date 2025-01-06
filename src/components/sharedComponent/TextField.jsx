import React from 'react'

const TextField = ({label, ...props}) => {
  return (
    <div className='flex justify-between w-full text-xl font-semibold font-serif'>
        <label htmlFor={props.name}>{label} : </label>
        <input {...props}/>
    </div>    
  )
}

export default TextField