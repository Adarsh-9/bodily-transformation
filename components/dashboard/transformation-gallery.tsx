"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface TransformationGalleryProps {
  user: any
  onUpdate: (user: any) => void
}

export function TransformationGallery({ user, onUpdate }: TransformationGalleryProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const transformation = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      id: Date.now(),
    }

    const updatedUser = {
      ...user,
      transformations: [...(user.transformations || []), transformation],
    }

    onUpdate(updatedUser)
    setFormData({ title: "", description: "", imageUrl: "" })
    setShowForm(false)
  }

  const transformations = user.transformations || []

  return (
    <div className="space-y-6">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold">
          Add Transformation
        </Button>
      ) : (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Add Transformation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., 12 Week Transformation"
                  className="bg-slate-700/50 border-slate-600 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Image URL</label>
                <Input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="bg-slate-700/50 border-slate-600 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Share your transformation story..."
                  className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 text-sm"
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white">
                  Save Transformation
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {transformations.length === 0 && !showForm ? (
          <Card className="bg-slate-800/50 border-slate-700 md:col-span-2">
            <CardContent className="pt-8 text-center">
              <p className="text-gray-400">No transformations yet. Share your first one!</p>
            </CardContent>
          </Card>
        ) : (
          transformations.map((transformation) => (
            <Card key={transformation.id} className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="aspect-square bg-slate-700/50 relative">
                {transformation.imageUrl && (
                  <img
                    src={transformation.imageUrl || "/placeholder.svg"}
                    alt={transformation.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/fitness-transformation.png"
                    }}
                  />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-white mb-2">{transformation.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{transformation.description}</p>
                <p className="text-xs text-gray-500">{transformation.date}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
