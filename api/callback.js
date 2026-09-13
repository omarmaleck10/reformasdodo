// /api/callback.js — Callback de GitHub OAuth
// Recibe el 'code' de GitHub, lo intercambia por un token de acceso,
// y lo devuelve a Decap CMS mediante postMessage.

export default async function handler(req, res) {
  const { code, state } = req.query;
  
  if (!code) {
    return res.status(400).send('Falta el código de autorización');
  }
  
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return res.status(500).send('Error de configuración: faltan variables de entorno');
  }
  
  try {
    // Intercambiar el code por un access_token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error || !tokenData.access_token) {
      const errorMsg = tokenData.error_description || tokenData.error || 'Error desconocido';
      return res.status(400).send(`Error al obtener token: ${errorMsg}`);
    }
    
    const token = tokenData.access_token;
    
    // Devolver el token a Decap CMS mediante postMessage
    // Decap CMS espera este formato exacto en el mensaje
    const message = {
      token: token,
      provider: 'github',
    };
    
    // HTML que envía el mensaje al padre (ventana del CMS) y cierra
    const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Autenticando...</title></head>
<body style="font-family:sans-serif;padding:40px;text-align:center;background:#0F2D22;color:white">
  <h2>✓ Autenticación correcta</h2>
  <p>Cerrando ventana y volviendo al panel...</p>
  <script>
    (function() {
      function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        // Enviar el token al opener
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify(message)}',
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      
      window.addEventListener("message", receiveMessage, false);
      
      // Notificar al padre que estamos listos para enviar
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
    
  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).send('Error interno: ' + error.message);
  }
}
