import React, { useState } from 'react'
import { ExternalLink, Github, MessageSquare, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Deployment } from '@/types/Deployment'

interface DeploymentCardProps extends Deployment {
  onEdit: () => void
  onDelete: () => void
  onAddComment: (comment: string) => void
}

export const DeploymentCard: React.FC<DeploymentCardProps> = ({ 
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
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{status}</span>
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="relative w-16 h-16 flex-shrink-0">
              <img 
                src={previewImage} 
                alt={`Preview of ${title}`}
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last updated: {formattedDate}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button asChild variant="default" size="sm">
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start p-0 font-normal"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="mr-2 h-4 w-4" />
          ) : (
            <ChevronDown className="mr-2 h-4 w-4" />
          )}
          {isExpanded ? 'Hide details' : 'Show details'}
        </Button>
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="relative aspect-video w-full">
              <img 
                src={previewImage} 
                alt={`Full preview of ${title}`}
                className="absolute inset-0 w-full h-full object-contain rounded-md"
              />
            </div>
            <div>
              <h3 className="flex items-center text-lg font-medium mb-3">
                <MessageSquare className="mr-2 h-5 w-5" />
                Comments
              </h3>
              <div className="space-y-3">
                {comments.map((comment, index) => (
                  <div key={index} className="p-3 bg-muted rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">
                      {new Date(comment.timestamp).toLocaleString()}
                    </div>
                    <div>{comment.text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="mb-2"
                />
                <Button
                  onClick={() => {
                    if (newComment.trim()) {
                      onAddComment(newComment.trim())
                      setNewComment('')
                    }
                  }}
                >
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}