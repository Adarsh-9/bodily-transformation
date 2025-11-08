"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProgressOverviewProps {
  user: any
}

export function ProgressOverview({ user }: ProgressOverviewProps) {
  const measurements = user.measurements || []
  const latestMeasurement = measurements[measurements.length - 1]
  const firstMeasurement = measurements[0]

  const calculateChange = (field: string) => {
    if (!firstMeasurement || !latestMeasurement) return null
    const first = Number.parseFloat(firstMeasurement[field] || 0)
    const latest = Number.parseFloat(latestMeasurement[field] || 0)
    return latest - first
  }

  const stats = [
    { label: "Weight Change", value: calculateChange("weight"), unit: "lbs" },
    { label: "Waist Change", value: calculateChange("waist"), unit: "in" },
    { label: "Chest Change", value: calculateChange("chest"), unit: "in" },
    { label: "Measurements Logged", value: measurements.length, unit: "" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-400">
              {stat.value !== null ? (
                <>
                  {stat.value > 0 ? "+" : ""}
                  {stat.value.toFixed(1)}
                  {stat.unit}
                </>
              ) : (
                "N/A"
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stat.value > 0 ? "↑ " : stat.value < 0 ? "↓ " : ""}
              {stat.value !== null && stat.value !== 0 ? "Update available" : "Start tracking"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
