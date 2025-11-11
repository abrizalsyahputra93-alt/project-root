import fetch from "node-fetch";

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "Code missing" });

  try {
    const params = new URLSearchParams({
      client_id: process.env.VITE_KICK_CLIENT_ID,
      client_secret: process.env.KICK_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.VITE_KICK_REDIRECT_URI
    });

    const tokenRes = await fetch("https://kick.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });
    const data = await tokenRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
