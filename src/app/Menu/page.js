"use client"
import React, { useState, useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import MenuItem from '../components/MenuItem'

const ManuPage = () => {
  const [categories, setCategories] = useState([])
  const [menuitems, setMenuitems] = useState([])

  useEffect(() => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((categories) => setCategories(categories))

    fetch('/api/menuitems')
      .then((response) => response.json())
      .then((menuitems) => setMenuitems(menuitems))
  }, [])

  return (
    <section className="px-4 md:px-8">
      {categories.length > 0 && categories.map((category) => (
        <div key={category._id} className='mt-8'>
          <div className='text-center'>
            <SectionHeader mainhader={category.name} />
          </div>

          <div className='grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-4 mt-5'>
            {menuitems
              .filter((item) => item.category === category._id)
              .map((item) => (
                <MenuItem key={item._id} {...item} />
              ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default ManuPage
