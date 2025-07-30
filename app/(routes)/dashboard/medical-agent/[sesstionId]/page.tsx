"use client"
import dynamic from 'next/dynamic'

const MedicalVoiceAgent = dynamic(
  () => import('./MedicalVoiceAgent'),
  { ssr: false }
)

export default function MedicalAgentPage() {
  return <MedicalVoiceAgent />
}
