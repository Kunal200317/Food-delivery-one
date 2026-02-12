import React from 'react'

const SectionHeader = ({subhader,mainhader}) => {
  return (
    <>
        <h1 className='uppercase text-2xl font-medium text-gray-600'>{subhader}</h1>
        <h2 className='text-4xl font-bold text-primary italic'>{mainhader}</h2>
    </>
  )
}

export default SectionHeader
