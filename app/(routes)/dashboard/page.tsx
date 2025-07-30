import React from 'react'
import HistoryList from './_components/HistoryList'
import DoctorsList from './_components/DoctorsList'
import AddNewSession from './_components/AddNewSession'
import WebhookForm from './_components/WebhookForm'

function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Dashboard</h2>
        <AddNewSession />
      </div>
      <HistoryList />
      <DoctorsList />
      <WebhookForm />
    </div>
  )
}

export default Dashboard
