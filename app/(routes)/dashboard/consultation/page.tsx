'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MessageCircle, 
  Upload, 
  Send, 
  FileText, 
  Image as ImageIcon,
  X,
  Download,
  Eye,
  User,
  Bot
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  attachments?: File[]
}

interface ConsultationSession {
  id: string
  title: string
  date: Date
  status: 'active' | 'completed' | 'pending'
  messages: Message[]
}

const ConsultationPage = () => {
  const [sessions, setSessions] = useState<ConsultationSession[]>([
    {
      id: '1',
      title: 'General Health Consultation',
      date: new Date(),
      status: 'active',
      messages: []
    }
  ])
  const [currentSession, setCurrentSession] = useState<ConsultationSession>(sessions[0])
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession.messages])

  const handleSendMessage = async () => {
    if (!message.trim() && uploadedFiles.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      attachments: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
    }

    // Add user message
    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, newMessage]
    }
    setCurrentSession(updatedSession)
    setMessage('')
    setUploadedFiles([])

    // Simulate bot response
    setIsTyping(true)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Thank you for your message. I\'m analyzing your information and will provide a response shortly.',
        timestamp: new Date()
      }
      
      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, botResponse]
      }
      setCurrentSession(finalSession)
      setIsTyping(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-4 h-4" />
    }
    return <FileText className="w-4 h-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const createNewSession = () => {
    const newSession: ConsultationSession = {
      id: Date.now().toString(),
      title: `Consultation ${sessions.length + 1}`,
      date: new Date(),
      status: 'active',
      messages: []
    }
    setSessions(prev => [newSession, ...prev])
    setCurrentSession(newSession)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Sessions List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Consultations</h2>
          <Button 
            onClick={createNewSession}
            className="w-full mt-3"
            variant="outline"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            New Consultation
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setCurrentSession(session)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                currentSession.id === session.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {session.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {session.date.toLocaleDateString()}
                  </p>
                </div>
                <Badge 
                  variant={session.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {session.status}
                </Badge>
              </div>
              {session.messages.length > 0 && (
                <p className="text-xs text-gray-400 mt-1 truncate">
                  {session.messages[session.messages.length - 1].content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/bot-avatar.png" />
                <AvatarFallback>
                  <Bot className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentSession.title}
                </h2>
                <p className="text-sm text-gray-500">
                  AI Health Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {currentSession.messages.length} messages
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentSession.messages.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start your consultation
              </h3>
              <p className="text-gray-500">
                Ask questions, upload reports, or describe your symptoms to get started.
              </p>
            </div>
          )}

          {currentSession.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[70%] ${
                msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <Avatar className="w-8 h-8">
                  {msg.type === 'user' ? (
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback>
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className={`rounded-lg p-3 ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  
                  {/* Attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.attachments.map((file, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 p-2 rounded ${
                            msg.type === 'user' 
                              ? 'bg-blue-700 text-white' 
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {getFileIcon(file)}
                          <span className="text-xs truncate flex-1">
                            {file.name}
                          </span>
                          <span className="text-xs opacity-70">
                            {formatFileSize(file.size)}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              const url = URL.createObjectURL(file)
                              window.open(url, '_blank')
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className={`text-xs mt-2 ${
                    msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-[70%]">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          {/* File Upload Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Attached Files ({uploadedFiles.length})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUploadedFiles([])}
                  className="h-6 px-2"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded border">
                    {getFileIcon(file)}
                    <span className="text-xs truncate flex-1">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-[60px] max-h-[120px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={handleSendMessage}
                disabled={(!message.trim() && uploadedFiles.length === 0) || isUploading}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  )
}

export default ConsultationPage 