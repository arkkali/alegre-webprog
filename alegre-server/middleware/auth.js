import jwt from "jsonwebtoken";

function getSecret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET is not set");
  return s;
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }
  try {
    const payload = jwt.verify(token, getSecret());
    req.userId = payload.sub;
    req.userRole = payload.role;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session." });
  }
}

export function signToken(userDoc) {
  return jwt.sign(
    {
      sub: userDoc._id.toString(),
      role: userDoc.role,
      email: userDoc.email,
    },
    getSecret(),
    { expiresIn: "7d" }
  );
}

export function forbidEditor(req, res, next) {
  if (req.userRole === "Editor") {
    return res
      .status(403)
      .json({ message: "Editors cannot access user management." });
  }
  next();
}
