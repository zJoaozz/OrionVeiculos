const crypto = require("crypto");

const sessions = new Map();
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getAdminPassword() {
  const password = String(process.env.ADMIN_PASSWORD || "").trim();

  if (!password) {
    throw new Error("ADMIN_PASSWORD não definida no arquivo .env.");
  }

  return password;
}

function createToken() {
  return crypto.randomBytes(32).toString("hex");
}

function createSession() {
  const token = createToken();

  sessions.set(token, {
    createdAt: Date.now()
  });

  return token;
}

function clearExpiredSessions() {
  const now = Date.now();

  for (const [token, session] of sessions.entries()) {
    if (!session || now - session.createdAt > SESSION_TTL_MS) {
      sessions.delete(token);
    }
  }
}

function isValidPassword(password) {
  const expected = Buffer.from(getAdminPassword());
  const received = Buffer.from(String(password || ""));

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}

function extractBearerToken(req) {
  const header = String(req.headers.authorization || "");

  if (!header.startsWith("Bearer ")) {
    return "";
  }

  return header.slice("Bearer ".length).trim();
}

function requireAuth(req, res, next) {
  clearExpiredSessions();

  const token = extractBearerToken(req);
  const session = sessions.get(token);

  if (!token || !session) {
    return res.status(401).json({
      ok: false,
      message: "Acesso nao autorizado."
    });
  }

  req.authToken = token;
  return next();
}

function destroySession(token) {
  sessions.delete(token);
}

module.exports = {
  createSession,
  destroySession,
  extractBearerToken,
  isValidPassword,
  requireAuth
};