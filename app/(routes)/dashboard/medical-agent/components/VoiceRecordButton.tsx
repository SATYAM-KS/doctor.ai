"use client"
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Square, Loader2 } from 'lucide-react'

interface VoiceRecordButtonProps {
  isCallActive: boolean
  onRecordingComplete: (audioBlob: Blob) => void
}

const VoiceRecordButton = ({ isCallActive, onRecordingComplete }: VoiceRecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      stopRecording()
    }
  }, [])

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      setRecordingTime(0)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRecording])

  const startRecording = async () => {
    try {
      console.log("Starting voice recording...")
      audioChunksRef.current = []

      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      const mediaRecorder = new MediaRecorder(streamRef.current)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        console.log("Recording stopped, processing audio...")
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        onRecordingComplete(audioBlob)

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
          streamRef.current = null
        }

        setIsRecording(false)
      }

      mediaRecorder.start()
      setIsRecording(true)
      console.log("Voice recording started")
    } catch (error) {
      console.error("Error starting recording:", error)
      setIsRecording(false)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log("Stopping voice recording...")
      mediaRecorderRef.current.stop()

    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!isCallActive) return null

  return (
    <div className="flex items-center gap-2">
      {isRecording ? (
        <>
          <span className="text-sm text-red-500 animate-pulse">
            Recording {formatTime(recordingTime)}
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={stopRecording}
            className="flex items-center gap-1"
          >
            <Square className="h-4 w-4" />
            Stop
          </Button>
        </>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          onClick={startRecording}
          className="flex items-center gap-1"
        >
          <Mic className="h-4 w-4" />
          Record Voice
        </Button>
      )}
    </div>
  )
}

export default VoiceRecordButton 