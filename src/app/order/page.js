"use client"
import React, { useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import Usertabs from '../components/Usertabs'
import { UseProfile } from '../components/UseProfile'
import Loading from '../components/loding'
import dateforhuman from '@/libs/dateforhuman'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const OrdersPage = () => {
  const session = useSession()
  const status = session?.status
  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  const [orders, setOrders] = useState([])
  const { data: profile } = UseProfile()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data.reverse())
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <>
        <div className='text-center mt-8'>
          <SectionHeader mainhader={"Orders"} />
        </div>
        <Loading />
      </>
    )
  }

  return (
    <section className='px-4 py-6'>
      <Usertabs isAdmin={profile?.admin} />
      <div className='text-center mt-6'>
        <SectionHeader mainhader={"Orders"} />
      </div>

      <div className="max-w-screen-lg mx-auto space-y-4 mt-4">
        {orders?.length > 0 && orders.map((order, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl p-4 shadow-sm flex flex-col md:grid md:grid-cols-6 gap-3 items-center text-sm"
          >
            <div className="md:col-span-1">
              <span
                className={`py-1 px-3 rounded-md font-medium text-center block w-fit ${
                  order.paid
                    ? 'bg-green-200 text-green-700'
                    : 'bg-red-200 text-red-700'
                }`}
              >
                {order.paid ? 'Paid' : 'Not Paid'}
              </span>
            </div>

            <div className="md:col-span-2 text-gray-700 flex flex-col gap-1">
              <div className="font-semibold break-words">{order.userEmail}</div>
              <div className="flex flex-wrap gap-1 text-gray-600 text-sm">
                {order.cartProduct.map((p, i) => (
                  <span key={i}>{p.name},</span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 text-gray-600 text-center md:text-left">
              {dateforhuman(order.createdAt)}
            </div>

            <div className="md:col-span-1 flex justify-center">
              <Link
                href={`/order/${order.order_id}`}
                className="border border-gray-500 bg-primary text-white text-xs rounded-md px-3 py-2 font-semibold hover:bg-primary/90 transition"
              >
                Show Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OrdersPage
