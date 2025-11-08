"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MeasurementHistoryProps {
  user: any
}

export function MeasurementHistory({ user }: MeasurementHistoryProps) {
  const measurements = user.measurements || []
  const sortedMeasurements = [...measurements].reverse()

  if (measurements.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-8 text-center">
          <p className="text-gray-400">No measurements logged yet. Start tracking your progress!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Measurement History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-slate-700">
              <tr>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Weight (lbs)</th>
                <th className="text-left py-3 px-2">Waist (in)</th>
                <th className="text-left py-3 px-2">Chest (in)</th>
                <th className="text-left py-3 px-2">Bicep (in)</th>
                <th className="text-left py-3 px-2">Thigh (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {sortedMeasurements.map((measurement) => (
                <tr key={measurement.id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3 px-2 text-white">{measurement.date}</td>
                  <td className="py-3 px-2 text-cyan-400">{measurement.weight || "-"}</td>
                  <td className="py-3 px-2 text-cyan-400">{measurement.waist || "-"}</td>
                  <td className="py-3 px-2 text-cyan-400">{measurement.chest || "-"}</td>
                  <td className="py-3 px-2 text-cyan-400">{measurement.bicep || "-"}</td>
                  <td className="py-3 px-2 text-cyan-400">{measurement.thigh || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
