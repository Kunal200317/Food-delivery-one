"use client"
import React, { useContext } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import SectionHeader from '@/app/components/SectionHeader'
import { CartContext, CartProductPrice } from '@/app/components/SessionWrapper'
import { useState } from 'react'
import Addressinput from '@/app/components/Addressinput'
import CartProduct from '@/app/components/CartProduct'
import Loading from '@/app/components/loding'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
const orders = () => {
   const session = useSession()
    const status = session?.status
    if (status === 'unauthenticated') {
      return redirect('/login')
    }
  const searchParams = useSearchParams()
  const { ClearCart } = useContext(CartContext)
  const [order, setorder] = useState()
  const [loading, setloading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      ClearCart()
    }

  }, [])

  useEffect(() => {
    if (id) {
      setloading(true)
      fetch('/api/orders?_id=' + id).then(res => {
        res.json().then(data => {
          setorder(data)
        })
      })
      setloading(false)
    }
  }, [id])

  if (loading) {
    return(
      <Loading />
    )
  }

  let Subtotal = 0
  if (order) {
    for (const p of order[0].cartProduct) {
      Subtotal += CartProductPrice(p)
    } 
  }




  return (
    <>
      <section>
        <div className='text-center mt-8'>
          <SectionHeader mainhader={"Your Order"} />
        </div>
        <div className='mt-3'>
          <h1 className=' text-center text-base'>Thank you for Order</h1>
          <p className=' text-center text-base'>We will call you when your order will be on the way</p>
        </div>

        {order && (
          <div className='grid grid-cols-2 gap-16  w-full mt-4'>
            <div>
              {order.map((product, index) => (
                <div key={index}>
                  {product.cartProduct.map((item, index) => (
                    <div key={index}>
                      <CartProduct product={item} CartProductPrice={CartProductPrice} Index={index} />
                    </div>
                  ))}
                </div>
              ))}
              <>
                <div className='text-right pr-20 text-sm mt-3 flex justify-between bg-green-200 rounded-sm'>
                  <span className='pl-[118px] font-medium'>Subtotal:</span>
                  <span className='font-bold'>₹{Subtotal}</span>
                </div>
                <div className='text-right pr-20 text-sm  flex justify-between bg-green-200 rounded-sm'>
                  <span className='pl-[118px] font-medium'>Delivery:</span>
                  <span className='font-bold'>₹{35}</span>
                </div>
                <div className='text-right pr-20 text-sm  flex justify-between bg-green-200 rounded-sm'>
                  <span className='pl-[118px] font-medium'>total:</span>
                  <span className='font-bold'>₹{Subtotal+35}</span>
                </div>
              </>
            </div>

            <div>
              <div className='bg-gray-50'>
                <Addressinput disabled={true} addressprops={order[0]} />
              </div>
            </div>
          </div>
        )}

      </section>
    </>
  )
}

export default orders
