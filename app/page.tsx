'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeploymentCard } from '@/components/DeploymentCard'
import { CardForm } from '@/components/CardForm'
import { Deployment } from '@/types/Deployment'

export default function DeploymentDashboard() {
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: '1',
      title: "Main App",
      status: "🟢",
      previewUrl: "https://betteryoueveryday.vercel.app/",
      githubUrl: "#",
      previewImage: "https://i.ibb.co/Gs1VTpj/image.png",
      timestamp: "2023-10-27T11:06:38.000Z",
      comments: [
        {
          text: "Latest production build",
          timestamp: "2023-10-27T11:06:38.000Z"
        }
      ]
    },
    {
      id: '2',
      title: "New header design (in progress)",
      status: "🟡",
      previewUrl: "https://vitejs-node-ts-tailwind-better-y-git-30f03f-dobe4evers-projects.vercel.app/",
      githubUrl: "#",
      previewImage: "https://i.ibb.co/JmvrN4H/image.png",
      timestamp: "2023-10-27T11:06:38.000Z",
      comments: []
    },
    {
      id: '3',
      title: "Search box header (old)",
      status: "🔴",
      previewUrl: "https://better-you-everyday-k9qarfpjo-dobe4evers-projects.vercel.app/",
      githubUrl: "#",
      previewImage: "https://i.ibb.co/C9SWMVy/image.png",
      timestamp: "2023-10-27T11:06:38.000Z",
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Deployment Previews</h1>
        <Button onClick={() => 
         setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Deployment
        </Button>
      </div>

      {showForm && (
        <CardForm
          onSubmit={handleAddCard}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Main App Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Main App</h2>
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
      <h2 className="text-xl font-semibold mb-4">Active Branches</h2>
      <div className="space-y-6">
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
    </div>
  )
}