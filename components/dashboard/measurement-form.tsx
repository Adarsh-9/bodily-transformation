"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MeasurementFormProps {
  user: any
  onUpdate: (user: any) => void
}

export function MeasurementForm({ user, onUpdate }: MeasurementFormProps) {
  const [formData, setFormData] = useState({
    weight: "",
    waist: "",
    chest: "",
    bicep: "",
    thigh: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const measurement = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      id: Date.now(),
    }

    const updatedUser = {
      ...user,
      measurements: [...(user.measurements || []), measurement],
    }

    onUpdate(updatedUser)
    setFormData({ weight: "", waist: "", chest: "", bicep: "", thigh: "", notes: "" })
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Log Measurements</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Weight (lbs)</label>
              <Input
                type="number"
                step="0.1"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="175"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Waist (in)</label>
              <Input
                type="number"
                step="0.1"
                name="waist"
                value={formData.waist}
                onChange={handleChange}
                placeholder="32"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Chest (in)</label>
              <Input
                type="number"
                step="0.1"
                name="chest"
                value={formData.chest}
                onChange={handleChange}
                placeholder="40"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Bicep (in)</label>
              <Input
                type="number"
                step="0.1"
                name="bicep"
                value={formData.bicep}
                onChange={handleChange}
                placeholder="14"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Thigh (in)</label>
              <Input
                type="number"
                step="0.1"
                name="thigh"
                value={formData.thigh}
                onChange={handleChange}
                placeholder="24"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="How did you feel? Any diet or exercise changes?"
              className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 text-sm"
            />
          </div>
          <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold">
            Save Measurement
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
