"use client"

import { useState } from "react"
import { Header } from "./header"
import { ProgressOverview } from "./progress-overview"
import { MeasurementForm } from "./measurement-form"
import { MeasurementHistory } from "./measurement-history"
import { TransformationGallery } from "./transformation-gallery"
import { AdminPanel } from "../admin/admin-panel"
import { ProgressCharts } from "./progress-charts"
import { Insights } from "./insights"
import { Profile } from "./profile"
import { Workouts } from "./workouts"

interface DashboardProps {
  user: any
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [userData, setUserData] = useState(user)

  const handleUpdateUser = (updatedUser: any) => {
    setUserData(updatedUser)
    localStorage.setItem("fitnessUser", JSON.stringify(updatedUser))
    const users = JSON.parse(localStorage.getItem("fitnessUsers") || "[]")
    const index = users.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) {
      users[index] = updatedUser
      localStorage.setItem("fitnessUsers", JSON.stringify(users))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header user={userData} onLogout={onLogout} onProfileClick={() => setActiveTab("profile")} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { id: "overview", label: "Overview" },
            { id: "insights", label: "Insights" },
            { id: "charts", label: "Charts" },
            { id: "track", label: "Track Measurements" },
            { id: "history", label: "History" },
            { id: "transformations", label: "Transformations" },
            { id: "workouts", label: "Workouts" },
            { id: "profile", label: "Profile" },
            { id: "admin", label: "Admin" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === tab.id ? "bg-cyan-500 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && <ProgressOverview user={userData} />}
          {activeTab === "insights" && <Insights user={userData} />}
          {activeTab === "charts" && <ProgressCharts user={userData} />}
          {activeTab === "track" && <MeasurementForm user={userData} onUpdate={handleUpdateUser} />}
          {activeTab === "history" && <MeasurementHistory user={userData} />}
          {activeTab === "transformations" && <TransformationGallery user={userData} onUpdate={handleUpdateUser} />}
          {activeTab === "workouts" && <Workouts user={userData} onUpdate={handleUpdateUser} />}
          {activeTab === "profile" && <Profile user={userData} onUpdate={handleUpdateUser} />}
          {activeTab === "admin" && <AdminPanel user={userData} />}
        </div>
      </div>
    </div>
  )
}
