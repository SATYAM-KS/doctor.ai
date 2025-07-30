import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Webhook API route called with data:', body)
    
    const webhookUrl = 'https://atharv6099.app.n8n.cloud/webhook-test/66a20f47-b92e-4513-b301-e36785db69f8'
    console.log('Sending data to webhook:', webhookUrl)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)

    console.log('Webhook response status:', response.status)
    console.log('Webhook response ok:', response.ok)

    if (response.ok) {
      const responseText = await response.text()
      console.log('Webhook response body:', responseText)
      return NextResponse.json({ success: true, message: 'Data sent successfully' })
    } else {
      const errorText = await response.text()
      console.error('Webhook error response:', errorText)
      return NextResponse.json(
        { success: false, message: `Failed to send data to webhook. Status: ${response.status}` },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in webhook API route:', error)
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
} 