import React from 'react'

const TextField = ({label, ...props}) => {
  return (
    <div className='flex justify-between w-full text-sm font-semibold font-serif md:text-xl'>
        <label htmlFor={props.name}>{label} : </label>
        <input {...props}/>
    </div>    
  )
}

export default TextField