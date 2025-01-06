import React from 'react'

const Button = ({label}) => {
  return (
    <div className='w-full'>
        <button className='bg-gradient-to-bl from-blue-300 to-emerald-500 mx-3 h-14 rounded-2xl text-cyan-900 text-3xl font-extrabold hover:from-blue-600 hover:to-emerald-400 w-full' type='submit'>
            {label}
        </button>
    </div>
  )
}

export default Button