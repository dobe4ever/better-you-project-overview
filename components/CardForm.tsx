import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Deployment } from '@/types/Deployment'

interface CardFormProps {
  deployment?: Omit<Deployment, 'id' | 'timestamp' | 'comments'>
  onSubmit: (formData: Omit<Deployment, 'id' | 'timestamp' | 'comments'>) => void
  onCancel: () => 

 void
}


export const CardForm: React.FC<CardFormProps> = ({ deployment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: deployment?.title || '',
    status: deployment?.status || '🟢',
    previewUrl: deployment?.previewUrl || '',
    previewImage: deployment?.previewImage || 'https://i.ibb.co/Gs1VTpj/image.png',
  })

  return (
    <Card className="w-full mb-4">
      <CardHeader className="p-3">
        <CardTitle className="text-lg">{deployment ? 'Edit Deployment' : 'Add New Deployment'}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="status">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger id="status" className="h-8 text-sm">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="🟢">🟢 Ready</SelectItem>
              <SelectItem value="🟡">🟡 In Progress</SelectItem>
              <SelectItem value="🔴">🔴 Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="previewUrl">Preview URL</label>
          <Input
            id="previewUrl"
            type="url"
            value={formData.previewUrl}
            onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="previewImage">Preview Image URL</label>
          <Input
            id="previewImage"
            type="url"
            value={formData.previewImage}
            onChange={(e) => setFormData({ ...formData, previewImage: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
      </CardContent>
      <CardFooter className="p-3 flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" onClick={() => onSubmit(formData)}>Save</Button>
      </CardFooter>
    </Card>
  )
}