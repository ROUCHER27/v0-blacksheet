"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Plus, Edit, Trash2, AlertTriangle, Bot, CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface BlacklistEntry {
  id: string
  userId: string
  type: "ip" | "wallet"
  reason: string
  operator: string
  operationTime: string
  notes: string
  isAutoDetected?: boolean
}

export function BlacklistManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [dateFilterType, setDateFilterType] = useState("all")
  const [customStartDateTime, setCustomStartDateTime] = useState("")
  const [customEndDateTime, setCustomEndDateTime] = useState("")

  const [blacklistEntries] = useState<BlacklistEntry[]>([
    {
      id: "1",
      userId: "USER001",
      type: "ip",
      reason: "多次异常登录尝试",
      operator: "管理员A",
      operationTime: "2024-01-15 14:30:25",
      notes: "来自高风险地区的IP地址",
    },
    {
      id: "2",
      userId: "USER002",
      type: "wallet",
      reason: "关联暗网交易",
      operator: "管理员B",
      operationTime: "2024-01-14 09:15:10",
      notes: "钱包地址与已知暗网市场关联",
    },
    {
      id: "3",
      userId: "USER003",
      type: "ip",
      reason: "恶意攻击行为",
      operator: "管理员C",
      operationTime: "2024-01-13 16:45:33",
      notes: "DDoS攻击源IP",
    },
    {
      id: "4",
      userId: "USER004",
      type: "wallet",
      reason: "异常大额转账模式",
      operator: "系统识别",
      operationTime: "2024-01-15 16:22:10",
      notes: "AI检测到异常转账行为，风险评分95/100",
      isAutoDetected: true,
    },
    {
      id: "5",
      userId: "USER005",
      type: "ip",
      reason: "账户接管攻击特征",
      operator: "系统识别",
      operationTime: "2024-01-15 15:45:33",
      notes: "检测到典型ATO攻击模式：异地登录+密码修改+2FA移除+大额提现",
      isAutoDetected: true,
    },
    {
      id: "6",
      userId: "USER006",
      type: "wallet",
      reason: "混币服务关联",
      operator: "系统识别",
      operationTime: "2024-01-15 14:12:45",
      notes: "钱包地址与多个混币服务有交易记录，疑似洗钱行为",
      isAutoDetected: true,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<BlacklistEntry | null>(null)

  const filteredEntries = blacklistEntries.filter((entry) => {
    const matchesSearch =
      entry.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.operator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || entry.type === filterType

    let matchesDate = true
    if (dateFilterType === "custom" && (dateFrom || dateTo)) {
      const entryDate = new Date(entry.operationTime)
      if (dateFrom && entryDate < dateFrom) matchesDate = false
      if (dateTo && entryDate > dateTo) matchesDate = false
    } else if (dateFilterType === "custom-precise" && (customStartDateTime || customEndDateTime)) {
      const entryDate = new Date(entry.operationTime)
      if (customStartDateTime && entryDate < new Date(customStartDateTime)) matchesDate = false
      if (customEndDateTime && entryDate > new Date(customEndDateTime)) matchesDate = false
    } else if (dateFilterType === "today") {
      const today = new Date()
      const entryDate = new Date(entry.operationTime)
      matchesDate = entryDate.toDateString() === today.toDateString()
    } else if (dateFilterType === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const entryDate = new Date(entry.operationTime)
      matchesDate = entryDate >= weekAgo
    } else if (dateFilterType === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      const entryDate = new Date(entry.operationTime)
      matchesDate = entryDate >= monthAgo
    }

    return matchesSearch && matchesType && matchesDate
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">黑名单管理</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加黑名单
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>添加黑名单实体</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">用户ID</label>
                <Input placeholder="输入用户ID" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">黑名单类型</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ip">IP地址</SelectItem>
                    <SelectItem value="wallet">钱包地址</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">拉黑原因</label>
                <Textarea placeholder="请输入拉黑原因" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">备注</label>
                <Textarea placeholder="可选备注信息" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">确认添加</Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索用户ID、拉黑原因或操作员"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="筛选类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="ip">IP地址</SelectItem>
                <SelectItem value="wallet">钱包地址</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilterType} onValueChange={setDateFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="时间筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部时间</SelectItem>
                <SelectItem value="today">今日</SelectItem>
                <SelectItem value="week">近一周</SelectItem>
                <SelectItem value="month">近一月</SelectItem>
                <SelectItem value="custom">自定义日期</SelectItem>
                <SelectItem value="custom-precise">精确时间筛选</SelectItem>
              </SelectContent>
            </Select>
            {dateFilterType === "custom" && (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-48 justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "yyyy-MM-dd") : "开始日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-48 justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "yyyy-MM-dd") : "结束日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </>
            )}
            {dateFilterType === "custom-precise" && (
              <>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <Input
                    type="datetime-local"
                    value={customStartDateTime}
                    onChange={(e) => setCustomStartDateTime(e.target.value)}
                    className="w-56"
                    placeholder="开始时间"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <Input
                    type="datetime-local"
                    value={customEndDateTime}
                    onChange={(e) => setCustomEndDateTime(e.target.value)}
                    className="w-56"
                    placeholder="结束时间"
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{filteredEntries.length}</div>
              <div className="text-sm text-gray-500">筛选结果</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {filteredEntries.filter((e) => e.type === "ip").length}
              </div>
              <div className="text-sm text-gray-500">IP黑名单</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {filteredEntries.filter((e) => e.type === "wallet").length}
              </div>
              <div className="text-sm text-gray-500">钱包黑名单</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredEntries.filter((e) => e.isAutoDetected).length}
              </div>
              <div className="text-sm text-gray-500">系统识别</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>黑名单列表</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">拉黑原因</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作员</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作时间</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">备注</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{entry.userId}</td>
                    <td className="px-4 py-3">
                      <Badge variant={entry.type === "ip" ? "destructive" : "secondary"}>
                        {entry.type === "ip" ? "IP地址" : "钱包"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{entry.reason}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {entry.isAutoDetected && <Bot className="h-4 w-4 text-blue-500" />}
                        <span className="text-sm text-gray-500">{entry.operator}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{entry.operationTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{entry.notes}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedEntry(entry)
                            setIsRemoveDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Remove Confirmation Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              确认移除黑名单
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              您确定要将用户 <strong>{selectedEntry?.userId}</strong> 从黑名单中移除吗？
            </p>
            <div>
              <label className="block text-sm font-medium mb-2">移除原因</label>
              <Textarea placeholder="请输入移除原因，此信息将被记录用于审核" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="destructive" className="flex-1">
                确认移除
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsRemoveDialogOpen(false)}>
                取消
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
