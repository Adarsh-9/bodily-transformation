"use client"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  user: any
  onLogout: () => void
  onProfileClick?: () => void
}

export function Header({ user, onLogout, onProfileClick }: HeaderProps) {
  const measurementCount = user.measurements?.length || 0
  const transformationCount = user.transformations?.length || 0

  return (
    <header className="bg-slate-800/50 border-b border-slate-700 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">BODILY TRANSFORMATION</h1>
          <p className="text-gray-400">Welcome back, {user.name}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">{measurementCount}</div>
              <div className="text-xs text-gray-400">Measurements</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-400">{transformationCount}</div>
              <div className="text-xs text-gray-400">Transformations</div>
            </div>
          </div>

          <Button onClick={onProfileClick} className="bg-cyan-500 hover:bg-cyan-600 text-white">
            Profile
          </Button>
          <Button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
