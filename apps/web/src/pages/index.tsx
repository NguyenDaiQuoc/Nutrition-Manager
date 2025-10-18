import React from 'react'
import Login from '../components/Login'
import UploadPhoto from '../components/UploadPhoto'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Quản lý dinh dưỡng</h1>
        <Login />
        <UploadPhoto />
      </div>
    </main>
  )
}
