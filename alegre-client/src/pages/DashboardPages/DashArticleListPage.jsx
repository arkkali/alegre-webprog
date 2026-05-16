import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import articlesSource from "../../assets/article-content.js";

function buildRows(list) {
  return list
    .map((a, index) => {
      if (a.invalid || !a.name || !a.title) return null;
      return {
        id: index + 1,
        slug: a.name,
        title: a.title,
        sourceUrl: a.sourceUrl || "",
        preview: Array.isArray(a.content)
          ? `${a.content[0]?.slice(0, 120) ?? ""}${
              (a.content[0]?.length ?? 0) > 120 ? "…" : ""
            }`
          : "",
      };
    })
    .filter(Boolean);
}

const inputLabelSx = {
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-focused": { color: "rgb(96, 165, 250)" },
};

function DashArticleListPage() {
  const allRows = useMemo(() => buildRows(articlesSource), []);
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [sortModel, setSortModel] = useState([
    { field: "id", sort: "asc" },
  ]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allRows;
    return allRows.filter(
      (row) =>
        row.title.toLowerCase().includes(q) ||
        row.slug.toLowerCase().includes(q) ||
        row.preview.toLowerCase().includes(q)
    );
  }, [search, allRows]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
      { field: "slug", headerName: "URL slug", width: 200 },
      {
        field: "sourceUrl",
        headerName: "External source",
        flex: 1,
        minWidth: 160,
        renderCell: (params) => {
          const url = params.value;
          if (!url || url === "#")
            return (
              <span style={{ color: "rgba(255,255,255,0.45)" }}>—</span>
            );
          return (
            <Button
              size="small"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: "rgb(96, 165, 250)",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "12px",
                minWidth: 0,
              }}
            >
              Open
            </Button>
          );
        },
      },
      {
        field: "site",
        headerName: "On this site",
        width: 140,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Button
            component={RouterLink}
            to={`/articles/${params.row.slug}`}
            size="small"
            sx={{
              color: "rgb(96, 165, 250)",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            View article
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#0c0e2f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400 mb-2">
              Content
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
              Article <span className="text-blue-500">library</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-400">
              Same articles as the public{" "}
              <RouterLink
                to="/articles"
                className="font-semibold text-blue-400 hover:text-blue-300 underline-offset-2 hover:underline"
              >
                ArticleListPage
              </RouterLink>
              —managed here in the dashboard.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Search
          </p>
          <TextField
            fullWidth
            placeholder="Search title, slug, or preview…"
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
              maxWidth: 480,
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
              "& .MuiInputLabel-root": inputLabelSx,
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255,255,255,0.4)",
                opacity: 1,
              },
            }}
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden">
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sortModel={sortModel}
              onSortModelChange={setSortModel}
              disableRowSelectionOnClick
              sx={{
                backgroundColor: "#0c0e2f",
                color: "white",
                border: "none",
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
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashArticleListPage;
