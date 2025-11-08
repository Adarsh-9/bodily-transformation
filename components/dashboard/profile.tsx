"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { saveFitnessDetails, calculateBMI, getCalorieRecommendation } from "@/lib/fitness-storage"

interface ProfileProps {
  user: any
  onUpdate: (updatedUser: any) => void
}

export function Profile({ user, onUpdate }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name || "")
  const [bio, setBio] = useState(user.bio || "")
  const [fitnessGoal, setFitnessGoal] = useState(user.fitnessGoal || "")
  const [experience, setExperience] = useState(user.experience || "beginner")

  const [height, setHeight] = useState(user.fitnessDetails?.height || "")
  const [currentWeight, setCurrentWeight] = useState(user.fitnessDetails?.currentWeight || "")
  const [targetWeight, setTargetWeight] = useState(user.fitnessDetails?.targetWeight || "")
  const [age, setAge] = useState(user.fitnessDetails?.age || "")
  const [gender, setGender] = useState(user.fitnessDetails?.gender || "male")
  const [activityLevel, setActivityLevel] = useState(user.fitnessDetails?.activityLevel || "moderately_active")
  const [dietaryPreference, setDietaryPreference] = useState(user.fitnessDetails?.dietaryPreference || "")
  const [injuries, setInjuries] = useState(user.fitnessDetails?.injuries || "")
  const [medicalConditions, setMedicalConditions] = useState(user.fitnessDetails?.medicalConditions || "")
  const [preferredWorkoutTime, setPreferredWorkoutTime] = useState(
    user.fitnessDetails?.preferredWorkoutTime || "morning",
  )
  const [workoutFrequency, setWorkoutFrequency] = useState(user.fitnessDetails?.workoutFrequency || "")
  const [maxBudget, setMaxBudget] = useState(user.fitnessDetails?.maxBudget || "")

  const bmi = calculateBMI(Number.parseFloat(currentWeight) || 0, Number.parseFloat(height) || 0)
  const calorieRecommendation = getCalorieRecommendation(
    Number.parseFloat(currentWeight) || 0,
    Number.parseFloat(height) || 0,
    Number.parseInt(age) || 0,
    gender,
    activityLevel,
  )

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      bio,
      fitnessGoal,
      experience,
    }
    onUpdate(updatedUser)

    saveFitnessDetails(user.id, {
      height: Number.parseFloat(height),
      currentWeight: Number.parseFloat(currentWeight),
      targetWeight: Number.parseFloat(targetWeight),
      age: Number.parseInt(age),
      gender,
      activityLevel,
      dietaryPreference,
      injuries,
      medicalConditions,
      preferredWorkoutTime,
      workoutFrequency: Number.parseInt(workoutFrequency),
      maxBudget: Number.parseFloat(maxBudget),
    })

    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Profile Information</CardTitle>
            <CardDescription className="text-gray-400">Manage your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="mt-1 bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Email</label>
              <Input value={user.email} disabled className="mt-1 bg-slate-700/50 border-slate-600 text-gray-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditing}
                rows={3}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 disabled:opacity-50"
              />
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-cyan-500 hover:bg-cyan-600">
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsEditing(false)} className="bg-slate-600 hover:bg-slate-500">
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Fitness Preferences</CardTitle>
            <CardDescription className="text-gray-400">Your fitness goals and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Fitness Goal</label>
              <textarea
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                disabled={!isEditing}
                rows={2}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 disabled:opacity-50"
                placeholder="e.g., Lose weight, Build muscle, Increase endurance..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                disabled={!isEditing}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 disabled:opacity-50"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Preferred Workout Time</label>
              <select
                value={preferredWorkoutTime}
                onChange={(e) => setPreferredWorkoutTime(e.target.value)}
                disabled={!isEditing}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 disabled:opacity-50"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Workout Frequency (days/week)</label>
              <Input
                type="number"
                value={workoutFrequency}
                onChange={(e) => setWorkoutFrequency(e.target.value)}
                disabled={!isEditing}
                min="0"
                max="7"
                className="mt-1 bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Body Metrics</CardTitle>
            <CardDescription className="text-gray-400">Your physical measurements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Height (cm)</label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Age</label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Current Weight (kg)</label>
                <Input
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Target Weight (kg)</label>
                <Input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditing}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 disabled:opacity-50"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="pt-4 border-t border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">BMI</span>
                <span className={`font-semibold ${bmi > 0 ? "text-cyan-400" : "text-gray-400"}`}>
                  {bmi > 0 ? bmi : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Weight to Lose</span>
                <span className={`font-semibold ${currentWeight && targetWeight ? "text-cyan-400" : "text-gray-400"}`}>
                  {currentWeight && targetWeight
                    ? `${Math.max(0, Number.parseFloat(currentWeight) - Number.parseFloat(targetWeight))} kg`
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Health & Activity</CardTitle>
            <CardDescription className="text-gray-400">Medical and activity information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Activity Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                disabled={!isEditing}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 disabled:opacity-50"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="lightly_active">Lightly Active (1-3 days/week)</option>
                <option value="moderately_active">Moderately Active (3-5 days/week)</option>
                <option value="very_active">Very Active (6-7 days/week)</option>
                <option value="extremely_active">Extremely Active (twice per day)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Dietary Preference</label>
              <Input
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., Vegetarian, Vegan, Keto..."
                className="mt-1 bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Injuries or Restrictions</label>
              <textarea
                value={injuries}
                onChange={(e) => setInjuries(e.target.value)}
                disabled={!isEditing}
                rows={2}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 disabled:opacity-50"
                placeholder="Any injuries or physical limitations..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Medical Conditions</label>
              <textarea
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)}
                disabled={!isEditing}
                rows={2}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 text-white rounded-md p-2 disabled:opacity-50"
                placeholder="Any medical conditions to consider..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Budget (optional, in local currency)</label>
              <Input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                disabled={!isEditing}
                className="mt-1 bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
              />
            </div>
            <div className="pt-4 border-t border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Calorie Recommendation</span>
                <span className={`font-semibold ${calorieRecommendation > 0 ? "text-cyan-400" : "text-gray-400"}`}>
                  {calorieRecommendation > 0 ? `${calorieRecommendation} kcal` : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 text-xs text-gray-400 flex justify-between">
        <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  )
}
