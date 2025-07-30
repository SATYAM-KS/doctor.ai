"use client"
import React from 'react'
import AppHeader from './_components/AppHeader'

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <AppHeader />
      <div className="Dashboard">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
