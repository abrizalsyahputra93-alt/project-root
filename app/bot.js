import fetch from 'node-fetch';

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const {channel, token} = req.body;
  if(!channel || !token) return res.status(400).json({error:'Missing channel or token'});

  // contoh kirim pesan
  const response = await fetch(`https://kick.com/api/v2/channels/${channel}/messages`,{
    method:'POST',
    headers:{
      'Authorization':`Bearer ${token}`,
      'Content-Type':'application/json'
    },
    body:JSON.stringify({content:'Hello from Kick Bot!'})
  });

  const data = await response.json();
  res.status(200).json({message:'Pesan dikirim!', data});
}
