"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProgressChartsProps {
  user: any
}

export function ProgressCharts({ user }: ProgressChartsProps) {
  const measurements = user.measurements || []

  if (measurements.length < 2) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-8 text-center">
          <p className="text-gray-400">Log at least 2 measurements to see progress charts</p>
        </CardContent>
      </Card>
    )
  }

  // Prepare data for weight chart
  const weightData = measurements
    .map((m) => ({
      date: m.date,
      weight: Number.parseFloat(m.weight || 0),
    }))
    .filter((d) => d.weight > 0)

  // Prepare data for body measurements comparison
  const bodyMeasurements = measurements.map((m) => ({
    date: m.date,
    waist: Number.parseFloat(m.waist || 0),
    chest: Number.parseFloat(m.chest || 0),
    bicep: Number.parseFloat(m.bicep || 0),
    thigh: Number.parseFloat(m.thigh || 0),
  }))

  return (
    <div className="space-y-6">
      {weightData.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Weight Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  labelStyle={{ color: "#06b6d4" }}
                />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#06b6d4" dot={{ fill: "#06b6d4" }} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {bodyMeasurements.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Body Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bodyMeasurements}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  labelStyle={{ color: "#06b6d4" }}
                />
                <Legend />
                <Bar dataKey="waist" fill="#06b6d4" />
                <Bar dataKey="chest" fill="#10b981" />
                <Bar dataKey="bicep" fill="#f59e0b" />
                <Bar dataKey="thigh" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
