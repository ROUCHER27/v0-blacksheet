"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertTriangle,
  Shield,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  Clock,
  MapPin,
  Smartphone,
  Search,
  X,
} from "lucide-react"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface RiskDashboardProps {
  onNavigateToUserProfile?: (userId: string) => void
}

export function RiskDashboard({ onNavigateToUserProfile }: RiskDashboardProps) {
  const [showHighRiskDialog, setShowHighRiskDialog] = useState(false)
  const [showSystemStatusDialog, setShowSystemStatusDialog] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // 模拟实时风控数据
  const riskStats = {
    totalAlerts: 156,
    highRiskUsers: 23,
    blockedTransactions: 89,
    suspiciousLogins: 45,
  }

  const highRiskUsers = [
    {
      id: "USER001",
      detectedTime: "2024-01-15 16:30:25",
      reason: "异地登录+大额提现",
      riskScore: 95,
      location: "俄罗斯 莫斯科",
    },
    {
      id: "USER002",
      detectedTime: "2024-01-15 16:25:10",
      reason: "多账户关联操作",
      riskScore: 88,
      location: "美国 纽约",
    },
    {
      id: "USER003",
      detectedTime: "2024-01-15 16:20:45",
      reason: "异常交易模式",
      riskScore: 92,
      location: "英国 伦敦",
    },
    {
      id: "USER004",
      detectedTime: "2024-01-15 16:15:33",
      reason: "IP风险关联",
      riskScore: 85,
      location: "德国 柏林",
    },
    {
      id: "USER005",
      detectedTime: "2024-01-15 16:10:22",
      reason: "设备指纹异常",
      riskScore: 90,
      location: "日本 东京",
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "高风险登录",
      user: "user_12345",
      risk: "高",
      time: "2分钟前",
      location: "俄罗斯 莫斯科",
      device: "iPhone 15",
    },
    {
      id: 2,
      type: "异常交易",
      user: "user_67890",
      risk: "中",
      time: "5分钟前",
      location: "中国 香港",
      device: "Chrome浏览器",
    },
    {
      id: 3,
      type: "多账户关联",
      user: "user_11111",
      risk: "高",
      time: "8分钟前",
      location: "美国 纽约",
      device: "Android设备",
    },
    {
      id: 4,
      type: "IP风险",
      user: "user_22222",
      risk: "中",
      time: "12分钟前",
      location: "英国 伦敦",
      device: "Safari浏览器",
    },
  ]

  const riskTrends = [
    { date: "4日前", alerts: 35, blocked: 7 },
    { date: "3日前", alerts: 41, blocked: 9 },
    { date: "前日", alerts: 52, blocked: 15 },
    { date: "昨日", alerts: 38, blocked: 8 },
    { date: "今日", alerts: 45, blocked: 12 },
  ]

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "高":
        return "bg-red-100 text-red-800 border-red-200"
      case "中":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "低":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric)
    setShowHighRiskDialog(true)
  }

  const handleUserClick = (userId: string) => {
    setShowHighRiskDialog(false)
    if (onNavigateToUserProfile) {
      onNavigateToUserProfile(userId)
    }
  }

  const filteredHighRiskUsers = highRiskUsers.filter(
    (user) =>
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">风控仪表盘</h1>
          <p className="text-gray-600 mt-1">实时监控系统安全状态和风险指标</p>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-600">系统正常运行</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-orange-200"
          onClick={() => handleMetricClick("总风险警报")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总风险警报</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.totalAlerts}</div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="inline h-3 w-3 text-red-500" />
              <span className="text-red-500">+12%</span> 较昨日
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-red-200"
          onClick={() => handleMetricClick("高风险用户")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">高风险用户</CardTitle>
            <Users className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.highRiskUsers}</div>
            <p className="text-xs text-gray-600">
              <TrendingDown className="inline h-3 w-3 text-green-500" />
              <span className="text-green-500">-5%</span> 较昨日
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-200"
          onClick={() => handleMetricClick("拦截交易")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">拦截交易</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.blockedTransactions}</div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="inline h-3 w-3 text-red-500" />
              <span className="text-red-500">+8%</span> 较昨日
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-purple-200"
          onClick={() => handleMetricClick("可疑登录")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">可疑登录</CardTitle>
            <Eye className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.suspiciousLogins}</div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="inline h-3 w-3 text-red-500" />
              <span className="text-red-500">+15%</span> 较昨日
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 实时警报和趋势分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 实时风险警报 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              实时风险警报
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getRiskBadgeColor(alert.risk)}>{alert.risk}风险</Badge>
                      <span className="text-sm font-medium">{alert.type}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        用户: {alert.user}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        位置: {alert.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        设备: {alert.device}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </div>
                    <Button size="sm" variant="outline">
                      查看详情
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              风险趋势分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="alerts" stroke="#f97316" strokeWidth={2} name="风险警报" />
                  <Line type="monotone" dataKey="blocked" stroke="#dc2626" strokeWidth={2} name="拦截交易" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>风险警报</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span>拦截交易</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            系统状态监控
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              onClick={() => setShowSystemStatusDialog(true)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">风控引擎</span>
                <Badge className="bg-green-100 text-green-800">正常</Badge>
              </div>
              <div className="text-xs text-gray-600 mt-1">响应时间: 45ms</div>
            </div>
            <div
              className="p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              onClick={() => setShowSystemStatusDialog(true)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">数据同步</span>
                <Badge className="bg-green-100 text-green-800">正常</Badge>
              </div>
              <div className="text-xs text-gray-600 mt-1">最后同步: 1分钟前</div>
            </div>
            <div
              className="p-4 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
              onClick={() => setShowSystemStatusDialog(true)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">外部API</span>
                <Badge className="bg-yellow-100 text-yellow-800">警告</Badge>
              </div>
              <div className="text-xs text-gray-600 mt-1">响应时间: 1.2s</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showHighRiskDialog} onOpenChange={setShowHighRiskDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>当日{selectedMetric}详情</span>
              <Button variant="ghost" size="sm" onClick={() => setShowHighRiskDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* 搜索栏 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索用户ID或风险原因..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 用户列表 */}
            <div className="space-y-2">
              {filteredHighRiskUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleUserClick(user.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-900">{user.id}</span>
                        <Badge className="bg-red-100 text-red-800">风险评分: {user.riskScore}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          发现时间: {user.detectedTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3" />
                          风险原因: {user.reason}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          位置: {user.location}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUserClick(user.id)
                      }}
                    >
                      查看档案
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSystemStatusDialog} onOpenChange={setShowSystemStatusDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>系统状态详细报告</span>
              <Button variant="ghost" size="sm" onClick={() => setShowSystemStatusDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">风控引擎状态</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>状态:</span>
                    <Badge className="bg-green-100 text-green-800">正常运行</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>平均响应时间:</span>
                    <span>45ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>处理请求数:</span>
                    <span>1,234/小时</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>CPU使用率:</span>
                    <span>23%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">数据同步状态</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>状态:</span>
                    <Badge className="bg-green-100 text-green-800">同步正常</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>最后同步:</span>
                    <span>1分钟前</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>同步延迟:</span>
                    <span>&lt; 30秒</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">外部API状态</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>状态:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">响应缓慢</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>平均响应时间:</span>
                    <span>1.2s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>成功率:</span>
                    <span>98.5%</span>
                  </div>
                  <div className="text-sm text-yellow-600 mt-2">
                    <AlertTriangle className="inline h-3 w-3 mr-1" />
                    建议: 监控第三方API性能，考虑启用备用服务
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
