"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { BlacklistManagement } from "@/components/blacklist-management"
import { UserRiskProfile } from "@/components/user-risk-profile"
import { TradingRebateDetails } from "@/components/trading-rebate-details"
import { RiskDashboard } from "@/components/risk-dashboard"

export default function RiskManagementSystem() {
  const [activeModule, setActiveModule] = useState("home")

  const handleNavigateToUserProfile = (userId: string) => {
    console.log(`[v0] Navigating to user profile for: ${userId}`)
    setActiveModule("user-risk")
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "risk-dashboard":
        return <RiskDashboard onNavigateToUserProfile={handleNavigateToUserProfile} />
      case "blacklist":
        return <BlacklistManagement />
      case "user-risk":
        return <UserRiskProfile />
      case "trading-rebate":
        return <TradingRebateDetails />
      case "home":
        return <RiskDashboard onNavigateToUserProfile={handleNavigateToUserProfile} />
      default:
        return <RiskDashboard onNavigateToUserProfile={handleNavigateToUserProfile} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 overflow-auto">{renderActiveModule()}</main>
    </div>
  )
}
