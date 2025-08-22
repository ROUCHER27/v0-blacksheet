"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Wallet,
  Activity,
  User,
  Globe,
  Lock,
  TrendingUp,
  ExternalLink,
  Clock,
  Database,
  Eye,
} from "lucide-react"

interface UserActivity {
  timestamp: string
  eventType: string
  description: string
  ipAddress: string
  location: string
  riskLevel: "low" | "medium" | "high"
  deviceInfo?: string
  userAgent?: string
}

interface RiskAnalysisReport {
  source: string
  content: string
  timestamp: string
  riskScore: number
  details: string[]
}

interface AssociatedAccount {
  userId: string
  associationType: string
  associationValue: string
  registrationTime: string
  riskLevel: string
  wallets: string[]
  lastActivity: string
  totalTransactions: number
}

interface PendingAccount {
  userId: string
  registrationTime: string
  overallRisk: "low" | "medium" | "high"
  caseStatus: "pending" | "investigating" | "resolved-fraud" | "resolved-false"
}

export function UserRiskProfile() {
  const [searchUserId, setSearchUserId] = useState("")
  const [caseStatus, setCaseStatus] = useState("pending")
  const [selectedRiskReport, setSelectedRiskReport] = useState<RiskAnalysisReport | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<AssociatedAccount | null>(null)
  const [isRiskReportOpen, setIsRiskReportOpen] = useState(false)
  const [isAccountDetailOpen, setIsAccountDetailOpen] = useState(false)
  const [selectedPendingAccount, setSelectedPendingAccount] = useState<PendingAccount | null>(null)

  const allAccounts: PendingAccount[] = [
    {
      userId: "USER12345",
      registrationTime: "2024-01-10 09:30:15",
      overallRisk: "high",
      caseStatus: "pending",
    },
    {
      userId: "USER12346",
      registrationTime: "2024-01-12 14:22:30",
      overallRisk: "high",
      caseStatus: "pending",
    },
    {
      userId: "USER12347",
      registrationTime: "2024-01-11 16:45:12",
      overallRisk: "medium",
      caseStatus: "investigating",
    },
    {
      userId: "USER12348",
      registrationTime: "2024-01-13 11:15:45",
      overallRisk: "high",
      caseStatus: "pending",
    },
    {
      userId: "USER12349",
      registrationTime: "2024-01-14 08:30:22",
      overallRisk: "medium",
      caseStatus: "pending",
    },
    {
      userId: "USER12350",
      registrationTime: "2024-01-15 10:20:30",
      overallRisk: "medium",
      caseStatus: "investigating",
    },
    {
      userId: "USER12351",
      registrationTime: "2024-01-16 15:45:12",
      overallRisk: "low",
      caseStatus: "investigating",
    },
    {
      userId: "USER12352",
      registrationTime: "2024-01-17 09:15:45",
      overallRisk: "high",
      caseStatus: "resolved-fraud",
    },
    {
      userId: "USER12353",
      registrationTime: "2024-01-18 11:30:22",
      overallRisk: "medium",
      caseStatus: "resolved-fraud",
    },
    {
      userId: "USER12354",
      registrationTime: "2024-01-19 14:20:15",
      overallRisk: "low",
      caseStatus: "resolved-false",
    },
    {
      userId: "USER12355",
      registrationTime: "2024-01-20 16:45:30",
      overallRisk: "medium",
      caseStatus: "resolved-false",
    },
  ]

  const filteredAccounts = allAccounts.filter((account) => account.caseStatus === caseStatus)

  const getStatusCount = (status: string) => {
    return allAccounts.filter((account) => account.caseStatus === status).length
  }

  const generateUserActivities = (userId: string): UserActivity[] => {
    const baseActivities = [
      {
        timestamp: "14:35:10",
        eventType: "withdrawal",
        description: `用户 ${userId} 发起提现：向一个新钱包地址 3M21...xyz 提现 5 BTC`,
        ipAddress: "1.2.3.4",
        location: "尼日利亚",
        riskLevel: "high" as const,
        deviceInfo: "Windows 10, Chrome 120.0",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      {
        timestamp: "14:32:00",
        eventType: "security",
        description: `用户 ${userId} 安全变更：成功移除了谷歌二次验证 (2FA)`,
        ipAddress: "1.2.3.4",
        location: "尼日利亚",
        riskLevel: "high" as const,
        deviceInfo: "Windows 10, Chrome 120.0",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      {
        timestamp: "14:31:05",
        eventType: "security",
        description: `用户 ${userId} 安全变更：成功修改了登录密码`,
        ipAddress: "1.2.3.4",
        location: "尼日利亚",
        riskLevel: "high" as const,
        deviceInfo: "Windows 10, Chrome 120.0",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      {
        timestamp: "14:30:15",
        eventType: "login",
        description: `用户 ${userId} 登录成功：来自一个高风险IP地址 1.2.3.4 (尼日利亚)`,
        ipAddress: "1.2.3.4",
        location: "尼日利亚",
        riskLevel: "high" as const,
        deviceInfo: "Windows 10, Chrome 120.0",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      {
        timestamp: "10:05:00",
        eventType: "login",
        description: `用户 ${userId} 登录成功：来自用户常用IP地址 133.1.1.1 (日本东京)`,
        ipAddress: "133.1.1.1",
        location: "日本东京",
        riskLevel: "low" as const,
        deviceInfo: "iPhone 15, Safari 17.0",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      },
    ]
    return baseActivities
  }

  const [userActivities, setUserActivities] = useState<UserActivity[]>(generateUserActivities("USER12345"))

  const handlePendingAccountClick = (account: PendingAccount) => {
    setSelectedPendingAccount(account)
    setUserActivities(generateUserActivities(account.userId))
  }

  const handleStatusChange = (newStatus: string) => {
    setCaseStatus(newStatus)
    setSelectedPendingAccount(null) // 清除当前选择的账号
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "login":
        return <User className="h-4 w-4" />
      case "withdrawal":
        return <TrendingUp className="h-4 w-4" />
      case "security":
        return <Lock className="h-4 w-4" />
      case "trade":
        return <Activity className="h-4 w-4" />
      case "deposit":
        return <Wallet className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge variant="destructive">高风险</Badge>
      case "medium":
        return <Badge variant="secondary">中风险</Badge>
      case "low":
        return <Badge variant="outline">低风险</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive">待处理</Badge>
      case "investigating":
        return <Badge variant="secondary">调查中</Badge>
      case "resolved-fraud":
        return <Badge variant="outline">已解决-确认欺诈</Badge>
      case "resolved-false":
        return <Badge variant="outline">已解决-虚假警报</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">用户风控档案 / 案件审查</h1>
        <div className="flex gap-2">
          <Select value={caseStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">
                <div className="flex items-center gap-2">
                  <span>待处理</span>
                  <Badge variant="destructive" className="ml-2 px-2 py-1 text-xs">
                    {getStatusCount("pending")}
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="investigating">
                <div className="flex items-center gap-2">
                  <span>调查中</span>
                  <Badge variant="secondary" className="ml-2 px-2 py-1 text-xs">
                    {getStatusCount("investigating")}
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="resolved-fraud">
                <div className="flex items-center gap-2">
                  <span>已解决-确认欺诈</span>
                  <Badge variant="outline" className="ml-2 px-2 py-1 text-xs">
                    {getStatusCount("resolved-fraud")}
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="resolved-false">
                <div className="flex items-center gap-2">
                  <span>已解决-虚假警报</span>
                  <Badge variant="outline" className="ml-2 px-2 py-1 text-xs">
                    {getStatusCount("resolved-false")}
                  </Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="输入用户ID进行查询"
                  value={searchUserId}
                  onChange={(e) => setSearchUserId(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button>查询用户</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {caseStatus === "pending" && "待处理账号列表"}
            {caseStatus === "investigating" && "调查中账号列表"}
            {caseStatus === "resolved-fraud" && "已解决-确认欺诈账号列表"}
            {caseStatus === "resolved-false" && "已解决-虚假警报账号列表"}
            <Badge variant="outline" className="ml-2">
              {filteredAccounts.length} 个账号
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">注册时间</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">整体风险</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">案件状态</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAccounts.map((account, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedPendingAccount?.userId === account.userId ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handlePendingAccountClick(account)}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-blue-600 hover:text-blue-800">{account.userId}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">{account.registrationTime}</td>
                    <td className="px-4 py-3">{getRiskBadge(account.overallRisk)}</td>
                    <td className="px-4 py-3">{getStatusBadge(account.caseStatus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Profile Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="activities">行为日志</TabsTrigger>
          <TabsTrigger value="intelligence">外部情报</TabsTrigger>
          <TabsTrigger value="associations">关联账户</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* User Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  用户基本信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">用户ID:</span>
                  <span className="text-sm font-medium">{selectedPendingAccount?.userId || "USER12345"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">注册时间:</span>
                  <span className="text-sm">{selectedPendingAccount?.registrationTime || "2024-01-10 09:30:15"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">KYC状态:</span>
                  <Badge variant="outline" className="text-green-600">
                    已验证
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  风险评估
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">整体风险:</span>
                  {getRiskBadge(selectedPendingAccount?.overallRisk || "high")}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">风险分数:</span>
                  <span className="text-sm font-medium text-red-600">85/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">最后活动:</span>
                  <span className="text-sm">2分钟前</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  案件状态
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">当前状态:</span>
                  {getStatusBadge(selectedPendingAccount?.caseStatus || "investigating")}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">分析师:</span>
                  <span className="text-sm">张三</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">创建时间:</span>
                  <span className="text-sm">1小时前</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>一键处置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="destructive" size="sm">
                  <Shield className="mr-2 h-4 w-4" />
                  加入黑名单
                </Button>
                <Button variant="outline" size="sm">
                  <Lock className="mr-2 h-4 w-4" />
                  冻结账户
                </Button>
                <Button variant="outline" size="sm">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  强制下线
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  标记为安全
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                用户行为时间线
                {selectedPendingAccount && (
                  <Badge variant="outline" className="ml-2">
                    {selectedPendingAccount.userId}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {userActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div
                          className={`p-2 rounded-full ${
                            activity.riskLevel === "high"
                              ? "bg-red-100 text-red-600"
                              : activity.riskLevel === "medium"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-green-100 text-green-600"
                          }`}
                        >
                          {getEventIcon(activity.eventType)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{activity.timestamp}</span>
                          {getRiskBadge(activity.riskLevel)}
                        </div>
                        <p className="text-sm text-gray-900 mb-2">{activity.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {activity.ipAddress}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </span>
                          {activity.deviceInfo && (
                            <span className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              {activity.deviceInfo}
                            </span>
                          )}
                          {activity.userAgent && (
                            <span className="flex items-center gap-1 col-span-2">
                              <Database className="h-3 w-3" />
                              {activity.userAgent.substring(0, 50)}...
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  钱包风险分析
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">风险评分:</span>
                  <Badge variant="destructive">92/100</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">
                      关联暗网
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      混币服务
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">该钱包地址与已知的暗网市场和混币服务有关联，存在洗钱风险。</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={() => {
                      setSelectedRiskReport(allAccounts[0] as RiskAnalysisReport)
                      setIsRiskReportOpen(true)
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    查看详细报告
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  IP风险分析
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">欺诈分数:</span>
                  <Badge variant="destructive">88/100</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">
                      VPN/代理
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      高风险地区
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">IP地址来自尼日利亚，使用VPN/代理服务，该地区欺诈活动频发。</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={() => {
                      setSelectedRiskReport(allAccounts[1] as RiskAnalysisReport)
                      setIsRiskReportOpen(true)
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    查看详细报告
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="associations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>关联账户分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">关联类型</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">关联值</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">注册时间</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">风险等级</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allAccounts.map((account, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <button
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 underline"
                            onClick={() => {
                              setSelectedAccount(account as AssociatedAccount)
                              setIsAccountDetailOpen(true)
                            }}
                          >
                            {account.userId}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-sm">{account.associationType}</td>
                        <td className="px-4 py-3 text-sm">{account.associationValue}</td>
                        <td className="px-4 py-3 text-sm">{account.registrationTime}</td>
                        <td className="px-4 py-3">{getRiskBadge(account.riskLevel)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isRiskReportOpen} onOpenChange={setIsRiskReportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              风险分析详细报告
            </DialogTitle>
          </DialogHeader>
          {selectedRiskReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">数据来源</label>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{selectedRiskReport.source}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">分析时间</label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{selectedRiskReport.timestamp}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">风险评分</label>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-lg px-3 py-1">
                    {selectedRiskReport.riskScore}/100
                  </Badge>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">详细分析内容</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {selectedRiskReport.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAccountDetailOpen} onOpenChange={setIsAccountDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              关联账户详细信息
            </DialogTitle>
          </DialogHeader>
          {selectedAccount && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">用户ID</label>
                  <span className="text-sm font-medium">{selectedAccount.userId}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">风险等级</label>
                  {getRiskBadge(selectedAccount.riskLevel)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">注册时间</label>
                  <span className="text-sm">{selectedAccount.registrationTime}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">最后活动</label>
                  <span className="text-sm">{selectedAccount.lastActivity}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">总交易次数</label>
                <span className="text-sm font-medium">{selectedAccount.totalTransactions} 次</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">关联钱包地址</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="space-y-1">
                    {selectedAccount.wallets.map((wallet, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-mono">{wallet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
