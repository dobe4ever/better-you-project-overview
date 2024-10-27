'use client'

import React, { useState } from 'react'
import { ExternalLink, Github, MessageSquare, Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface Deployment {
  id: string
  title: string
  status: string
  previewUrl: string
  githubUrl: string
  previewImage: string
  timestamp: string
  comments: Array<{
    text: string
    timestamp: string
  }>
}

const DeploymentCard: React.FC<Deployment & {
  onEdit: () => void
  onDelete: () => void
  onAddComment: (comment: string) => void
}> = ({ 
  title, 
  status, 
  previewUrl, 
  githubUrl, 
  previewImage, 
  timestamp, 
  comments = [],
  onEdit,
  onDelete,
  onAddComment
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newComment, setNewComment] = useState('')

  const formattedDate = new Date(timestamp).toLocaleString()

  return (
    <div className="w-full mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div 
            className="flex items-center flex-grow space-x-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <img 
                src={previewImage} 
                alt={`Preview of ${title}`}
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{status}</span>
                <h3 className="text-lg font-medium">{title}</h3>
              </div>
              <p className="text-sm text-gray-500">Last updated: {formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Visit
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 transition-colors"
            >
              <Github className="w-3 h-3 mr-1" />
              GitHub
            </a>
            <button
              onClick={onEdit}
              className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {isExpanded ? 
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            }
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="relative w-full h-0 pb-[56.25%] mb-4">
            <img 
              src={previewImage} 
              alt={`Full preview of ${title}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

          <div className="mt-4">
            <h3 className="flex items-center text-lg font-medium mb-3">
              <MessageSquare className="w-5 h-5 mr-2" />
              Comments
            </h3>
            <div className="space-y-3">
              {comments.map((comment, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <div className="text-sm text-gray-500 mb-1">
                    {new Date(comment.timestamp).toLocaleString()}
                  </div>
                  <div className="text-gray-700">{comment.text}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <button
                onClick={() => {
                  if (newComment.trim()) {
                    onAddComment(newComment.trim())
                    setNewComment('')
                  }
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const CardForm: React.FC<{
  deployment?: Omit<Deployment, 'id' | 'timestamp' | 'comments'>
  onSubmit: (formData: Omit<Deployment, 'id' | 'timestamp' | 'comments'>) => void
  onCancel: () => void
}> = ({ deployment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: deployment?.title || '',
    status: deployment?.status || '🟢',
    previewUrl: deployment?.previewUrl || '',
    githubUrl: deployment?.githubUrl || '',
    previewImage: deployment?.previewImage || 'https://i.ibb.co/Gs1VTpj/image.png',
  })

  return (
    <div className="w-full mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{deployment ? 'Edit Deployment' : 'Add New Deployment'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="🟢">🟢 Live</option>
              <option value="🟡">🟡 In Progress</option>
              <option value="🔴">🔴 Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preview URL</label>
            <input
              type="url"
              value={formData.previewUrl}
              onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preview Image URL</label>
            <input
              type="url"
              value={formData.previewImage}
              onChange={(e) => setFormData({ ...formData, previewImage: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

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
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Deployment
        </button>
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

      {/* 
 Active Branches Section */}
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