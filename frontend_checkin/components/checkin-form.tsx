"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Smile, Briefcase, Users, Heart } from 'lucide-react'

type CheckinFormProps = {
  onSubmit: (data: {
    personal: number
    work: number
    family: number
    friends: number
  }) => void
}

const lifeAreas = [
  { key: "personal", label: "Personal", icon: Smile, color: "text-chart-1" },
  { key: "work", label: "Work", icon: Briefcase, color: "text-chart-2" },
  { key: "family", label: "Family", icon: Heart, color: "text-chart-3" },
  { key: "friends", label: "Friends", icon: Users, color: "text-chart-4" },
] as const

export function CheckinForm({ onSubmit }: CheckinFormProps) {
  const [values, setValues] = useState({
    personal: 3,
    work: 3,
    family: 3,
    friends: 3,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
    setValues({ personal: 3, work: 3, family: 3, friends: 3 })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {lifeAreas.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon className={`h-5 w-5 ${color}`} />
            <Label htmlFor={key} className="text-base font-medium">
              {label}
            </Label>
            <span className="ml-auto text-2xl font-bold text-primary">
              {values[key]}
            </span>
          </div>
          <Slider
            id={key}
            min={1}
            max={5}
            step={1}
            value={[values[key]]}
            onValueChange={([value]) =>
              setValues((prev) => ({ ...prev, [key]: value }))
            }
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      ))}

      <Button type="submit" size="lg" className="w-full text-lg">
        Save Check-in
      </Button>
    </form>
  )
}
