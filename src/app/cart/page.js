"use client"
import Script from 'next/script'
import React, { useContext, useState, useEffect, Suspense } from 'react'
import Loading from '../components/loding'
import SectionHeader from '../components/SectionHeader'
import { CartContext, CartProductPrice } from '../components/SessionWrapper'
import Addressinput from '../components/Addressinput'
import { UseProfile } from '../components/UseProfile'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import CartProduct from '../components/CartProduct'
import { useSession } from 'next-auth/react'

const CartContent = () => {

  const { data: session, status } = useSession();
  const [autharized, setautharized] = useState(false)
  useEffect(() => {
    if (status === "authenticated") {
      setautharized(true)
    }
    else {
      setautharized(false)
    }
  }, [status])


  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [Total, setTotal] = useState();
  const SearchParms = useSearchParams();
  const { data } = UseProfile();
  const { cartProduct, RemoveCartProduct } = useContext(CartContext);


  useEffect(() => {
    if (data) {
      setPhone(data.phone);
      setStreetAddress(data.streetaddress);
      setPincode(data.pincode);
      setCity(data.city);
      setCountry(data.country);
    }
  }, [data]);

  let total = 0;
  for (const p of cartProduct) {
    total += CartProductPrice(p);
  }

  useEffect(() => {
    setTotal(total + 35);
  }, [total]);

  useEffect(() => {
    if (SearchParms.get("paymentdone") === "false") {
      toast.error("Payment Failed");
    }
  }, []);

  function handleAddressChange(name, value) {
    const setters = {
      phone: setPhone,
      streetAddress: setStreetAddress,
      pincode: setPincode,
      city: setCity,
      country: setCountry,
    };
    setters[name]?.(value);
  }

  const pay = async (amount) => {
    const response = await fetch("/api/checkout", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        streetAddress,
        pincode,
        city,
        country,
        Total,
        cartProduct,
      }),
    });

    const order = await response.json();

    const options = {
      key: 'rzp_test_YlsIMKyGXhS3ih',
      amount: amount,
      currency: "INR",
      name: "Pizza 47",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: "https://food-delivery-one-ten.vercel.app/api/razorpay",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  }

  if (cartProduct.length === 0) {
    return (
      <section>
        <div className='text-center mt-6'>
          <SectionHeader mainhader={"Cart"} />
        </div>
        <div className='flex justify-center mt-8 px-4'>
          <img className='w-full max-w-xs md:max-w-md rounded-xl' src="https://img.freepik.com/premium-photo/young-puppy-…cane-corso-white-background_221513-4453.jpg?w=826" alt="Empty Cart" />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="px-4 py-6">
        <div className='text-center mb-6'>
          <SectionHeader mainhader={"Cart"} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Cart Items */}
          <div className='space-y-4'>
            {cartProduct?.length === 0 && (
              <p className='text-center text-gray-600'>Cart is empty</p>
            )}

            {cartProduct.map((product, index) => (
              <div key={product.id || index}>
                <CartProduct
                  product={product}
                  OnRemove={RemoveCartProduct}
                  CartProductPrice={CartProductPrice}
                  Index={index}
                />
              </div>
            ))}

            {cartProduct.length > 0 && (
              <div className='text-sm space-y-2'>
                <div className='flex justify-between bg-green-100 px-4 py-2 rounded-md'>
                  <span className='font-medium'>Subtotal:</span>
                  <span className='font-bold'>₹{total}</span>
                </div>
                <div className='flex justify-between bg-green-100 px-4 py-2 rounded-md'>
                  <span className='font-medium'>Delivery:</span>
                  <span className='font-bold'>₹35</span>
                </div>
                <div className='flex justify-between bg-green-200 px-4 py-2 rounded-md'>
                  <span className='font-medium'>Total:</span>
                  <span className='font-bold'>₹{Total}</span>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Form */}
          <div className='bg-gray-100 rounded-md p-4 md:p-6 shadow-sm'>
            <h3 className="text-lg font-semibold mb-4">Checkout</h3>
            <form className='space-y-4'>
              <Addressinput addressprops={{ phone, streetAddress, pincode, city, country }} setAddressprops={handleAddressChange} />
              <button
                className='bg-primary w-full rounded-lg text-white p-3 text-base font-semibold'
                type='button'
                disabled={!autharized}
                onClick={() => pay(Total * 100)
                }
              >
                Pay ₹{Total}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}

const CartPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CartContent />
    </Suspense>
  )
}

export default CartPage
