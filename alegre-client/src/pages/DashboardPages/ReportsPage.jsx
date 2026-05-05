import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#0c0e2f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400 mb-2">
            Analytics
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
            Reports & <span className="text-blue-500">Analytics</span>
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Revenue
            </p>
            <p className="text-3xl font-black text-blue-500 mt-2">₱120,000</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Users Growth
            </p>
            <p className="text-3xl font-black text-blue-500 mt-2">+18%</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Engagement
            </p>
            <p className="text-3xl font-black text-blue-500 mt-2">72%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Monthly Performance
            </h3>
            <div className="flex justify-center">
              <BarChart
                height={300}
                color='rgba(249, 249, 249, 0.9)'
                series={[
                  { data: [30, 45, 28, 60, 75, 50], label: "Sales" },
                  { data: [20, 35, 40, 55, 65, 45], label: "Expenses" },
                ]}
                xAxis={[
                  {
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    scaleType: "band",
                  },
                ]}
                margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
                slotProps={{
                  legend: {
                    hidden: false,
                  },
                }}
                sx={{
                  '& .MuiChartsAxis-left': {
                    '& .MuiChartsAxis-line': { stroke: 'rgba(255, 255, 255, 0.2)' },
                    '& .MuiChartsAxis-tick': { stroke: 'rgba(255, 255, 255, 0.2)' },
                  },
                  '& .MuiChartsAxis-bottom': {
                    '& .MuiChartsAxis-line': { stroke: 'rgba(255, 255, 255, 0.2)' },
                    '& .MuiChartsAxis-tick': { stroke: 'rgba(255, 255, 255, 0.2)' },
                  },
                  "& text": { fill: "rgba(255, 255, 255, 0.9) !important" },
                  '& .MuiChartsLegend-root': { 
                    '& text': { fill: 'rgba(255, 255, 255, 0.9) !important' } 
                  },
                }}
              />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-4">
              Department Share
            </h3>
            <PieChart
              width={280}
              height={220}
              series={[
                {
                  data: [
                    { id: 0, value: 25, label: "Tech" },
                    { id: 1, value: 35, label: "Sales" },
                    { id: 2, value: 40, label: "Operations" },
                  ],
                },
              ]}
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              slotProps={{
                legend: {
                  hidden: false,
                },
              }}
              sx={{
                "& text": { fill: "rgba(255, 255, 255, 0.9) !important" },
                '& .MuiChartsLegend-root': { 
                  '& text': { fill: 'rgba(255, 255, 255, 0.9) !important' } 
                },
              }}
            />
          </div>
        </div>

        {/* Line Chart */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
          <h3 className="text-lg font-bold text-white mb-4">Traffic Trend</h3>
          <div className="flex justify-center">
            <LineChart
              height={300}
              series={[{ data: [10, 20, 35, 50, 65, 80], label: "Visitors" }]}
              xAxis={[
                {
                  data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  scaleType: "point",
                },
              ]}
              margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
              slotProps={{
                legend: {
                  hidden: false,
                },
              }}
              sx={{
                '& .MuiChartsAxis-left': {
                  '& .MuiChartsAxis-line': { stroke: 'rgba(255, 255, 255, 0.2)' },
                  '& .MuiChartsAxis-tick': { stroke: 'rgba(255, 255, 255, 0.2)' },
                },
                '& .MuiChartsAxis-bottom': {
                  '& .MuiChartsAxis-line': { stroke: 'rgba(255, 255, 255, 0.2)' },
                  '& .MuiChartsAxis-tick': { stroke: 'rgba(255, 255, 255, 0.2)' },
                },
                "& text": { fill: "rgba(255, 255, 255, 0.9) !important" },
                '& .MuiChartsLegend-root': { 
                  '& text': { fill: 'rgba(255, 255, 255, 0.9) !important' } 
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
