import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { token, channel, message } = req.body;
  if (!token || !channel || !message) return res.status(400).json({ error: "Missing params" });

  try {
    const chatRes = await fetch(`https://kick.com/api/v1/channels/${channel}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: message })
    });
    const data = await chatRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

