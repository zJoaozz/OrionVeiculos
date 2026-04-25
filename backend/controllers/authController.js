const {
  createSession,
  destroySession,
  extractBearerToken,
  isValidPassword
} = require("../middleware/auth");

async function login(req, res) {
  const password = String(req.body?.password || "").trim();

  if (!isValidPassword(password)) {
    return res.status(401).json({
      ok: false,
      message: "Senha invalida."
    });
  }

  const token = createSession();

  return res.status(200).json({
    ok: true,
    message: "Login realizado com sucesso.",
    data: {
      token
    }
  });
}

async function logout(req, res) {
  const token = extractBearerToken(req);

  if (token) {
    destroySession(token);
  }

  return res.status(200).json({
    ok: true,
    message: "Logout realizado com sucesso."
  });
}

module.exports = {
  login,
  logout
};
