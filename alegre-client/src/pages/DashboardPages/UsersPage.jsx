import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "firstName", headerName: "First Name", width: 150, editable: true },
  { field: "lastName", headerName: "Last Name", width: 150, editable: true },
  { field: "email", headerName: "Email", width: 220 },
  { field: "role", headerName: "Role", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 100 },

  {
    field: "fullName",
    headerName: "Full Name",
    width: 180,
    sortable: false,
    valueGetter: (value, row) =>
      `${row?.firstName || ""} ${row?.lastName || ""}`,
  },
];

const rows = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@email.com",
    role: "Admin",
    age: 28,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@email.com",
    role: "Editor",
    age: 32,
  },
  {
    id: 3,
    firstName: "Mark",
    lastName: "Lee",
    email: "mark@email.com",
    role: "User",
    age: 24,
  },
  {
    id: 4,
    firstName: "Anna",
    lastName: "Kim",
    email: "anna@email.com",
    role: "User",
    age: 29,
  },
  {
    id: 5,
    firstName: "Paul",
    lastName: "Walker",
    email: "paul@email.com",
    role: "Admin",
    age: 40,
  },
  {
    id: 6,
    firstName: "Chris",
    lastName: "Evans",
    email: "chris@email.com",
    role: "User",
    age: 35,
  },
];

function UsersPage() {
  return (
    <div className="min-h-screen bg-[#0c0e2f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400 mb-2">
            Management
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
            User <span className="text-blue-500">Management</span>
          </h1>
        </div>

        {/* Users Table */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden">
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                backgroundColor: '#0c0e2f',
                color: 'white',
                border: 'none',
                '& .MuiDataGrid-root': {
                  backgroundColor: '#0c0e2f',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '& .MuiDataGrid-cell': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#1a1d3a',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontWeight: 'bold',
                },
                '& .MuiDataGrid-row': {
                  backgroundColor: '#0c0e2f',
                  '&:hover': {
                    backgroundColor: '#1a1d3a',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#1a1d3a !important',
                  },
                },
                '& .MuiCheckbox-root': {
                  color: 'rgb(96, 165, 250) !important',
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: '#0c0e2f',
                  color: 'white',
                },
                '& .MuiTablePagination-root': {
                  color: 'white !important',
                },
                '& .MuiTablePagination-selectLabel': {
                  color: 'white !important',
                },
                '& .MuiTablePagination-displayedRows': {
                  color: 'white !important',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  color: 'white',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
