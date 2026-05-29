import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";

const app = express();

// Allowed explicit origins
const allowedOrigins = [
  "https://alegre-webprog-client.vercel.app",
];

// Dynamic CORS configuration to handle both production and Vercel preview domains
const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server requests or API testing tools (no origin header)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin);
    const isVercelPreview = origin.endsWith(".vercel.app") && origin.includes("alegre-webprog-client");

    if (isAllowed || isVercelPreview) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

const PORT = Number(process.env.PORT) || 5000;

// Connect to Database and start server listener for local execution
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

// Critical for Vercel deployment to serve it as a serverless function
export default app;