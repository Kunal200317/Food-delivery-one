"use client"
import React from 'react'
import { UseProfile } from '@/app/components/UseProfile'
import Usertabs from '@/app/components/Usertabs'
import Loading from '@/app/components/loding'
import UserForm from '@/app/components/UserForm'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
const EditUser = () => {
  const [user, setuser] = useState(null)
  const { loading, data } = UseProfile()
  const param = useParams()

  useEffect(() => {
    fetch('/api/profile?_id='+param.id).then(response =>
      response.json().then(user => {
        setuser(user)    
      }));
  }, [])

  const handleSaveButtonClick = async (e, data) => {
      
      e.preventDefault()
      // Add your code here to save the menu item to the database.

      const savemenuitems = new Promise(async (resolve, reject) => {

          const responce = await fetch("/api/profile", {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({_id:param.id,...data})
          })

          if (responce.ok) {
              resolve()
          }
          else {
              reject()
          }

          await toast.promise(savemenuitems, {
              loading: 'updating..',
              success: 'User update successfully',
              error: 'Failed to update User!',
          })

      });
  
  }


  if (loading) {
    return <Loading />
  }
  if (!data.admin) {
    return <div>You are not authorized to access this page.</div>
  }

  return (
    <section>
      <Usertabs isAdmin={true} />
      <div className=' md:w-4/5 mx-auto'>
        <div className='md:flex justify-center'>
          <UserForm user={user} onsave={handleSaveButtonClick} />
        </div>
      </div>
    </section>
  )
}

export default EditUser
