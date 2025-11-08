"use client"

import { Card, CardContent } from "@/components/ui/card"

interface InsightsProps {
  user: any
}

export function Insights({ user }: InsightsProps) {
  const measurements = user.measurements || []

  if (measurements.length < 2) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-8 text-center">
          <p className="text-gray-400">Track more measurements to get insights</p>
        </CardContent>
      </Card>
    )
  }

  const firstMeasurement = measurements[0]
  const latestMeasurement = measurements[measurements.length - 1]

  const calculateStats = () => {
    const weightChange =
      Number.parseFloat(latestMeasurement.weight || 0) - Number.parseFloat(firstMeasurement.weight || 0)
    const waistChange = Number.parseFloat(latestMeasurement.waist || 0) - Number.parseFloat(firstMeasurement.waist || 0)
    const chestChange = Number.parseFloat(latestMeasurement.chest || 0) - Number.parseFloat(firstMeasurement.chest || 0)
    const bicepChange = Number.parseFloat(latestMeasurement.bicep || 0) - Number.parseFloat(firstMeasurement.bicep || 0)
    const thighChange = Number.parseFloat(latestMeasurement.thigh || 0) - Number.parseFloat(firstMeasurement.thigh || 0)

    const daysTracking = Math.floor(
      (new Date(latestMeasurement.date).getTime() - new Date(firstMeasurement.date).getTime()) / (1000 * 60 * 60 * 24),
    )

    return {
      weightChange,
      waistChange,
      chestChange,
      bicepChange,
      thighChange,
      daysTracking,
      measurementCount: measurements.length,
    }
  }

  const stats = calculateStats()

  const insights = [
    {
      title: "Total Weight Change",
      value: `${stats.weightChange > 0 ? "+" : ""}${stats.weightChange.toFixed(1)} lbs`,
      color: stats.weightChange < 0 ? "text-green-400" : "text-red-400",
    },
    {
      title: "Waist Change",
      value: `${stats.waistChange > 0 ? "+" : ""}${stats.waistChange.toFixed(1)} in`,
      color: stats.waistChange < 0 ? "text-green-400" : "text-orange-400",
    },
    {
      title: "Chest Change",
      value: `${stats.chestChange > 0 ? "+" : ""}${stats.chestChange.toFixed(1)} in`,
      color: stats.chestChange > 0 ? "text-green-400" : "text-orange-400",
    },
    {
      title: "Bicep Change",
      value: `${stats.bicepChange > 0 ? "+" : ""}${stats.bicepChange.toFixed(1)} in`,
      color: stats.bicepChange > 0 ? "text-green-400" : "text-orange-400",
    },
    {
      title: "Tracking Duration",
      value: `${stats.daysTracking} days`,
      color: "text-cyan-400",
    },
    {
      title: "Total Measurements",
      value: `${stats.measurementCount} logged`,
      color: "text-cyan-400",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Your Progress Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <Card key={idx} className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-gray-400 text-sm mb-2">{insight.title}</p>
              <p className={`text-2xl font-bold ${insight.color}`}>{insight.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
