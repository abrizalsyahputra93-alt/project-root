import fetch from 'node-fetch';

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({ error:'Method tidak diizinkan' });
  const { channel, token } = req.body;
  if(!channel||!token) return res.status(400).json({ error:'Channel/token tidak ada' });

  try{
    const r = await fetch(`https://kick.com/api/v2/messages/send/${channel}`,{
      method:'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ content: 'Bot aktif! 🎉' })
    });
    const data = await r.json();
    res.status(200).json({ message:'Pesan terkirim!' });
  } catch(e){
    res.status(500).json({ error:e.message });
  }
}
