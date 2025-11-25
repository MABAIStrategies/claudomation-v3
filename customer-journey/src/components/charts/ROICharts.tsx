/**
 * ROI Visualization Charts
 *
 * Enhanced ROI visualizations using Recharts:
 * - Cumulative savings over time
 * - Payback period visualization
 * - Cost breakdown
 */

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { ROICalculation, AccumulatedSavings } from '../../types';

interface ROIChartsProps {
  roiCalculation: ROICalculation;
  accumulatedSavings: AccumulatedSavings;
}

export function ROICharts({ roiCalculation, accumulatedSavings }: ROIChartsProps) {
  // Generate cumulative savings data for 3 years (36 months)
  const cumulativeSavingsData = Array.from({ length: 37 }, (_, i) => {
    const month = i;
    const monthlyROI = roiCalculation.estimatedAnnualROI / 12;
    const cumulativeSavings = monthlyROI * month;
    const investment = accumulatedSavings.totalCostUSD;

    return {
      month,
      savings: Math.round(cumulativeSavings),
      investment: month === 0 ? investment : investment,
      net: Math.round(cumulativeSavings - investment),
    };
  });

  // Cost breakdown data
  const costBreakdownData = [
    {
      name: 'Implementation',
      value: accumulatedSavings.totalCostUSD,
      color: '#f59e0b', // amber-500
    },
    {
      name: 'Year 1 ROI',
      value: roiCalculation.estimatedAnnualROI,
      color: '#10b981', // emerald-500
    },
    {
      name: 'Year 2 ROI',
      value: roiCalculation.estimatedAnnualROI,
      color: '#059669', // emerald-600
    },
    {
      name: 'Year 3 ROI',
      value: roiCalculation.estimatedAnnualROI,
      color: '#047857', // emerald-700
    },
  ];

  // Monthly comparison data
  const monthlyData = Array.from({ length: 13 }, (_, i) => {
    const month = i;
    return {
      month: month === 0 ? 'Now' : `M${month}`,
      withAutomation: Math.round((roiCalculation.estimatedAnnualROI / 12) * month),
      withoutAutomation: 0,
    };
  });

  return (
    <div className="space-y-8">
      {/* Cumulative Savings Over Time */}
      <div className="bg-white rounded-lg border-2 border-amber-200 p-6 shadow-md">
        <h3 className="text-xl font-bold font-serif text-amber-900 mb-4">
          📈 Cumulative Savings Over Time
        </h3>
        <p className="text-sm text-amber-700 mb-4">
          Break-even point: <strong>Month {Math.ceil(roiCalculation.estimatedPaybackPeriod)}</strong>
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={cumulativeSavingsData}>
            <defs>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f59e0b20" />
            <XAxis
              dataKey="month"
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
              stroke="#78350f"
            />
            <YAxis
              label={{ value: 'Dollars ($)', angle: -90, position: 'insideLeft' }}
              stroke="#78350f"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: '#fffbeb',
                border: '2px solid #f59e0b',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <ReferenceLine
              y={0}
              stroke="#ef4444"
              strokeDasharray="3 3"
              label="Break Even"
            />
            <ReferenceLine
              x={Math.ceil(roiCalculation.estimatedPaybackPeriod)}
              stroke="#10b981"
              strokeDasharray="3 3"
              label="Payback"
            />
            <Area
              type="monotone"
              dataKey="net"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorSavings)"
              name="Net Savings"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Savings Comparison */}
      <div className="bg-white rounded-lg border-2 border-amber-200 p-6 shadow-md">
        <h3 className="text-xl font-bold font-serif text-amber-900 mb-4">
          💰 First Year Savings Impact
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f59e0b20" />
            <XAxis dataKey="month" stroke="#78350f" />
            <YAxis
              stroke="#78350f"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: '#fffbeb',
                border: '2px solid #f59e0b',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="withoutAutomation" fill="#ef4444" name="Without Automation" />
            <Bar dataKey="withAutomation" fill="#10b981" name="With Automation" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 3-Year ROI Breakdown */}
      <div className="bg-white rounded-lg border-2 border-amber-200 p-6 shadow-md">
        <h3 className="text-xl font-bold font-serif text-amber-900 mb-4">
          🎯 3-Year Investment vs. Returns
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={costBreakdownData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) =>
                  `${name}: $${(value / 1000).toFixed(0)}k`
                }
                labelLine={false}
              >
                {costBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: '#fffbeb',
                  border: '2px solid #f59e0b',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col justify-center space-y-3">
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
              <span className="font-semibold text-amber-900">Total Investment:</span>
              <span className="text-xl font-bold text-amber-700">
                ${accumulatedSavings.totalCostUSD.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-md">
              <span className="font-semibold text-emerald-900">3-Year Returns:</span>
              <span className="text-xl font-bold text-emerald-700">
                ${(roiCalculation.estimatedAnnualROI * 3).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-100 to-emerald-100 rounded-md border-2 border-emerald-500">
              <span className="font-bold text-emerald-900">Net Gain (3 years):</span>
              <span className="text-2xl font-bold text-emerald-700">
                $
                {(
                  roiCalculation.estimatedAnnualROI * 3 -
                  accumulatedSavings.totalCostUSD
                ).toLocaleString()}
              </span>
            </div>
            <div className="text-center text-sm text-amber-700 mt-2">
              <strong>ROI Multiple:</strong>{' '}
              {((roiCalculation.estimatedAnnualROI * 3) / accumulatedSavings.totalCostUSD).toFixed(
                1
              )}
              x return on investment
            </div>
          </div>
        </div>
      </div>

      {/* Time Savings Visualization */}
      <div className="bg-white rounded-lg border-2 border-amber-200 p-6 shadow-md">
        <h3 className="text-xl font-bold font-serif text-amber-900 mb-4">
          ⏰ Time Saved Per Year
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-300">
            <div className="text-4xl font-bold text-blue-700">
              {roiCalculation.estimatedTimeSavedPerYear.toLocaleString()}
            </div>
            <div className="text-sm text-blue-600 mt-1">Hours Saved/Year</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-300">
            <div className="text-4xl font-bold text-purple-700">
              {Math.round(roiCalculation.estimatedTimeSavedPerYear / 40)}
            </div>
            <div className="text-sm text-purple-600 mt-1">Work Weeks Saved</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-300">
            <div className="text-4xl font-bold text-amber-700">
              {Math.round(roiCalculation.estimatedTimeSavedPerYear / 2080)}
            </div>
            <div className="text-sm text-amber-600 mt-1">Full-Time Equivalents</div>
          </div>
        </div>
      </div>
    </div>
  );
}
