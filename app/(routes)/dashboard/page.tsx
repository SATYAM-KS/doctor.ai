import React from 'react'
import HistoryList from './_components/HistoryList'
import DoctorsList from './_components/DoctorsList'
import AddNewSession from './_components/AddNewSession'
import WebhookForm from './_components/WebhookForm'
import SOSButton from './_components/SOSButton'
import ChatbotWidget from './_components/ChatbotWidget'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Dashboard</h2>
        <div className="flex items-center space-x-3">
          <AddNewSession />
        </div>
      </div>
      <HistoryList />
      <DoctorsList />
      <WebhookForm />
      <SOSButton />
      {/* <ChatbotWidget /> */}
    </div>
  )
}

export default Dashboard
