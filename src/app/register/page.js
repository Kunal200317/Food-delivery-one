"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const Ragister = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [creatinguser, setcreatinguser] = useState(false)
  const [usercreated, setUsercreated] = useState(false)
  const [error, seterror] = useState(false)

  const handlechangeemail = (e) => setemail(e.target.value)
  const handlechangepassword = (e) => setpassword(e.target.value)

  const handlesubmit = async (e) => {
    e.preventDefault()
    setcreatinguser(true)

    const responce = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })

    if (!responce.ok) {
      seterror(true)
      setcreatinguser(false)
      setUsercreated(false)
      return
    }

    setUsercreated(true)
    setcreatinguser(false)
    seterror(false)
  }

  return (
    <section className="md:min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-center text-3xl font-bold text-primary mb-6">Register</h1>

        {usercreated && (
          <div className="text-center text-green-600 my-4">
            User created successfully! Now{" "}
            <Link className="underline font-medium" href="/login">
              login &raquo;
            </Link>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
          <input
            disabled={creatinguser}
            className="bg-gray-100 rounded-lg p-3 border disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handlechangeemail}
          />
          {error && (
            <div className="text-center text-red-600 font-medium">
              Error... try again later
            </div>
          )}
          <input
            disabled={creatinguser}
            className="bg-gray-100 rounded-lg p-3 border disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlechangepassword}
          />
          <button
            disabled={creatinguser}
            type="submit"
            className="bg-primary text-white p-3 rounded-lg text-lg font-medium disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            Register
          </button>

          <div className="text-center font-medium text-gray-500">
            or login with provider
          </div>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="font-bold bg-gray-50 rounded-lg border p-2 flex items-center gap-3 justify-center text-gray-700"
          >
            <Image src="/google.png" width={24} height={24} alt="google" />
            Login with Google
          </button>

          <div className="text-center text-gray-600 border-t pt-4 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login here &raquo;
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Ragister
