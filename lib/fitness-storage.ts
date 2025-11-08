interface FitnessDetails {
  // Body Metrics
  height?: number // in cm
  currentWeight?: number // in kg
  targetWeight?: number // in kg
  age?: number
  gender?: "male" | "female" | "other"

  // Fitness Preferences
  fitnessGoal?: string
  experience?: "beginner" | "intermediate" | "advanced"
  preferredWorkoutTime?: "morning" | "afternoon" | "evening" | "night"
  workoutFrequency?: number // days per week (0-7)

  // Health & Activity
  activityLevel?: "sedentary" | "lightly_active" | "moderately_active" | "very_active" | "extremely_active"
  dietaryPreference?: string
  injuries?: string
  medicalConditions?: string
  maxBudget?: number // for gym/equipment
  equipmentAvailable?: string[]

  // Timestamps
  lastUpdated?: string
}

// Body Metrics Functions
export function calculateBMI(weight: number, height: number): number {
  if (!weight || !height) return 0
  return Math.round((weight / (height * height)) * 10000) / 100
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal weight"
  if (bmi < 30) return "Overweight"
  return "Obese"
}

export function getWeightToLose(current: number, target: number): number {
  if (!current || !target) return 0
  return Math.max(0, current - target)
}

export function getWeightProgress(current: number, target: number, startWeight: number): number {
  if (!current || !target || !startWeight) return 0
  const totalToLose = startWeight - target
  const alreadyLost = startWeight - current
  if (totalToLose === 0) return 100
  return Math.min(100, Math.round((alreadyLost / totalToLose) * 100))
}

// Fitness Preferences Functions
export function getCalorieRecommendation(
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: string,
): number {
  if (!weight || !height || !age) return 0

  // Harris-Benedict equation for BMR (Basal Metabolic Rate)
  let bmr = 0
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
  }

  // Activity level multipliers
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9,
  }

  const multiplier = activityMultipliers[activityLevel] || 1.55
  return Math.round(bmr * multiplier)
}

export function getExperienceLevelDescription(level: string): string {
  const descriptions: Record<string, string> = {
    beginner: "New to fitness, just starting your journey",
    intermediate: "Have some experience with exercise routines",
    advanced: "Experienced with structured training programs",
  }
  return descriptions[level] || "Not specified"
}

export function getWorkoutTimeDescription(time: string): string {
  const descriptions: Record<string, string> = {
    morning: "Early morning sessions (5-9 AM)",
    afternoon: "Afternoon sessions (12-4 PM)",
    evening: "Evening sessions (4-7 PM)",
    night: "Late night sessions (7+ PM)",
  }
  return descriptions[time] || "Not specified"
}

// Health & Activity Functions
export function getActivityLevelDescription(level: string): string {
  const descriptions: Record<string, string> = {
    sedentary: "Little or no exercise",
    lightly_active: "Light exercise 1-3 days per week",
    moderately_active: "Moderate exercise 3-5 days per week",
    very_active: "Very active 6-7 days per week",
    extremely_active: "Extremely active or twice per day exercise",
  }
  return descriptions[level] || "Not specified"
}

export function calculateMacroRecommendation(
  calories: number,
  goal: string,
): { protein: number; carbs: number; fats: number } {
  let proteinPercent = 30
  let carbsPercent = 40
  let fatsPercent = 30

  if (goal.toLowerCase().includes("muscle") || goal.toLowerCase().includes("build")) {
    proteinPercent = 35
    carbsPercent = 40
    fatsPercent = 25
  } else if (goal.toLowerCase().includes("weight") || goal.toLowerCase().includes("lose")) {
    proteinPercent = 35
    carbsPercent = 35
    fatsPercent = 30
  }

  return {
    protein: Math.round((calories * proteinPercent) / 100 / 4), // 4 cal per gram
    carbs: Math.round((calories * carbsPercent) / 100 / 4),
    fats: Math.round((calories * fatsPercent) / 100 / 9), // 9 cal per gram
  }
}

// Core Storage Functions
export function getFitnessDetails(userId: number): FitnessDetails {
  const users = JSON.parse(localStorage.getItem("fitnessUsers") || "[]")
  const user = users.find((u: any) => u.id === userId)
  return user?.fitnessDetails || {}
}

export function saveFitnessDetails(userId: number, details: FitnessDetails): void {
  const users = JSON.parse(localStorage.getItem("fitnessUsers") || "[]")
  const userIndex = users.findIndex((u: any) => u.id === userId)

  if (userIndex !== -1) {
    users[userIndex].fitnessDetails = {
      ...users[userIndex].fitnessDetails,
      ...details,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem("fitnessUsers", JSON.stringify(users))

    const currentUser = JSON.parse(localStorage.getItem("fitnessUser") || "{}")
    if (currentUser.id === userId) {
      currentUser.fitnessDetails = users[userIndex].fitnessDetails
      localStorage.setItem("fitnessUser", JSON.stringify(currentUser))
    }
  }
}

// Validation Functions
export function validateFitnessDetails(details: FitnessDetails): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (details.height && (details.height < 50 || details.height > 300)) {
    errors.push("Height must be between 50 and 300 cm")
  }

  if (details.currentWeight && (details.currentWeight < 10 || details.currentWeight > 500)) {
    errors.push("Current weight must be between 10 and 500 kg")
  }

  if (details.targetWeight && (details.targetWeight < 10 || details.targetWeight > 500)) {
    errors.push("Target weight must be between 10 and 500 kg")
  }

  if (details.age && (details.age < 8 || details.age > 120)) {
    errors.push("Age must be between 8 and 120")
  }

  if (details.workoutFrequency && (details.workoutFrequency < 0 || details.workoutFrequency > 7)) {
    errors.push("Workout frequency must be between 0 and 7 days per week")
  }

  if (details.maxBudget && details.maxBudget < 0) {
    errors.push("Budget cannot be negative")
  }

  if (details.currentWeight && details.targetWeight && details.currentWeight <= details.targetWeight) {
    errors.push("Current weight should be greater than target weight for weight loss goals")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Summary/Dashboard Functions
export function generateFitnessSummary(details: FitnessDetails): string[] {
  const summary: string[] = []

  if (details.fitnessGoal) {
    summary.push(`Goal: ${details.fitnessGoal}`)
  }

  if (details.age && details.currentWeight && details.height) {
    const bmi = calculateBMI(details.currentWeight, details.height)
    if (bmi > 0) {
      summary.push(`BMI: ${bmi} (${getBMICategory(bmi)})`)
    }
  }

  if (details.experience) {
    summary.push(`Level: ${getExperienceLevelDescription(details.experience)}`)
  }

  if (details.preferredWorkoutTime) {
    summary.push(`Prefers: ${getWorkoutTimeDescription(details.preferredWorkoutTime)}`)
  }

  if (details.workoutFrequency) {
    summary.push(`${details.workoutFrequency} workouts per week`)
  }

  if (details.injuries) {
    summary.push(`Restrictions: ${details.injuries}`)
  }

  return summary
}
