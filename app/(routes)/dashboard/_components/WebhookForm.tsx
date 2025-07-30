'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './styles.css'



const WebhookForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    gender: '',
    age: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isFormVisible, setIsFormVisible] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', number: '', gender: '', age: '', message: '' })
        // Reset success status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000)
      } else {
        setSubmitStatus('error')
        // Reset error status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      // Reset error status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible)
  }

  return (
    <div className="webhook-toggle-container">
      {!isFormVisible ? (
        /* Robot Emoji Button - Shows when form is hidden */
        <button 
          onClick={toggleForm}
          className="robot-button"
          aria-label="Toggle contact form"
        >
          <img src="/webhook.png" alt="webhook" />
        </button>
      ) : (
        /* Form - Shows when robot is clicked */
        <div className="webhook-form-container">
          <Card className="webhook-form-card">
            <CardHeader className="webhook-form-header">
              <CardTitle className="webhook-form-title">Contact Form</CardTitle>
              <button 
                onClick={toggleForm}
                className="webhook-form-close"
                aria-label="Close form"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="webhook-form">
                <div className="webhook-form-field">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="webhook-form-input"
                  />
                </div>
                <div className="webhook-form-field">
                  <Input
                    type="tel"
                    name="number"
                    maxLength={10}
                    minLength={10}
                    pattern="^[0-9]{10}$"
                    placeholder="Your Number (10 digits)"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                    className="webhook-form-input"
                  />
                </div>
                <div className="webhook-form-field">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="webhook-form-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="webhook-form-field">
                  <Input
                    type="number"
                    name="age"
                    placeholder="Your Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                    className="webhook-form-input"
                  />
                </div>
                <div className="webhook-form-field">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="webhook-form-textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="webhook-form-button"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                
                {submitStatus === 'success' && (
                  <div className="webhook-form-success">
                    Message sent successfully!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="webhook-form-error">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default WebhookForm 