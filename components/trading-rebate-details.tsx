"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ChevronDown, Bell } from "lucide-react"

export function TradingRebateDetails() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState({
    all: true,
    forex: true,
    gold: true,
    silver: true,
    energy: true,
    index: true,
    others: true,
  })

  const handleProductChange = (product: string, checked: boolean) => {
    if (product === "all") {
      const newState = Object.keys(selectedProducts).reduce(
        (acc, key) => {
          acc[key as keyof typeof selectedProducts] = checked
          return acc
        },
        {} as typeof selectedProducts,
      )
      setSelectedProducts(newState)
    } else {
      setSelectedProducts((prev) => ({
        ...prev,
        [product]: checked,
        all: false,
      }))
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">交易返佣详情</h1>
          <Button variant="outline" size="sm">
            交易账户 <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-gray-500" />
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">简</div>
          <div className="w-8 h-8 bg-blue-500 rounded-full" />
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">关仓时间</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索姓名、交易账户或订单"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">返佣规则</label>
              <Select defaultValue="last-7-days">
                <SelectTrigger>
                  <SelectValue placeholder="最近7天" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">最近7天</SelectItem>
                  <SelectItem value="last-30-days">最近30天</SelectItem>
                  <SelectItem value="last-90-days">最近90天</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rebate Rules */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">交易产品</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="全部" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="forex">外汇</SelectItem>
                  <SelectItem value="gold">黄金</SelectItem>
                  <SelectItem value="silver">白银</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Account Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">账户类型</label>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="全部" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="standard">标准</SelectItem>
                  <SelectItem value="premium">高级</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500 self-center">或</span>
              <Input placeholder="用户层级" className="w-32" />
            </div>
          </div>

          {/* Trading Products */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">交易产品</label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all-products"
                  checked={selectedProducts.all}
                  onCheckedChange={(checked) => handleProductChange("all", checked as boolean)}
                />
                <label htmlFor="all-products" className="text-sm">
                  全部产品
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="forex"
                  checked={selectedProducts.forex}
                  onCheckedChange={(checked) => handleProductChange("forex", checked as boolean)}
                />
                <label htmlFor="forex" className="text-sm">
                  外汇
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gold"
                  checked={selectedProducts.gold}
                  onCheckedChange={(checked) => handleProductChange("gold", checked as boolean)}
                />
                <label htmlFor="gold" className="text-sm">
                  黄金
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="silver"
                  checked={selectedProducts.silver}
                  onCheckedChange={(checked) => handleProductChange("silver", checked as boolean)}
                />
                <label htmlFor="silver" className="text-sm">
                  白银
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="energy"
                  checked={selectedProducts.energy}
                  onCheckedChange={(checked) => handleProductChange("energy", checked as boolean)}
                />
                <label htmlFor="energy" className="text-sm">
                  能源
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="index"
                  checked={selectedProducts.index}
                  onCheckedChange={(checked) => handleProductChange("index", checked as boolean)}
                />
                <label htmlFor="index" className="text-sm">
                  指数
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="others"
                  checked={selectedProducts.others}
                  onCheckedChange={(checked) => handleProductChange("others", checked as boolean)}
                />
                <label htmlFor="others" className="text-sm">
                  其他
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500">总交易手数</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500">总返佣金额</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    姓名
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    关仓时间
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    交易订单号
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    交易账户
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    交易产品
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    交易标准手数
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    返佣金额
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    上级
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    交易时长
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    是否符合返佣规则
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    返佣
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <div className="w-8 h-8 bg-blue-200 rounded"></div>
                      </div>
                      <div className="text-gray-400">暂无数据</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
