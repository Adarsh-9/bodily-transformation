"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Workout {
  id: string
  name: string
  date: string
  duration: number
  exercises: string
  notes: string
}

interface WorkoutsProps {
  user: any
  onUpdate: (updatedUser: any) => void
}

export function Workouts({ user, onUpdate }: WorkoutsProps) {
  const [workouts, setWorkouts] = useState<Workout[]>(user.workouts || [])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    exercises: "",
    notes: "",
  })

  const handleAddWorkout = () => {
    if (!formData.name || !formData.duration) {
      alert("Please fill in all required fields")
      return
    }

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: formData.name,
      date: new Date().toISOString().split("T")[0],
      duration: Number.parseInt(formData.duration),
      exercises: formData.exercises,
      notes: formData.notes,
    }

    const updatedWorkouts = [newWorkout, ...workouts]
    setWorkouts(updatedWorkouts)

    const updatedUser = {
      ...user,
      workouts: updatedWorkouts,
    }
    onUpdate(updatedUser)

    setFormData({ name: "", duration: "", exercises: "", notes: "" })
    setShowForm(false)
  }

  const handleDeleteWorkout = (id: string) => {
    const updatedWorkouts = workouts.filter((w) => w.id !== id)
    setWorkouts(updatedWorkouts)

    const updatedUser = {
      ...user,
      workouts: updatedWorkouts,
    }
    onUpdate(updatedUser)
  }

  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0)
  const avgDuration = workouts.length > 0 ? Math.round(totalMinutes / workouts.length) : 0

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{workouts.length}</div>
              <div className="text-sm text-gray-400">Total Workouts</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{totalMinutes}</div>
              <div className="text-sm text-gray-400">Total Minutes</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{avgDuration}</div>
              <div className="text-sm text-gray-400">Avg Duration (min)</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-400">Add Workout</CardTitle>
              <CardDescription className="text-gray-400">Log your exercise session</CardDescription>
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="bg-cyan-500 hover:bg-cyan-600">
                New Workout
              </Button>
            )}
          </div>
        </CardHeader>
        {showForm && (
          <CardContent className="space-y-4 border-t border-slate-700 pt-6">
            <div>
              <label className="text-sm font-medium text-gray-300">Workout Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Upper Body Push"
                className="mt-1 bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Duration (minutes)</label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="45"
                  className="mt-1 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Exercises (comma separated)</label>
              <Input
                value={formData.exercises}
                onChange={(e) => setFormData({ ...formData, exercises: e.target.value })}
                placeholder="Bench press, Squats, Deadlifts"
                className="mt-1 bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="How did you feel? Any adjustments?"
                rows={3}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddWorkout} className="bg-green-600 hover:bg-green-700">
                Save Workout
              </Button>
              <Button onClick={() => setShowForm(false)} className="bg-slate-600 hover:bg-slate-500">
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Recent Workouts</h3>
        {workouts.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-center text-gray-400">No workouts logged yet. Start by adding your first workout!</p>
            </CardContent>
          </Card>
        ) : (
          workouts.map((workout) => (
            <Card key={workout.id} className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{workout.name}</h4>
                    <p className="text-sm text-gray-400">
                      {workout.date} · {workout.duration} minutes
                    </p>
                    {workout.exercises && (
                      <p className="text-sm text-gray-300 mt-2">
                        <span className="font-medium">Exercises:</span> {workout.exercises}
                      </p>
                    )}
                    {workout.notes && <p className="text-sm text-gray-400 mt-1">{workout.notes}</p>}
                  </div>
                  <Button
                    onClick={() => handleDeleteWorkout(workout.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
