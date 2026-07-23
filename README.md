# JP Surf Boards

Site institucional e catálogo da **JP Surf Boards** — pranchas de surf de alta performance, shapadas sob medida em Florianópolis, SC.

🔗 Produção: https://jpsurfboards.com.br

---

## 🧱 Stack

- **React 19** + **TypeScript**
- **Vite 8** (build e dev server)
- CSS-in-JS (estilos inline + blocos `<style>` por componente)
- Deploy na **Vercel** (build automático a partir da branch `main`)

---

## 🚀 Rodando localmente

Pré-requisito: **Node.js 18+**.

```bash
npm install      # instala as dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # build de produção (gera a pasta dist/)
npm run preview  # pré-visualiza o build de produção
npm run lint     # verifica o código com ESLint
```

> ⚠️ A pasta `dist/` é gerada automaticamente pelo build. **Nunca edite arquivos dentro dela** — ela é apagada e recriada a cada `npm run build`. Todo asset (imagens, vídeo) vai em `public/`.

---

## 📁 Estrutura do projeto

```
public/
  boards/                 # fotos das pranchas, uma pasta por modelo
    dark-rabbit/
      dark-rabbit.png         # logo/capa do modelo (aparece no card)
      dark-rabbit-1.jpg       # foto 1 (FRENTE)
      dark-rabbit-2.jpg       # foto 2 (FUNDO)
      dark-rabbit-3.jpg       # fotos extras (opcional)
      dark-rabbit-thumb.webp  # miniatura usada no configurador
    ...
  hero/
    hero-ocean.mp4         # vídeo de fundo da Hero
    inicio.webp            # imagem poster/fallback do vídeo
  gallery/                 # fotos da "Galeria do Processo"
  robots.txt               # indexação
  sitemap.xml              # mapa do site
src/
  components/              # seções do site (Hero, About, Catalog, etc.)
  data/
    boards.ts              # 👈 dados de TODAS as pranchas (fonte da verdade)
  App.tsx                  # montagem das seções + botões flutuantes
index.html                 # <head>, SEO, meta tags, dados estruturados
```

---

## 🏄 Gerenciando as pranchas (modelos)

Todos os dados dos modelos ficam em **`src/data/boards.ts`**. A ordem do array
define a ordem em que as pranchas aparecem no site inteiro (catálogo, índice,
rodapé, configurador).

### Padrão de fotos (importante)

Cada modelo tem uma pasta em `public/boards/{modelo}/` com este padrão:

| Arquivo | O que é |
|---|---|
| `{modelo}.png` | Logo/capa (aparece no card branco) |
| `{modelo}-1.jpg` | **Frente** da prancha |
| `{modelo}-2.jpg` | **Fundo** da prancha |
| `{modelo}-3.jpg`, `-4.jpg`... | Fotos extras (opcional) |
| `{modelo}-thumb.webp` | Miniatura (configurador) |

Regras:
- Use sempre **extensão minúscula** (`.jpg`, não `.JPG`) — a Vercel diferencia maiúsculas/minúsculas e imagens com `.JPG` quebram em produção.
- Depois de adicionar fotos numa pasta, registre-as no campo `gallery` do modelo em `boards.ts`:

```ts
gallery: [
  "/boards/dark-rabbit/dark-rabbit.png",   // capa (sempre primeiro)
  "/boards/dark-rabbit/dark-rabbit-1.jpg", // frente
  "/boards/dark-rabbit/dark-rabbit-2.jpg", // fundo
],
```

As fotos abrem em um **modal (lightbox)** ao clicar no card. A capa (`.png`) não
aparece dentro do lightbox — só as fotos reais.

---

## 🎬 Trocando o vídeo da Hero

1. Coloque o novo arquivo em `public/hero/`.
2. Atualize a constante no topo de `src/components/Hero.tsx`:

```ts
const HERO_VIDEO_SRC = '/hero/hero-ocean.mp4';
const HERO_VIDEO_POSTER = '/hero/inicio.webp';
```

> 💡 Comprima o vídeo (ideal ~2–3MB) antes de subir, para o site carregar rápido no celular.

---

## 🔎 SEO, Google Search Console e Analytics

O SEO base já está pronto em `index.html` (title, description, Open Graph,
Twitter Card, geo tags e dados estruturados de negócio local). Há também
`public/robots.txt` e `public/sitemap.xml`.

### Ativar o Google Search Console
1. Acesse https://search.google.com/search-console e adicione a propriedade `jpsurfboards.com.br`.
2. Escolha o método **"tag HTML"** e copie o código de verificação.
3. Em `index.html`, descomente e preencha a linha:
   ```html
   <meta name="google-site-verification" content="COLE_O_CODIGO_AQUI" />
   ```
4. Faça o deploy e clique em "Verificar".
5. Envie o sitemap: `https://jpsurfboards.com.br/sitemap.xml`.

### Ativar o Google Analytics (GA4)
1. Crie uma propriedade GA4 em https://analytics.google.com e copie o ID (`G-XXXXXXXXXX`).
2. Em `index.html`, descomente o bloco do Google Analytics e substitua `G-XXXXXXXXXX` pelo seu ID.
3. Faça o deploy.

---

## 🌐 Deploy

O site é publicado automaticamente pela **Vercel** a cada push na branch `main`.

```bash
git add -A
git commit -m "sua mensagem"
git push origin main
```

Em segundos a Vercel builda e publica em https://jpsurfboards.com.br.

**Domínio:** configurado no Registro.br apontando para a Vercel
(registro `A` + `CNAME www`).

---

## 📞 Contato do negócio

- WhatsApp: +55 (48) 99166-3544
- Instagram: [@jp.surfboards](https://www.instagram.com/jp.surfboards)
- Local: Florianópolis, SC

---

Desenvolvido por [doesnotzero.dev](https://www.instagram.com/doesnotzero.dev)
