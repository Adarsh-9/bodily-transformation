"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AdminPanelProps {
  user: any
}

export function AdminPanel({ user }: AdminPanelProps) {
  const [showStats, setShowStats] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const allUsers = JSON.parse(localStorage.getItem("fitnessUsers") || "[]")
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate global stats
  const totalUsers = allUsers.length
  const totalMeasurements = allUsers.reduce((sum, u) => sum + (u.measurements?.length || 0), 0)
  const totalTransformations = allUsers.reduce((sum, u) => sum + (u.transformations?.length || 0), 0)

  const avgMeasurementsPerUser = totalUsers > 0 ? (totalMeasurements / totalUsers).toFixed(1) : 0
  const avgTransformationsPerUser = totalUsers > 0 ? (totalTransformations / totalUsers).toFixed(1) : 0

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{totalUsers}</div>
              <p className="text-xs text-gray-500 mt-2">registered members</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{totalMeasurements}</div>
              <p className="text-xs text-gray-500 mt-2">tracked globally</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{avgMeasurementsPerUser}</div>
              <p className="text-xs text-gray-500 mt-2">per user</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Transformations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{totalTransformations}</div>
              <p className="text-xs text-gray-500 mt-2">shared globally</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Management */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">User Management</CardTitle>
            <Button
              onClick={() => setShowStats(!showStats)}
              className="bg-slate-700 hover:bg-slate-600 text-white text-sm"
            >
              {showStats ? "Hide Stats" : "Show Stats"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
            />

            {filteredUsers.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No users found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-slate-700">
                    <tr>
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Email</th>
                      <th className="text-left py-3 px-2">Measurements</th>
                      <th className="text-left py-3 px-2">Transformations</th>
                      <th className="text-left py-3 px-2">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-700/30 transition">
                        <td className="py-3 px-2 text-white font-medium">{u.name}</td>
                        <td className="py-3 px-2 text-gray-300">{u.email}</td>
                        <td className="py-3 px-2 text-cyan-400 font-semibold">{u.measurements?.length || 0}</td>
                        <td className="py-3 px-2 text-cyan-400 font-semibold">{u.transformations?.length || 0}</td>
                        <td className="py-3 px-2 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-300 mb-3">Most Measurements Logged</h4>
              <div className="space-y-2">
                {allUsers
                  .sort((a, b) => (b.measurements?.length || 0) - (a.measurements?.length || 0))
                  .slice(0, 5)
                  .map((u, idx) => (
                    <div key={u.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">
                        {idx + 1}. {u.name}
                      </span>
                      <span className="text-cyan-400 font-semibold">{u.measurements?.length || 0}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-300 mb-3">Most Transformations Shared</h4>
              <div className="space-y-2">
                {allUsers
                  .sort((a, b) => (b.transformations?.length || 0) - (a.transformations?.length || 0))
                  .slice(0, 5)
                  .map((u, idx) => (
                    <div key={u.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">
                        {idx + 1}. {u.name}
                      </span>
                      <span className="text-cyan-400 font-semibold">{u.transformations?.length || 0}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
