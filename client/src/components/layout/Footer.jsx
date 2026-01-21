import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 flex justify-between items-center md:h-14 max-h-14 shrink-0 border-t border-gray-200'>
        <div className='flex gap-3.5 pl-6'>
            <div>&copy;Adi</div>
            <a href='https://github.com/november-rain452/Peep_Stocks' target="_blank" rel="noreferrer">Repo</a>
        </div>
        <div className='flex gap-3.5 pr-6 '>
            <a href=''>Terms</a>
            <a href='https://github.com/november-rain452' target="_blank" rel="noreferrer">Github</a>
        </div>
    </div>
  )
}

export default Footer