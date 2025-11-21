"use client"

import { useState, useEffect } from "react"
import { CheckinForm } from "@/components/checkin-form"
import { CheckinTable } from "@/components/checkin-table"
import { CheckinChart } from "@/components/checkin-chart"
import { Celebration } from "@/components/celebration"
import { TrustedByFooter } from "@/components/trusted-by-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type CheckinData = {
  id: string
  timestamp: string
  personal: number
  work: number
  family: number
  friends: number
  average: number
}

export default function Home() {
  const [checkins, setCheckins] = useState<CheckinData[]>([])
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("dailyCheckins")
    if (stored) {
      setCheckins(JSON.parse(stored))
    }
  }, [])

  const addCheckin = async (data: Omit<CheckinData, "id" | "timestamp" | "average">) => {
    setIsLoading(true)
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const average = (data.personal + data.work + data.family + data.friends) / 4
    const newCheckin: CheckinData = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...data,
      average: parseFloat(average.toFixed(2)),
    }
    
    const updated = [...checkins, newCheckin]
    setCheckins(updated)
    localStorage.setItem("dailyCheckins", JSON.stringify(updated))
    setIsLoading(false)
    
    // Trigger celebration
    setShowCelebration(true)
  }

  const clearCheckins = () => {
    setCheckins([])
    localStorage.removeItem("dailyCheckins")
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      {showCelebration && (
        <Celebration onComplete={() => setShowCelebration(false)} />
      )}
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in-up [animation-delay:100ms]" style={{ animationFillMode: 'both' }}>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Daily Checkin
          </h1>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Track your emotional balance across key life areas and stay mindful of your well-being
          </p>
        </div>

        {/* Checkin Form */}
        <Card className={`border-2 animate-fade-in-up [animation-delay:300ms] transition-all duration-300 ${isLoading ? 'ring-2 ring-primary/20 shadow-lg' : ''}`} style={{ animationFillMode: 'both' }}>
          <CardHeader>
            <CardTitle className="text-2xl">How balanced do you feel today?</CardTitle>
            <CardDescription>Rate each area from 1 (low) to 5 (high)</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckinForm onSubmit={addCheckin} isLoading={isLoading} />
          </CardContent>
        </Card>

        {/* Data Visualization */}
        {mounted && checkins.length > 0 && (
          <Tabs key={checkins.length} defaultValue="chart" className="w-full animate-fade-in-up [animation-delay:100ms]" style={{ animationFillMode: 'both' }}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="chart">Trends</TabsTrigger>
              <TabsTrigger value="table">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart" className="mt-6">
              <CheckinChart data={checkins} />
            </TabsContent>
            
            <TabsContent value="table" className="mt-6">
              <CheckinTable data={checkins} onClear={clearCheckins} />
            </TabsContent>
          </Tabs>
        )}

        {mounted && checkins.length === 0 && (
          <Card className="border-dashed animate-fade-in-up [animation-delay:500ms]" style={{ animationFillMode: 'both' }}>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No check-ins yet. Complete your first check-in above to start tracking your well-being.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <TrustedByFooter />
    </main>
  )
}
