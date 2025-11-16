"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CheckinData } from "@/app/page"

type CheckinChartProps = {
  data: CheckinData[]
}

type ChartType = "line" | "area"

export function CheckinChart({ data }: CheckinChartProps) {
  const [chartType, setChartType] = useState<ChartType>("line")

  const chartData = data.map((checkin) => ({
    date: new Date(checkin.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    Personal: checkin.personal,
    Work: checkin.work,
    Family: checkin.family,
    Friends: checkin.friends,
  }))

  const chartConfig = {
    Personal: {
      label: "Personal",
      color: "#F27446", // Peachy orange
    },
    Work: {
      label: "Work",
      color: "#FF9A6C", // Light coral
    },
    Family: {
      label: "Family",
      color: "#FFB088", // Peach
    },
    Friends: {
      label: "Friends",
      color: "#FFC5A3", // Light peach
    },
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Balance Trends</CardTitle>
            <CardDescription>
              Track how your balance across life areas changes over time
            </CardDescription>
          </div>
          <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Personal"
                  stroke={chartConfig.Personal.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Work"
                  stroke={chartConfig.Work.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Family"
                  stroke={chartConfig.Family.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Friends"
                  stroke={chartConfig.Friends.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Legend />
                <Area
                  type="natural"
                  dataKey="Personal"
                  fill={chartConfig.Personal.color}
                  fillOpacity={0.4}
                  stroke={chartConfig.Personal.color}
                  strokeWidth={2}
                />
                <Area
                  type="natural"
                  dataKey="Work"
                  fill={chartConfig.Work.color}
                  fillOpacity={0.4}
                  stroke={chartConfig.Work.color}
                  strokeWidth={2}
                />
                <Area
                  type="natural"
                  dataKey="Family"
                  fill={chartConfig.Family.color}
                  fillOpacity={0.4}
                  stroke={chartConfig.Family.color}
                  strokeWidth={2}
                />
                <Area
                  type="natural"
                  dataKey="Friends"
                  fill={chartConfig.Friends.color}
                  fillOpacity={0.4}
                  stroke={chartConfig.Friends.color}
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
