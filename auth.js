// /api/auth.js — Redirige al usuario a GitHub para iniciar OAuth
// Este archivo es una Serverless Function de Vercel

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  
  if (!clientId) {
    return res.status(500).send('Error de configuración: falta GITHUB_CLIENT_ID');
  }
  
  // URL de callback (a donde GitHub te devuelve tras autorizar)
  const host = req.headers.host;
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;
  
  // Genera state aleatorio para prevenir CSRF
  const state = Math.random().toString(36).substring(2, 15);
  
  // Redirige a GitHub
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
  githubAuthUrl.searchParams.set('scope', 'repo,user');
  githubAuthUrl.searchParams.set('state', state);
  
  res.redirect(302, githubAuthUrl.toString());
}
