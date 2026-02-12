"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const Loginpage = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [logininprograse, setlogininprograse] = useState(false)

  const handlechangeemail = (e) => setemail(e.target.value)
  const handlechangepassword = (e) => setpassword(e.target.value)

  const handlesubmit = async (e) => {
    e.preventDefault()
    setlogininprograse(true)
    await signIn('credentials', { email, password, callbackUrl: '/' })
    setlogininprograse(false)
  }

  return (
    <section className="md:min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-3xl font-bold text-primary mb-6">Login</h1>

        <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
          <input
            name="email"
            disabled={logininprograse}
            className="bg-gray-100 rounded-lg p-3 border disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handlechangeemail}
          />
          <input
            name="password"
            disabled={logininprograse}
            className="bg-gray-100 rounded-lg p-3 border disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlechangepassword}
          />
          <button
            disabled={logininprograse}
            type="submit"
            className="bg-primary text-white p-3 rounded-lg text-lg font-medium disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            Login
          </button>

          <div className="text-center text-gray-500">or login with provider</div>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="font-semibold bg-gray-50 rounded-lg border p-2 flex items-center gap-3 justify-center text-gray-700"
          >
            <Image src="/google.png" width={24} height={24} alt="google" />
            Login with Google
          </button>

          <div className="text-center text-gray-600 border-t pt-4 text-sm">
            Don't have an account? <Link href="/register" className="underline">Register here &raquo;</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Loginpage
