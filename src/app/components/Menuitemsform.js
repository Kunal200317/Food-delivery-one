import React, { useState, useEffect } from 'react'
import EditableImage from '@/app/components/EditableImage'
import MenuItemsPriceProps from './MenuItemsPriceProps'

const Menuitemsform = ({ onSubmit, menuitems }) => {
  const [image, setImage] = useState("")
  const [itemname, setItemname] = useState("")
  const [itemdescription, setItemdescription] = useState("")
  const [itemprice, setItemprice] = useState("")
  const [sizes, setSizes] = useState([])
  const [ExtraIngredientsPrice, setExtraIngredientsPrice] = useState([])
  const [category, setCategory] = useState("")
  const [Categories, setCategories] = useState([])

  useEffect(() => {
    if (menuitems) {
      setImage(menuitems.image || "")
      setItemname(menuitems.name || "")
      setItemdescription(menuitems.description || "")
      setItemprice(menuitems.price || "")
      setSizes(menuitems.sizes || [])
      setExtraIngredientsPrice(menuitems.extraingredients || [])
      setCategory(menuitems.category || "")
    }
  }, [menuitems])

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => setCategories(categories))
  }, [])

  return (
    <form
      onSubmit={e =>
        onSubmit(e, {
          image,
          itemname,
          itemdescription,
          itemprice,
          ExtraIngredientsPrice,
          sizes,
          category,
        })
      }
    >
      <h1 className='text-center underline text-xl font-semibold mb-4'>
        Menu Item
      </h1>

      <div className='flex flex-col max-w-4xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row gap-4 justify-center items-start'>
          {/* Image */}
          <div className='w-full md:w-1/3'>
            <EditableImage Link={image} setLink={setImage} />
          </div>

          {/* Form Fields */}
          <div className='w-full md:w-2/3 space-y-3'>
            <div className='flex flex-col'>
              <label className='text-sm font-medium text-gray-700'>Item name</label>
              <input
                type='text'
                className='bg-gray-200 rounded-xl px-4 py-2'
                value={itemname}
                required
                onChange={e => setItemname(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm font-medium text-gray-700'>Description</label>
              <input
                type='text'
                className='bg-gray-200 rounded-xl px-4 py-2'
                value={itemdescription}
                required
                onChange={e => setItemdescription(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm font-medium text-gray-700'>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className='bg-gray-200 rounded-xl px-4 py-2'
              >
                {Categories?.length > 0 &&
                  Categories.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='text-sm font-medium text-gray-700'>Base Price</label>
              <input
                type='number'
                className='bg-gray-200 rounded-xl px-4 py-2'
                value={itemprice}
                required
                onChange={e => setItemprice(e.target.value)}
              />
            </div>

            {/* Sizes */}
            <MenuItemsPriceProps
              name='Sizes'
              Props={sizes}
              setProps={setSizes}
              addlable='Add size items'
            />

            {/* Extra Ingredients */}
            <MenuItemsPriceProps
              name='Extra ingredients prices'
              Props={ExtraIngredientsPrice}
              setProps={setExtraIngredientsPrice}
              addlable='Add Ingredients price'
            />

            {/* Submit Button */}
            <button
              type='submit'
              className='bg-primary text-white w-full rounded-xl py-2 font-semibold mt-4'
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Menuitemsform
