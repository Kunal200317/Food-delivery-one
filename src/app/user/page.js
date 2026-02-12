"use client"
import React from 'react'
import Usertabs from '../components/Usertabs'
import { UseProfile } from '../components/UseProfile'
import Loading from '../components/loding'
import { useState, useEffect } from 'react'
import Link from 'next/link'
const UserPage = () => {
  const [users, setUsers] = useState([])
  const { loading, data } = UseProfile()

  useEffect(() => {
    fetch('/api/users').then(res =>
      res.json().then(users => {
        setUsers(users)
      }))
  }, [])


  if (loading) {
    return <Loading />
  }

  if (!data.admin) return <div>You are not authorized to access this page.</div>

  return (
    <section className=''>
      <Usertabs isAdmin={data.admin} />
      <div className=' w-4/5 mx-auto p-1'>
        {users?.length > 0 &&
          users.map(user => (
            <div key={user._id} className='bg-gray-300 flex md:flex-row flex-col gap-2 mt-2 p-2 rounded-lg'>

              <div className=' grid grid-cols-2 md:grid-cols-3 grow'>
                <div>
                  {user.name && (<span>{user.name}</span>)}
                  {!user.name && (<span className='italic text-gray-500'>No Name</span>)}
                </div>
                <span className='text-gray-500  overflow-hidden'>{user.email}</span>
              </div>

              <div>
                <Link href={'/user/'+user._id} className='border-[1.5px] p-1 px-3 border-gray-400 rounded-lg font-semibold bg-primary text-white'>Edit</Link>
              </div>

            </div>
          ))}
      </div>
    </section>
  )
}

export default UserPage
