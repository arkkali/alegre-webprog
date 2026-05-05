import React from "react";
import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) =>
      `${row?.firstName || ""} ${row?.lastName || ""}`.trim(),
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function DashboardPage() {
  const location = useLocation();

  const totalUsers = rows.length;
  const validAges = rows.filter((row) => row.age !== null);
  const avgAge =
    validAges.length > 0
      ? (
          validAges.reduce((sum, row) => sum + row.age, 0) / validAges.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-[#0c0e2f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400 mb-2">
            Management
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
            Dashboard <span className="text-blue-500">Overview</span>
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Total Users
            </p>
            <p className="text-4xl font-black text-blue-500 mt-2">
              {totalUsers}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Average Age
            </p>
            <p className="text-4xl font-black text-blue-500 mt-2">{avgAge}</p>
          </div>
        </div>

        {/* Gauges Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-4">System Load</h3>
            <Gauge
              width={120}
              height={120}
              value={75}
              sx={{
                "& text": { fill: "rgba(249, 249, 249, 1)" },
              }}
            />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-4">
              Task Completion
            </h3>
            <Gauge
              width={120}
              height={120}
              value={50}
              valueMin={0}
              valueMax={100}
              sx={{
                "& text": { fill: "rgb(249, 249, 249)" },
              }}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Quarterly Sales
            </h3>
            <div className="flex justify-center">
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: "Physical" },
                  { data: [51, 6, 49, 30], label: "Digital" },
                ]}
                height={300}
                xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
                margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
                slotProps={{
                  legend: {
                    hidden: false,
                    labelStyle: {
                      fill: "rgb(249, 249, 249)",
                    },
                  },
                }}
                sx={{
                  "& .MuiChartsAxis-left .MuiChartsAxis-line, & .MuiChartsAxis-left .MuiChartsAxis-tick":
                    {
                      stroke: "rgba(255, 255, 255, 0.58)",
                    },
                  "& .MuiChartsAxis-bottom .MuiChartsAxis-line, & .MuiChartsAxis-bottom .MuiChartsAxis-tick":
                    {
                      stroke: "rgba(255, 255, 255, 0.58)",
                    },
                  "& .MuiChartsAxis-tickLabel": {
                    fill: "rgb(249, 249, 249) !important",
                  },
                  "& .MuiChartsLegend-root text": {
                    fill: "rgb(249, 249, 249) !important",
                  },
                  "& text": {
                    fill: "rgb(249, 249, 249) !important",
                  },
                }}
              />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-4">Distribution</h3>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Tech" },
                    { id: 1, value: 15, label: "Ops" },
                    { id: 2, value: 20, label: "Sales" },
                  ],
                },
              ]}
              width={280}
              height={220}
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              slotProps={{
                  legend: {
                    hidden: false,
                    labelStyle: {
                      fill: "rgb(249, 249, 249)",
                    },
                  },
                }}
              sx={{
                "& text": { fill: "rgb(255, 255, 255) !important" },
                "& .MuiChartsLegend-root": {
                  "& text": { fill: "rgb(255, 255, 255) !important" },
                },
              }}
            />
          </div>
        </div>

        {/* User Management Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            User Management
          </h2>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden">
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  backgroundColor: "#0c0e2f",
                  color: "white",
                  border: "none",
                  "& .MuiDataGrid-root": {
                    backgroundColor: "#0c0e2f",
                    color: "white",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "& .MuiDataGrid-cell": {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#1a1d3a",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-row": {
                    backgroundColor: "#0c0e2f",
                    "&:hover": {
                      backgroundColor: "#1a1d3a",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#1a1d3a !important",
                    },
                  },
                  "& .MuiCheckbox-root": {
                    color: "rgb(96, 165, 250) !important",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "#0c0e2f",
                    color: "white",
                  },
                  "& .MuiTablePagination-root": {
                    color: "white !important",
                  },
                  "& .MuiTablePagination-selectLabel": {
                    color: "white !important",
                  },
                  "& .MuiTablePagination-displayedRows": {
                    color: "white !important",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "white",
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Global Office Location
          </h2>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden h-[450px]">
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  <strong>National University-Manila</strong> <br />
                  551 F Jhocson St, Sampaloc, Manila
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
