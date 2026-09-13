# 📘 Manual de activación del panel /admin

Esta guía te lleva paso a paso desde cero hasta tener el panel funcionando.
Necesitarás unos **10 minutos** en total.

---

## Paso 1 — Subir la web a GitHub

Sube el contenido completo a tu repositorio `omarmaleck10/reformasdodo`,
rama `main`. Esto incluye las carpetas nuevas:

- `admin/` (2 archivos)
- `api/` (2 archivos: `auth.js` y `callback.js`)
- `content/` (fichas del CMS)
- `img/` (18 fotos JPG)
- Y `package.json` (nuevo, en la raíz)

Vercel detectará los cambios y desplegará automáticamente en 1-2 minutos.

---

## Paso 2 — Crear la aplicación OAuth en GitHub

Es lo que autoriza al panel para escribir en tu repo. Es gratis y solo hay
que hacerlo una vez.

1. Entra en: **https://github.com/settings/developers**
2. Pulsa **"OAuth Apps"** en el menú izquierdo
3. Pulsa **"New OAuth App"** (botón verde arriba a la derecha)
4. Rellena los 4 campos así:

   | Campo | Valor |
   |---|---|
   | **Application name** | `Reformas Dodo CMS` |
   | **Homepage URL** | `https://www.reformasdodo.com` |
   | **Application description** | (opcional, puedes dejarlo vacío) |
   | **Authorization callback URL** | `https://www.reformasdodo.com/api/callback` |

5. Pulsa **"Register application"** (botón verde abajo)

6. En la pantalla siguiente verás:
   - **Client ID**: una cadena tipo `Ov23liXxxxxxxxxxxxxx` — cópiala
   - Pulsa **"Generate a new client secret"** → cópialo también (solo se muestra 1 vez)

---

## Paso 3 — Añadir las claves como variables de entorno en Vercel

1. Entra en tu panel de Vercel: **https://vercel.com/dashboard**
2. Abre tu proyecto `reformasdodo`
3. Ve a **Settings** (arriba) → **Environment Variables** (menú izquierdo)
4. Añade **DOS variables**:

   **Variable 1:**
   - Name: `GITHUB_CLIENT_ID`
   - Value: (pega el Client ID que copiaste en el paso anterior)
   - Environment: marca las 3 opciones (Production, Preview, Development)
   - Pulsa **"Save"**

   **Variable 2:**
   - Name: `GITHUB_CLIENT_SECRET`
   - Value: (pega el Client Secret)
   - Environment: marca las 3 opciones
   - Pulsa **"Save"**

5. **Muy importante**: para que las variables se apliquen, hay que **redesplegar**.
   - Ve a la pestaña **"Deployments"** arriba
   - En el último despliegue, pulsa los 3 puntos `⋯` → **"Redeploy"**
   - Confirma → espera 1-2 minutos

---

## Paso 4 — Entrar en el panel

1. Ve a **https://www.reformasdodo.com/admin**
2. Verás la pantalla del CMS con un botón **"Login with GitHub"**
3. Pulsa el botón → se abrirá una ventana de GitHub
4. GitHub te pedirá autorizar la app "Reformas Dodo CMS" → **Authorize**
5. La ventana se cerrará sola y estarás dentro del panel ✅

---

## 🖼️ Cómo subir una foto nueva

Una vez dentro del panel:

1. Menú izquierdo → **📸 Galería de fotos**
2. Botón **"New Foto"** arriba a la derecha
3. Rellena:
   - **Título**: descripción corta (ej: "Reforma de baño moderno en Triana")
   - **Foto**: sube el JPG (mínimo 1200px de ancho, máx 500 KB)
   - **Descripción (alt SEO)**: texto que Google leerá
   - **Categoría**: Baño, Cocina, etc.
4. Pulsa **"Publish now"** (arriba a la derecha)
5. En 30-60 segundos la foto está en tu web

---

## 🐛 Si algo falla

**"Config file could not be loaded"**
→ Repasa que `admin/config.yml` está subido y el repo se llama `omarmaleck10/reformasdodo`

**"Error de configuración: falta GITHUB_CLIENT_ID"**
→ Faltan las variables de entorno en Vercel (Paso 3), o no has redesplegado tras añadirlas

**"Bad credentials" o "Unauthorized"**
→ El Client Secret es incorrecto — regenera uno nuevo en GitHub y actualízalo en Vercel

**El botón "Login with GitHub" no hace nada**
→ Abre la consola del navegador (F12 → Console) y mira si hay errores rojos

---

## 🔒 Notas de seguridad

- El `Client Secret` de GitHub **nunca** debe estar en el código del repo — por eso va en variables de entorno de Vercel
- Solo tú, con tu cuenta de GitHub, puedes autorizar la app y entrar al panel
- Si algún día quieres revocar el acceso: **https://github.com/settings/applications** → localiza "Reformas Dodo CMS" → **Revoke**
