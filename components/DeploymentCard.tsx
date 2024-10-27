import React, { useState } from 'react'
import { ExternalLink, MessageSquare, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Deployment } from '@/types/Deployment'
import { ScrollArea } from '@/components/ui/scroll-area'

interface DeploymentCardProps extends Deployment {
  onEdit: () => void
  onDelete: () => void
  onAddComment: (comment: string) => void
}

export const DeploymentCard: React.FC<DeploymentCardProps> = ({ 
  title, 
  status, 
  previewUrl, 
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
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{status}</span>
          <div>
            <h3 className="text-sm font-semibold leading-none">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex items-center justify-between mb-2">
          <Button asChild variant="outline" size="sm" className="h-8">
            <a href={previewUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Preview
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">{isExpanded ? 'Hide details' : 'Show details'}</span>
          </Button>
        </div>
        {isExpanded && (
          <div className="mt-2 space-y-2">
            <div className="relative aspect-video w-full">
              <img 
                src={previewImage} 
                alt={`Full preview of ${title}`}
                className="rounded-md object-cover w-full h-full"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium flex items-center mb-2">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </h4>
              <ScrollArea className="h-32 rounded-md border p-2">
                <div className="space-y-2">
                  {comments.map((comment, index) => (
                    <div key={index} className="text-sm">
                      <p className="text-muted-foreground text-xs">{new Date(comment.timestamp).toLocaleString()}</p>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="mb-2 text-sm"
                  rows={2}
                />
                <Button
                  onClick={() => {
                    if (newComment.trim()) {
                      onAddComment(newComment.trim())
                      setNewComment('')
                    }
                  }}
                  size="sm"
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