# 📘 Manual del panel de administración

Este documento te explica cómo entrar en tu panel de contenidos y cómo gestionar
las imágenes y textos de la web sin necesidad de tocar código.

---

## ⚙️ Configuración inicial (una sola vez)

Antes de que puedas entrar en el panel `/admin`, hay que configurar 2 cosas:

### 1. Edita `admin/config.yml` con los datos de tu repo

Abre el archivo `admin/config.yml` y sustituye **`USUARIO/REPOSITORIO`** por
el nombre real de tu repositorio de GitHub.

Por ejemplo, si tu repo está en `https://github.com/moha-dodo/reformasdodo-web`,
entonces la línea debe quedar:

```yaml
backend:
  name: github
  repo: moha-dodo/reformasdodo-web
  branch: main
```

### 2. Autoriza el panel con tu cuenta de GitHub

La primera vez que entres en `www.reformasdodo.com/admin`, verás un botón
"Login with GitHub". Al pulsarlo:

1. Se abrirá una ventana de GitHub pidiendo permisos
2. Concede permisos de lectura/escritura solo sobre TU repo de la web
3. Ya estarás dentro del panel

**Nota**: el panel usa el servicio gratuito de autenticación de Netlify
(no necesitas crear cuenta en Netlify, solo se usa como pasarela OAuth).

---

## 🖼️ Cómo subir una foto nueva

1. Entra en `www.reformasdodo.com/admin`
2. En el menú izquierdo, pulsa **📸 Galería de fotos**
3. Botón **"New Foto"** arriba a la derecha
4. Rellena los 4 campos:
   - **Título de la foto**: nombre descriptivo (ej: "Reforma de baño moderno en Triana")
   - **Foto**: pulsa "Choose an image" y sube el JPG desde tu ordenador o móvil
   - **Descripción (alt SEO)**: texto que Google leerá (ej: "Reforma completa de baño moderno con mampara y mueble gris en Triana, Sevilla — Reformas Dodo")
   - **Categoría**: elige Baño, Cocina, Fachada, etc.
5. Pulsa **"Publish now"** (esquina superior derecha)
6. En 30-60 segundos la foto estará disponible en `/img/nombre-foto.jpg`

### Reglas para las fotos que subas

- **Formato**: JPG o PNG
- **Tamaño ideal**: mínimo 1200px de ancho para que se vea bien
- **Peso máximo recomendado**: <500 KB (si pesa mucho, comprímela primero en https://tinypng.com)
- **Nombres claros**: pon títulos con palabras clave que la gente busque en Google

---

## ✏️ Cómo cambiar el teléfono o el email de la web

1. Entra en el panel `/admin`
2. Menú **⚙️ Ajustes generales** → **Datos de contacto**
3. Cambia lo que necesites
4. **"Publish now"**

Nota: aunque el panel guarda los cambios, para que se apliquen visualmente
en toda la web necesitas que un desarrollador actualice las páginas con
esos nuevos datos. Este panel guarda los datos pero no los inyecta
automáticamente en cada HTML (limitación de webs 100% estáticas).

---

## 📝 Cómo crear un artículo nuevo del blog

1. Entra en el panel `/admin`
2. Menú **📝 Artículos del blog**
3. **"New Artículo"**
4. Rellena todos los campos:
   - **Título**: título del artículo (ej: "5 errores al reformar un baño en Sevilla")
   - **URL (slug)**: sin acentos, sin espacios (ej: `errores-reformar-bano-sevilla`)
   - **Fecha**: fecha de publicación
   - **Foto de portada**: sube una imagen relacionada
   - **Resumen (SEO)**: 1-2 frases que Google mostrará (máx 155 caracteres)
   - **Categoría**: Baños, Cocinas, etc.
   - **Contenido**: escribe el artículo con el editor visual
5. **"Publish now"**

El artículo se guarda como fichero `.md` en `/content/blog/`. Para que aparezca
publicado en la web tal cual (con URL propia y diseño integrado), un
desarrollador tiene que generar el `.html` correspondiente a partir del `.md`.

Alternativa: puedes copiar el texto que has escrito y pedir que se cree
manualmente la página HTML del artículo con el mismo diseño que los demás.

---

## 🔒 Seguridad

- **Solo tú tienes acceso** (usuario configurado en `admin/config.yml`)
- El panel está bloqueado a Google (no aparecerá en resultados de búsqueda)
- Todos los cambios quedan **registrados en GitHub** con tu autoría — historial completo
- Si algún día quieres revertir un cambio, puedes hacerlo desde el histórico de GitHub

---

## ❓ Preguntas frecuentes

**¿Puedo entrar desde el móvil?**
Sí. El panel es totalmente responsive y funciona bien en móviles y tablets.

**¿Cuánto tarda en aparecer un cambio?**
Entre 30 segundos y 2 minutos (el tiempo que Vercel tarda en redesplegar).

**¿Pierdo cambios si me equivoco?**
No. GitHub guarda un historial completo. Cualquier cambio se puede revertir.

**¿Puedo añadir más gente al panel?**
Sí, cualquier usuario con acceso al repo de GitHub podrá entrar.

**¿Tiene coste?**
No. GitHub y Vercel son gratis en el plan que usas. Decap CMS es open source.
