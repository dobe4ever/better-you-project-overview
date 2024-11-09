'use client'

import React, { useState } from 'react'
import { Plus, Code, Github, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeploymentCard } from '@/components/DeploymentCard'
import { CardForm } from '@/components/CardForm'
import { Deployment } from '@/types/Deployment'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const devLinks = [
  {
    name: 'Better You Everyday App',
    vercel: 'https://vercel.com/dobe4evers-projects/better-you-everyday-app',
    stackblitz: 'https://stackblitz.com/~/github.com/dobe4ever/better-you-everyday-app',
    github: 'https://github.com/dobe4ever/better-you-everyday-app'
  },
  {
    name: 'Better You Project Overview',
    vercel: 'https://vercel.com/dobe4evers-projects/better-you-project-overview',
    stackblitz: 'https://stackblitz.com/~/github.com/dobe4ever/better-you-project-overview',
    github: 'https://github.com/dobe4ever/better-you-project-overview'
  }
]

export default function DeploymentDashboard() {
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: '1',
      title: "Main App",
      status: "🟢",
      previewUrl: "https://betteryoueveryday.vercel.app/",
      previewImage: "https://i.ibb.co/Gs1VTpj/image.png",
      timestamp: "2023-10-27T11:06:38.000Z",
      comments: [
        {
          text: "Latest production build",
          timestamp: "2023-10-27"
        }
      ]
    },
    {
      id: '2',
      title: "New Home Page",
      status: "🟡",
      previewUrl: "https://better-you-app-nextjs.vercel.app/",
      previewImage: "https://i.ibb.co/JmvrN4H/image.png",
      timestamp: "2023-11-10",
      comments: []
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddCard = (formData: Omit<Deployment, 'id' | 'timestamp' | 'comments'>) => {
    const newDeployment: Deployment = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      comments: []
    }
    setDeployments([...deployments, newDeployment])
    setShowForm(false)
  }

  const handleEditCard = (id: string) => {
    setEditingId(id)
  }

  const handleUpdateCard = (formData: Omit<Deployment, 'id' | 'timestamp' | 'comments'>) => {
    const updatedDeployments = deployments.map(deployment => 
      deployment.id === editingId 
        ? { ...deployment, ...formData, timestamp: new Date().toISOString() }
        : deployment
    )
    setDeployments(updatedDeployments)
    setEditingId(null)
  }

  const handleDeleteCard = (id: string) => {
    if (window.confirm('Are you sure you want to delete this deployment?')) {
      const updatedDeployments = deployments.filter(deployment => deployment.id !== id)
      setDeployments(updatedDeployments)
    }
  }

  const handleAddComment = (id: string, comment: string) => {
    const updatedDeployments = deployments.map(deployment => 
      deployment.id === id 
        ? { 
            ...deployment, 
            comments: [
              ...deployment.comments, 
              { text: comment, timestamp: new Date().toISOString() }
            ]
          }
        : deployment
    )
    setDeployments(updatedDeployments)
  }

  const mainApp = deployments.slice(0, 1)
  const branches = deployments.slice(1)

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Deployment Previews</h1>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Code className="mr-2 h-4 w-4" />
                Dev Links
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {devLinks.map((project, index) => (
                <React.Fragment key={index}>
                  <DropdownMenuLabel>{project.name}</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <a href={project.vercel} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Rocket className="mr-2 h-4 w-4" />
                      <span>Vercel</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={project.stackblitz} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      <span>StackBlitz</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Github className="mr-2 h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  </DropdownMenuItem>
                  {index < devLinks.length - 1 && <DropdownMenuSeparator />}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-6rem)] pr-4">
        {showForm && (
          <CardForm
            onSubmit={handleAddCard}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Main App Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Main App</h2>
          {mainApp.map((deployment) => (
            editingId === deployment.id ? (
              <CardForm
                key={deployment.id}
                deployment={deployment}
                onSubmit={handleUpdateCard}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <DeploymentCard
                key={deployment.id}
                {...deployment}
                onEdit={() => handleEditCard(deployment.id)}
                onDelete={() => handleDeleteCard(deployment.id)}
                onAddComment={(comment) => handleAddComment(deployment.id, comment)}
              />
            )
          ))}
        </div>

        {/* Active Branches Section */}
        <h2 className="text-lg font-semibold mb-2">Active Branches</h2>
        <div className="space-y-4">
          {branches.map((deployment) => (
            editingId === deployment.id ? (
              <CardForm
                key={deployment.id}
                deployment={deployment}
                onSubmit={handleUpdateCard}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <DeploymentCard
                key={deployment.id}
                {...deployment}
                onEdit={() => handleEditCard(deployment.id)}
                onDelete={() => handleDeleteCard(deployment.id)}
                onAddComment={(comment) => handleAddComment(deployment.id, comment)}
              />
            )
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
