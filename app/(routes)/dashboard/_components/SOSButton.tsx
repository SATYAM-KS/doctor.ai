'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import './sos-styles.css'

const SOSButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSOSClick = async () => {
    setIsLoading(true)
    setStatus('idle')

    try {
      // Request location permission and get coordinates
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser'))
          return
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        })
      })

      // Prepare location data
      const locationData = {
        type: 'SOS_ALERT',
        timestamp: new Date().toISOString(),
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        },
        userAgent: navigator.userAgent,
        url: window.location.href
      }

      console.log('SOS Location Data:', locationData)

      // Send to webhook
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setStatus('success')
        // Reset success status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        // Reset error status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('SOS Error:', error)
      setStatus('error')
      // Reset error status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="sos-container">
      <button
        // onClick={handleSOSClick}
        // disabled={isLoading}
        className="sos-button"
        aria-label="Send SOS alert"
      >
        <div className="sos-text">SOS</div>
      </button>
      
      {status === 'success' && (
        <div className="sos-status success">
          SOS Alert Sent!
        </div>
      )}
      
      {status === 'error' && (
        <div className="sos-status error">
          Failed to send SOS
        </div>
      )}
    </div>
  )
}

export default SOSButton 