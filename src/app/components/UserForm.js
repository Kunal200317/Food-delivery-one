"use client"
import React, { useEffect, useState } from 'react'
import EditableImage from './EditableImage'
import Addressinput from './Addressinput'

const UserForm = ({ user, onsave }) => {
  const [userName, setUserName] = useState("")
  const [image, setImage] = useState("")
  const [phone, setPhone] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (user) {
      setUserName(user.name || "")
      setImage(user.image || "")
      setPhone(user.phone || "")
      setStreetAddress(user.streetaddress || "")
      setPincode(user.pincode || "")
      setCity(user.city || "")
      setCountry(user.country || "")
      setAdmin(user.admin || false)
    }
  }, [user])

  function handleAddressChange(name, value) {
    switch (name) {
      case 'phone': setPhone(value); break;
      case 'streetAddress': setStreetAddress(value); break;
      case 'pincode': setPincode(value); break;
      case 'city': setCity(value); break;
      case 'country': setCountry(value); break;
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className='flex-shrink-0 mx-auto md:mx-0'>
        <EditableImage Link={image} setLink={setImage} />
      </div>

      <form
        className="flex flex-col w-full md:max-w-[70%]"
        onSubmit={(e) =>
          onsave(e, {
            name: userName,
            image,
            phone,
            streetAddress,
            pincode,
            city,
            country,
            admin,
          })
        }
      >
        <div className="flex flex-col mt-1 w-full">
          <label className="font-medium text-gray-600">First and Last Name</label>
          <input
            className="bg-gray-200 rounded-2xl p-2 h-11 w-full border"
            placeholder="First and Last Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-1 w-full">
          <label className="font-medium text-gray-600">Email</label>
          <input
            disabled
            value={user?.email || ""}
            className="bg-gray-100 rounded-2xl p-2 h-11 w-full border disabled:cursor-not-allowed text-gray-500 font-medium"
          />
        </div>

        <Addressinput
          addressprops={{ phone, streetAddress, pincode, city, country }}
          setAddressprops={handleAddressChange}
        />

        <div className="w-full mt-1 rounded-lg p-1">
          <label className="flex gap-2 items-center" htmlFor="admincb">
            <input
              id="admincb"
              type="checkbox"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
            />
            <span>Admin</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary w-full text-white p-2 rounded-2xl text-lg border font-medium mt-2"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default UserForm
