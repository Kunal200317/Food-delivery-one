import React from 'react'

const Addressinput = ({ addressprops, setAddressprops, disabled }) => {
  const { phone, streetAddress, pincode, city, country } = addressprops;

  return (
    <div className="space-y-3">
      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Phone Number</label>
        <input
          type="tel"
          className="bg-gray-200 rounded-xl p-2 h-11 w-full border"
          placeholder="Phone Number"
          value={phone || ''}
          onChange={(e) => setAddressprops('phone', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Street Address</label>
        <input
          type="text"
          className="bg-gray-200 rounded-xl p-2 h-11 w-full border"
          placeholder="Street Address"
          value={streetAddress || ''}
          onChange={(e) => setAddressprops('streetAddress', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex flex-col flex-1">
          <label className="font-medium text-gray-600">Pincode</label>
          <input
            type="text"
            className="bg-gray-200 rounded-xl p-2 h-11 w-full border"
            placeholder="Pincode"
            value={pincode || '' }
            onChange={(e) => setAddressprops('pincode', e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="font-medium text-gray-600">City</label>
          <input
            type="text"
            className="bg-gray-200 rounded-xl p-2 h-11 w-full border"
            placeholder="City"
            value={city || ''}
            onChange={(e) => setAddressprops('city', e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Country</label>
        <input
          type="text"
          className="bg-gray-200 rounded-xl p-2 h-11 w-full border"
          placeholder="Country"
          value={country ||''}
          onChange={(e) => setAddressprops('country', e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default Addressinput
