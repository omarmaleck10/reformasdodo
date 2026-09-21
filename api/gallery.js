// ══════════════════════════════════════════════════════════════
// API · Galería de proyectos desde el CMS
// ══════════════════════════════════════════════════════════════
// Lee los archivos .md que Decap crea en /content/imagenes/
// y devuelve JSON con las fotos publicadas, ordenadas.
// Se cachea en el edge de Vercel para no llamar a GitHub en cada request.
// ══════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  try {
    const owner = 'omarmaleck10';
    const repo = 'reformasdodo';
    const branch = 'main';
    const path = 'content/imagenes';

    // 1. Lista los archivos .md de content/imagenes en GitHub
    const listUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const listResp = await fetch(listUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'reformasdodo-gallery'
      }
    });

    if (!listResp.ok) {
      // Si la carpeta no existe todavía, devolvemos array vacío en vez de error
      if (listResp.status === 404) {
        res.setHeader('Cache-Control', 'public, s-maxage=60');
        return res.status(200).json({ items: [] });
      }
      throw new Error(`GitHub API ${listResp.status}`);
    }

    const files = await listResp.json();
    const mdFiles = Array.isArray(files) ? files.filter(f => f.name.endsWith('.md')) : [];

    // 2. Descarga y parsea cada .md en paralelo
    const items = await Promise.all(
      mdFiles.map(async (f) => {
        const raw = await fetch(f.download_url).then(r => r.text());
        return parseFrontmatter(raw, f.name);
      })
    );

    // 3. Filtra solo publicadas y ordena por "orden" ascendente
    const publicadas = items
      .filter(i => i && i.publicado === true && i.imagen)
      .sort((a, b) => (a.orden ?? 50) - (b.orden ?? 50));

    // 4. Cachea en CDN 5 minutos, revalida 1 hora en segundo plano
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({ items: publicadas, total: publicadas.length });

  } catch (err) {
    console.error('gallery.js error:', err);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(500).json({ error: 'No se pudo cargar la galería', message: err.message, items: [] });
  }
}

// ── Parser mínimo de front-matter YAML ──
// Decap escribe archivos como:
//   ---
//   titulo: "Reforma de baño en Nervión"
//   imagen: "/img/reforma-bano-nervion.jpg"
//   categoria: "Baño"
//   publicado: true
//   orden: 10
//   ---
function parseFrontmatter(raw, filename) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;
  const body = match[1];
  const data = { _filename: filename };
  for (const line of body.split('\n')) {
    const m = line.match(/^([a-z_][a-z0-9_]*)\s*:\s*(.*)$/i);
    if (!m) continue;
    let val = m[2].trim();
    // Quitar comillas
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Convertir tipos
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    else if (val !== '' && !isNaN(Number(val))) val = Number(val);
    data[m[1]] = val;
  }
  return data;
}
