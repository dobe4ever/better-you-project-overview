import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Deployment } from '@/types/Deployment'

interface CardFormProps {
  deployment?: Omit<Deployment, 'id' | 'timestamp' | 'comments'>
  onSubmit: (formData: Omit<Deployment, 'id' | 'timestamp' | 'comments'>) => void
  onCancel: () => void
}

export const CardForm: React.FC<CardFormProps> = ({ deployment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: deployment?.title || '',
    status: deployment?.status || '🟢',
    previewUrl: deployment?.previewUrl || '',
    githubUrl: deployment?.githubUrl || '',
    previewImage: deployment?.previewImage || 'https://i.ibb.co/Gs1VTpj/image.png',
  })

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{deployment ? 'Edit Deployment' : 'Add New Deployment'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="title">Title</label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="status">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="🟢">🟢 Live</SelectItem>
                <SelectItem value="🟡">🟡 In Progress</SelectItem>
                <SelectItem value="🔴">🔴 Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="previewUrl">Preview URL</label>
            <Input
              id="previewUrl"
              type="url"
              value={formData.previewUrl}
              onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="githubUrl">GitHub URL</label>
            <Input
              id="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="previewImage">Preview Image URL</label>
            <Input
              id="previewImage"
              type="url"
              value={formData.previewImage}
              onChange={(e) => setFormData({ ...formData, previewImage: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSubmit(formData)}>Save</Button>
      </CardFooter>
    </Card>
  )
}