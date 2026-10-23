export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { question } = req.body;
  
  // LA CLÉ EST SÉCURISÉE ICI - elle vient de Vercel, pas du code
  const GROQ_KEY = process.env.GROQ_API_KEY;

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Authorization": "Bearer " + GROQ_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Tu es BLENDED AI, l'assistant de l'app de rencontre BLENDED." },
          { role: "user", content: question }
        ],
        max_tokens: 800
      })
    });

    const data = await r.json();
    return res.status(200).json({ answer: data.choices[0].message.content });
  } catch (e) {
    return res.status(500).json({ answer: "Erreur: " + e.message });
  }
}
