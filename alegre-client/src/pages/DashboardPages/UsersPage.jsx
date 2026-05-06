import React, { useCallback, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import userRecords from "../../data/users.json";

const ROLE_OPTIONS = ["Admin", "Editor", "User", "Viewer"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];

const emptyUserForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "Male",
  contact: "",
  email: "",
  role: "User",
  username: "",
  password: "",
  address: "",
  statusActive: true,
};

function normalizeRow(r) {
  return { ...r, address: r.address ?? "" };
}

function validateUserForm(form, isEdit) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";

  if (!form.username.trim()) {
    errors.username = "Please enter a username.";
  } else if (/\s/.test(form.username)) {
    errors.username = "Username must not contain spaces.";
  }

  if (!isEdit) {
    if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
  } else if (form.password && form.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  const digitsOnly = String(form.contact).replace(/\D/g, "");
  if (digitsOnly.length !== 11) {
    errors.contact = "Contact number must be exactly 11 digits.";
  }

  if (form.age === "" || form.age === null) {
    errors.age = "Please enter age.";
  } else if (!/^\d+$/.test(String(form.age).trim())) {
    errors.age = "Age must be a number only (no letters or symbols).";
  }

  return errors;
}

const selectSx = {
  color: "white",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgb(96, 165, 250)",
  },
  "& .MuiSvgIcon-root": { color: "rgba(255, 255, 255, 0.7)" },
};

const inputLabelSx = {
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-focused": { color: "rgb(96, 165, 250)" },
};

const modalFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: "12px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
    "&.Mui-focused fieldset": { borderColor: "rgb(96, 165, 250)" },
  },
  "& .MuiInputLabel-root": inputLabelSx,
  "& .MuiFormHelperText-root": { color: "rgba(248, 113, 113, 0.95)" },
};

function UsersPage() {
  const [rows, setRows] = useState(() =>
    userRecords.map((r) => normalizeRow(r))
  );
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyUserForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const roles = useMemo(
    () => [...new Set([...ROLE_OPTIONS, ...rows.map((r) => r.role)])].sort(),
    [rows]
  );
  const genders = useMemo(
    () => [...new Set([...GENDER_OPTIONS, ...rows.map((r) => r.gender)])].sort(),
    [rows]
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesSearch =
        !q ||
        String(row.firstName).toLowerCase().includes(q) ||
        String(row.lastName).toLowerCase().includes(q) ||
        String(row.email).toLowerCase().includes(q) ||
        String(row.username).toLowerCase().includes(q);
      const matchesRole = !roleFilter || row.role === roleFilter;
      const matchesGender = !genderFilter || row.gender === genderFilter;
      const matchesStatus = !statusFilter || row.status === statusFilter;
      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [search, roleFilter, genderFilter, statusFilter, rows]);

  const openAdd = useCallback(() => {
    setEditingId(null);
    setForm({ ...emptyUserForm });
    setErrors({});
    setShowPassword(false);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((row) => {
    setEditingId(row.id);
    setForm({
      firstName: row.firstName ?? "",
      lastName: row.lastName ?? "",
      age: row.age != null ? String(row.age) : "",
      gender: row.gender ?? "Male",
      contact: row.contact ?? "",
      email: row.email ?? "",
      role: row.role ?? "User",
      username: row.username ?? "",
      password: "",
      address: row.address ?? "",
      statusActive: row.status === "active",
    });
    setErrors({});
    setShowPassword(false);
    setDialogOpen(true);
  }, []);

  const toggleUserStatus = useCallback((id) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status === "active" ? "inactive" : "active",
            }
          : r
      )
    );
  }, []);

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setErrors({});
  };

  const handleSaveUser = () => {
    const isEdit = editingId != null;
    const nextErrors = validateUserForm(form, isEdit);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const contactDigits = String(form.contact).replace(/\D/g, "");
    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      username: form.username.trim(),
      role: form.role,
      age: Number(form.age),
      gender: form.gender,
      status: form.statusActive ? "active" : "inactive",
      contact: contactDigits,
      address: form.address.trim(),
    };

    if (isEdit) {
      setRows((prev) =>
        prev.map((r) => (r.id === editingId ? { ...r, ...payload } : r))
      );
    } else {
      setRows((prev) => {
        const nextId = Math.max(0, ...prev.map((r) => r.id)) + 1;
        return [...prev, { id: nextId, ...payload }];
      });
    }
    closeDialog();
  };

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "firstName", headerName: "First Name", width: 130 },
      { field: "lastName", headerName: "Last Name", width: 130 },
      { field: "username", headerName: "Username", width: 130 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "role", headerName: "Role", width: 100 },
      { field: "gender", headerName: "Gender", width: 100 },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (params) => {
          const active = params.value === "active";
          return (
            <Chip
              label={active ? "Active" : "Inactive"}
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: "11px",
                backgroundColor: active
                  ? "rgba(34, 197, 94, 0.22)"
                  : "rgba(255, 255, 255, 0.08)",
                color: active ? "#4ade80" : "rgba(255, 255, 255, 0.75)",
                border: active
                  ? "none"
                  : "1px solid rgba(255, 255, 255, 0.22)",
              }}
            />
          );
        },
      },
      { field: "age", headerName: "Age", type: "number", width: 80 },
      { field: "contact", headerName: "Contact", width: 120 },
      {
        field: "fullName",
        headerName: "Full Name",
        width: 160,
        sortable: false,
        valueGetter: (value, row) =>
          `${row?.firstName || ""} ${row?.lastName || ""}`.trim(),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              flexWrap: "wrap",
              py: 0.5,
            }}
          >
            <Button
              size="small"
              onClick={() => openEdit(params.row)}
              sx={{
                color: "rgb(96, 165, 250)",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "12px",
                minWidth: 0,
                px: 1,
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => toggleUserStatus(params.row.id)}
              sx={{
                textTransform: "none",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                borderColor:
                  params.row.status === "active"
                    ? "rgba(251, 146, 60, 0.75)"
                    : "rgba(74, 222, 128, 0.75)",
                color:
                  params.row.status === "active" ? "#fb923c" : "#4ade80",
                "&:hover": {
                  borderColor:
                    params.row.status === "active"
                      ? "rgb(251, 146, 60)"
                      : "rgb(74, 222, 128)",
                  backgroundColor:
                    params.row.status === "active"
                      ? "rgba(251, 146, 60, 0.08)"
                      : "rgba(74, 222, 128, 0.08)",
                },
              }}
            >
              {params.row.status === "active" ? "Disable" : "Activate"}
            </Button>
          </Box>
        ),
      },
    ],
    [openEdit, toggleUserStatus]
  );

  return (
    <div className="min-h-screen bg-[#0c0e2f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400 mb-2">
              Management
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
              User <span className="text-blue-500">Management</span>
            </h1>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAdd}
            sx={{
              alignSelf: "flex-start",
              backgroundColor: "rgb(59, 130, 246)",
              textTransform: "none",
              letterSpacing: "0.14em",
              fontSize: "11px",
              fontWeight: 800,
              px: 2.5,
              py: 1,
              boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)",
              "&:hover": {
                backgroundColor: "rgb(37, 99, 235)",
              },
            }}
          >
            Add user
          </Button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Search &amp; filters
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <TextField
              fullWidth
              placeholder="Search name, email, or username…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                gridColumn: { xs: "1 / -1", lg: "1 / span 2" },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderRadius: "12px",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(96, 165, 250)",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.4)",
                  opacity: 1,
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="filter-role" sx={inputLabelSx}>
                Role
              </InputLabel>
              <Select
                labelId="filter-role"
                label="Role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                sx={selectSx}
              >
                <MenuItem value="">
                  <em>All roles</em>
                </MenuItem>
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="filter-gender" sx={inputLabelSx}>
                Gender
              </InputLabel>
              <Select
                labelId="filter-gender"
                label="Gender"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                sx={selectSx}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="filter-status" sx={inputLabelSx}>
                Status
              </InputLabel>
              <Select
                labelId="filter-status"
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={selectSx}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden">
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
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

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#14183a",
              backgroundImage: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "16px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
            },
          },
        }}
      >
        <DialogTitle sx={{ color: "white", fontWeight: 800, pb: 1 }}>
          {editingId != null ? "Edit user" : "Add user"}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <div className="grid gap-3 sm:grid-cols-2 pt-2">
            <TextField
              label="First name"
              value={form.firstName}
              onChange={(e) =>
                setForm((f) => ({ ...f, firstName: e.target.value }))
              }
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              fullWidth
              sx={modalFieldSx}
            />
            <TextField
              label="Last name"
              value={form.lastName}
              onChange={(e) =>
                setForm((f) => ({ ...f, lastName: e.target.value }))
              }
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              fullWidth
              sx={modalFieldSx}
            />
            <TextField
              label="Age"
              value={form.age}
              onChange={(e) =>
                setForm((f) => ({ ...f, age: e.target.value }))
              }
              error={Boolean(errors.age)}
              helperText={errors.age}
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              sx={modalFieldSx}
            />
            <FormControl fullWidth>
              <InputLabel id="modal-gender" sx={inputLabelSx}>
                Gender
              </InputLabel>
              <Select
                labelId="modal-gender"
                label="Gender"
                value={form.gender}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gender: e.target.value }))
                }
                sx={selectSx}
              >
                {GENDER_OPTIONS.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Contact number"
              value={form.contact}
              onChange={(e) =>
                setForm((f) => ({ ...f, contact: e.target.value }))
              }
              error={Boolean(errors.contact)}
              helperText={errors.contact}
              fullWidth
              inputProps={{ inputMode: "numeric" }}
              sx={modalFieldSx}
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              sx={modalFieldSx}
            />
            <FormControl
              fullWidth
              sx={{ gridColumn: "1 / -1" }}
            >
              <InputLabel id="modal-role" sx={inputLabelSx}>
                Role
              </InputLabel>
              <Select
                labelId="modal-role"
                label="Role"
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
                sx={selectSx}
              >
                {ROLE_OPTIONS.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Username"
              value={form.username}
              onChange={(e) =>
                setForm((f) => ({ ...f, username: e.target.value }))
              }
              error={Boolean(errors.username)}
              helperText={errors.username}
              fullWidth
              autoComplete="off"
              sx={{ ...modalFieldSx, gridColumn: "1 / -1" }}
            />
            <TextField
              label={
                editingId != null
                  ? "Password (leave blank to keep unchanged)"
                  : "Password"
              }
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              autoComplete="new-password"
              sx={{ ...modalFieldSx, gridColumn: "1 / -1" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password"
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Address"
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
              fullWidth
              multiline
              minRows={3}
              sx={{ ...modalFieldSx, gridColumn: "1 / -1" }}
            />
          </div>
          <FormControlLabel
            sx={{
              mt: 2,
              color: "rgba(255,255,255,0.9)",
              "& .MuiFormControlLabel-label": { fontSize: "14px" },
            }}
            control={
              <Switch
                checked={form.statusActive}
                onChange={(e) =>
                  setForm((f) => ({ ...f, statusActive: e.target.checked }))
                }
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "rgb(96, 165, 250)",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(59, 130, 246)",
                  },
                }}
              />
            }
            label="User status: Active"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={closeDialog}
            sx={{
              color: "rgba(255,255,255,0.75)",
              textTransform: "none",
              letterSpacing: "0.08em",
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveUser}
            sx={{
              textTransform: "none",
              letterSpacing: "0.12em",
              fontWeight: 800,
              fontSize: "11px",
              px: 2.5,
              backgroundColor: "rgb(59, 130, 246)",
              "&:hover": { backgroundColor: "rgb(37, 99, 235)" },
            }}
          >
            Save user
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersPage;
