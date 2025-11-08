"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("fitnessUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (email, password) => {
    // Simulate login
    const users = JSON.parse(localStorage.getItem("fitnessUsers") || "[]")
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("fitnessUser", JSON.stringify(foundUser))
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleRegister = (email, password, name) => {
    // Simulate registration
    const users = JSON.parse(localStorage.getItem("fitnessUsers") || "[]")
    const userExists = users.find((u) => u.email === email)

    if (userExists) {
      alert("User already exists")
      return
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
      measurements: [],
      transformations: [],
      workouts: [],
      bio: "",
      fitnessGoal: "",
      experience: "beginner",
      fitnessDetails: {
        height: 0,
        currentWeight: 0,
        targetWeight: 0,
        age: 0,
        gender: "male",
        activityLevel: "moderately_active",
        dietaryPreference: "",
        injuries: "",
        medicalConditions: "",
        preferredWorkoutTime: "morning",
        workoutFrequency: 0,
        maxBudget: 0,
      },
    }

    users.push(newUser)
    localStorage.setItem("fitnessUsers", JSON.stringify(users))
    localStorage.setItem("fitnessUser", JSON.stringify(newUser))
    setUser(newUser)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("fitnessUser")
    setIsAuthenticated(false)
    setUser(null)
    setShowLogin(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showLogin ? (
          <>
            <LoginForm onSubmit={handleLogin} />
            <p className="text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onSubmit={handleRegister} />
            <p className="text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
