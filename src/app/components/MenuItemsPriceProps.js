import React, { useState } from 'react'

const MenuItemsPriceProps = ({ name, Props, setProps, addlable }) => {
  const [isOpen, setIsOpen] = useState(false)

  function addProps() {
    setProps(oldProps => [...oldProps, { name: "", price: 0 }])
  }

  function editProps(ev, index, prop) {
    const newValue = ev.target.value
    setProps(prevProps => {
      const newProps = [...prevProps]
      newProps[index][prop] = newValue
      return newProps
    })
  }

  function removeProps(indexToRemove) {
    setProps(prevProps => prevProps.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className='bg-gray-300 p-3 rounded-xl w-full'>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        type='button'
        className='flex items-center gap-2 font-medium'
      >
        <img className='w-5' src={isOpen ? "/down.svg" : "/up.svg"} alt="" />
        <span>{name}</span>
        <span>({Props.length})</span>
      </button>

      {isOpen && (
        <div className='space-y-3 mt-3'>
          {Props?.length > 0 &&
            Props.map((size, index) => (
              <div
                key={index}
                className='flex flex-col md:flex-row gap-2 items-start md:items-end'
              >
                <div className='flex-1 w-full'>
                  <label className='text-sm font-medium text-gray-700'>Name</label>
                  <input
                    type="text"
                    placeholder='Size name'
                    value={size.name}
                    onChange={ev => editProps(ev, index, 'name')}
                    className='w-full p-2 rounded-md bg-white'
                  />
                </div>

                <div className='flex-1 w-full'>
                  <label className='text-sm font-medium text-gray-700'>Extra Price</label>
                  <input
                    type="number"
                    placeholder='Extra price'
                    value={size.price}
                    onChange={ev => editProps(ev, index, 'price')}
                    className='w-full p-2 rounded-md bg-white'
                  />
                </div>

                <button
                  type='button'
                  className='mt-1 md:mt-6 bg-red-100 p-2 rounded-md'
                  onClick={() => removeProps(index)}
                >
                  <img className='w-6' src="/delete.svg" alt="Delete" />
                </button>
              </div>
            ))}

          <button
            onClick={addProps}
            type='button'
            className='bg-white p-2 rounded-lg font-medium flex items-center gap-2 border border-gray-400'
          >
            <img className='w-5' src="/pluse.svg" alt="Add" />
            {addlable}
          </button>
        </div>
      )}
    </div>
  )
}

export default MenuItemsPriceProps
