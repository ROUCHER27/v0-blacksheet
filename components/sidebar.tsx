"use client"

import { cn } from "@/lib/utils"
import {
  Home,
  Users,
  Shield,
  TrendingUp,
  DollarSign,
  History,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Settings,
  FileText,
  Database,
  Share2,
  Wallet,
  Flag,
  PieChart,
  AlertTriangle,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["blacklist"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const menuItems = [
    { id: "home", label: "首页", icon: Home },
    {
      id: "user-management",
      label: "用户管理",
      icon: Users,
      expandable: true,
      children: [],
    },
    {
      id: "application-management",
      label: "申请管理",
      icon: FileText,
      expandable: true,
      children: [],
    },
    {
      id: "review-management",
      label: "审核管理",
      icon: Shield,
      expandable: true,
      children: [],
    },
    {
      id: "trading-account-management",
      label: "Trading Account管理",
      icon: TrendingUp,
      expandable: true,
      children: [],
    },
    {
      id: "report-management",
      label: "报表管理",
      icon: BarChart3,
      expandable: true,
      children: [{ id: "trading-rebate", label: "交易返佣报表", icon: TrendingUp }],
    },
    {
      id: "rebate-settings",
      label: "返佣设置",
      icon: DollarSign,
      expandable: true,
      children: [],
    },
    {
      id: "log-management",
      label: "日志管理",
      icon: History,
      expandable: true,
      children: [],
    },
    {
      id: "fund-settings",
      label: "资金设置",
      icon: Wallet,
      expandable: true,
      children: [],
    },
    {
      id: "data-settings",
      label: "数据设置",
      icon: Database,
      expandable: true,
      children: [],
    },
    {
      id: "platform-settings",
      label: "平台设置",
      icon: Settings,
      expandable: true,
      children: [],
    },
    {
      id: "system-management",
      label: "系统管理",
      icon: Settings,
      expandable: true,
      children: [],
    },
    {
      id: "blacklist",
      label: "黑名单",
      icon: Shield,
      expandable: true,
      children: [
        { id: "risk-dashboard", label: "风控仪表盘", icon: PieChart },
        { id: "blacklist", label: "黑名单管理", icon: Shield },
        { id: "user-risk", label: "用户风控档案", icon: AlertTriangle },
      ],
    },
    {
      id: "banner-management",
      label: "Banner管理",
      icon: Flag,
      expandable: true,
      children: [],
    },
    { id: "share-links", label: "分享链接", icon: Share2 },
    {
      id: "ib-wallet-management",
      label: "IB钱包管理",
      icon: Wallet,
      expandable: true,
      children: [],
    },
    {
      id: "settings",
      label: "设置",
      icon: Settings,
      expandable: true,
      children: [],
    },
  ]

  return (
    <div className="w-64 bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white">CBCX</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.expandable) {
                  toggleSection(item.id)
                } else {
                  onModuleChange(item.id)
                }
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 text-left text-sm hover:bg-gray-800 transition-colors",
                activeModule === item.id && "bg-blue-600 text-white",
                item.id === "home" && activeModule === "home" && "bg-blue-600 text-white",
                item.id === "platform-settings" && "bg-gray-700", // 平台设置特殊高亮
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              {item.expandable &&
                (expandedSections.includes(item.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                ))}
            </button>

            {item.expandable && expandedSections.includes(item.id) && item.children && (
              <div className="ml-4 bg-gray-900">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => onModuleChange(child.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-700 transition-colors",
                      activeModule === child.id && "bg-blue-600 text-white",
                    )}
                  >
                    <child.icon className="h-4 w-4" />
                    <span>{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
