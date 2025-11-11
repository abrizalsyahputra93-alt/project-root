import fetch from 'node-fetch';

export default async function handler(req, res){
  const code = req.query.code;
  if(!code) return res.status(400).json({error:'No code'});

  const params = new URLSearchParams({
    client_id: process.env.VITE_KICK_CLIENT_ID,
    client_secret: process.env.KICK_CLIENT_SECRET,
    redirect_uri: process.env.VITE_KICK_REDIRECT_URI,
    grant_type: 'authorization_code',
    code
  });

  const response = await fetch('https://kick.com/api/oauth/token',{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:params.toString()
  });

  const data = await response.json();
  res.status(200).json(data);
}
