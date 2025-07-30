"use client"
import { Loader2 } from 'lucide-react'

interface TranscriptionLoadingProps {
  isLoading: boolean
}

const TranscriptionLoading = ({ isLoading }: TranscriptionLoadingProps) => {
  if (!isLoading) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-blue-600">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Processing your speech...</span>
    </div>
  )
}

export default TranscriptionLoading 