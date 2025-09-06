"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalPatients: 1247,
      activeSamples: 89,
      pendingResults: 23,
      completedTests: 156,
      dailyRevenue: 12750,
      urgentCases: 5
    },
    recentActivity: [
      { id: 1, type: "sample_collected", patient: "John Doe", test: "Complete Blood Count", time: "10 minutes ago", status: "processing" },
      { id: 2, type: "result_ready", patient: "Jane Smith", test: "Liver Function Test", time: "25 minutes ago", status: "ready" },
      { id: 3, type: "patient_registered", patient: "Bob Johnson", test: "Lipid Profile", time: "1 hour ago", status: "pending" },
      { id: 4, type: "result_approved", patient: "Alice Brown", test: "Thyroid Profile", time: "2 hours ago", status: "approved" },
      { id: 5, type: "sample_collected", patient: "Charlie Wilson", test: "Diabetes Panel", time: "3 hours ago", status: "processing" }
    ],
    todaySchedule: {
      morning: 12,
      afternoon: 18,
      evening: 8
    }
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening in your lab today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Generate Report</Button>
          <Button>Quick Actions</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value={dashboardData.stats.totalPatients.toLocaleString()}
          change="+12.5%"
          trend="up"
          icon="users"
        />
        <StatsCard
          title="Active Samples"
          value={dashboardData.stats.activeSamples.toString()}
          change="+5.3%"
          trend="up"
          icon="samples"
        />
        <StatsCard
          title="Pending Results"
          value={dashboardData.stats.pendingResults.toString()}
          change="-8.2%"
          trend="down"
          icon="pending"
          urgent={dashboardData.stats.urgentCases > 0}
        />
        <StatsCard
          title="Daily Revenue"
          value={`$${dashboardData.stats.dailyRevenue.toLocaleString()}`}
          change="+15.8%"
          trend="up"
          icon="revenue"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity activities={dashboardData.recentActivity} />
        </div>

        {/* Right Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Morning (8AM - 12PM)</span>
                <Badge variant="secondary">{dashboardData.todaySchedule.morning} tests</Badge>
              </div>
              <Progress value={(dashboardData.todaySchedule.morning / 30) * 100} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Afternoon (12PM - 6PM)</span>
                <Badge variant="secondary">{dashboardData.todaySchedule.afternoon} tests</Badge>
              </div>
              <Progress value={(dashboardData.todaySchedule.afternoon / 30) * 100} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Evening (6PM - 10PM)</span>
                <Badge variant="secondary">{dashboardData.todaySchedule.evening} tests</Badge>
              </div>
              <Progress value={(dashboardData.todaySchedule.evening / 30) * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Lab Capacity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lab Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Current Usage</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-gray-500">
                  38 of 48 workstations active
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts Section */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Urgent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">5 Critical Results Pending Approval</p>
                <p className="text-sm text-red-600">Require immediate attention from pathologist</p>
              </div>
              <Button size="sm" variant="destructive">
                Review Now
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Equipment Calibration Due</p>
                <p className="text-sm text-yellow-600">Hematology analyzer needs calibration</p>
              </div>
              <Button size="sm" variant="outline">
                Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}