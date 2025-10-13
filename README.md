# README.md — Talents

## Project name
Talents

## What is Talents?
**Talents** is a Next.js + TypeScript + TailwindCSS web project that showcases music artists, their record label, new releases, blogs, and an e-commerce section for selling tickets or tracks. It’s a modern full-stack template for music-based or entertainment websites.  
Anyone can use or modify it for their own music, record label, or entertainment project.

## Key Features
- **Artist Showcase:** Displays all music artists with their pictures, details, and social links.
- **New Releases Page:** Highlights the latest music releases with audio/video preview using `react-player`.
- **Record Label Info:** Section about the record label, brand, and team.
- **Blog Section:** For posting news, updates, and stories about artists.
- **E-commerce Section:** Where users can buy tickets, tracks, or merchandise.
- Built with **Next.js 15**, **TailwindCSS 3**, and **TypeScript**.

## Tech Stack
- Next.js 15 (React 19)
- Typescript 5.9
- TailwindCSS 3
- Framer Motion (animations)
- React Icons / Lucide React (icons)
- React Player (for audio/video previews)
- Next SEO (SEO management)

## Installation & Setup
1. Clone or download this project.
2. Open a terminal inside the project folder.
3. Install all dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

5. To build for production:

```bash
npm run build
npm start
```

## Project Structure
```
talents/
├─ public/
│  ├─ images/
│  └─ icons/
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ pages/
│  ├─ sections/
│  ├─ styles/
│  ├─ utils/
│  └─ types/
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
├─ README.md
└─ LICENSE.md
```

## How to Customize
- Replace images and text in the `/public/images` and `/src/sections` folders.
- Add or edit artists in `/src/data/artists.json` (or your preferred data source).
- Use `react-player` to embed video/audio for new releases.
- Update Tailwind theme in `tailwind.config.js` for your color palette.

## Deployment
You can deploy easily using **Vercel**, **Netlify**, or **Render**.  
For example, with Vercel:

```bash
vercel
```

## Contribution
1. Fork this repository.
2. Create a feature branch.
3. Commit and push your changes.
4. Open a pull request.

Please keep PRs clean and focused.

## Notes
- This is a **template project**, not a real music platform.
- Replace demo data and media with your own assets before publishing.
- Always credit images, icons, or content that aren’t yours.

---

# LICENSE.md — MIT License 

```
MIT License

Copyright (c) <YEAR> <COPYRIGHT HOLDER>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Plain Language Summary
- You can use this project for free.
- You can change and share it.
- You can use it in your own project (even for business).
- Keep this license notice in your version.
- The author is not responsible for any damages or issues.

## Copyright
```
Copyright (c) 2025 dewolecodes
```
