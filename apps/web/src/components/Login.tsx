import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  async function signInGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }
  async function signInEmail() {
    await supabase.auth.signInWithOtp({ email })
    alert('Check your email for the magic link')
  }
  async function signInPhone() {
    await supabase.auth.signInWithOtp({ phone })
    alert('Check your phone for OTP')
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <button onClick={signInGoogle} className="px-3 py-2 border rounded">Sign in with Google</button>
      <div className="mt-2">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="border p-2 rounded mr-2" />
        <button onClick={signInEmail} className="px-3 py-2 bg-green-500 text-white rounded">Send magic link</button>
      </div>
      <div className="mt-2">
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+84..." className="border p-2 rounded mr-2" />
        <button onClick={signInPhone} className="px-3 py-2 bg-blue-500 text-white rounded">Send OTP</button>
      </div>
    </div>
  )
}
