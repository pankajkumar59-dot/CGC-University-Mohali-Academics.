# CGC University Mohali - Student Portal (2026 Model)

Comprehensive academic portal for CGC University Mohali (Landran & Jhanjeri), featuring 2026 Model syllabus, attendance tracking, study repositories, and multi-turn AI Copilot.

---

## ❓ GitHub Repository se direct open kyu nahi ho raha tha? (Why it wasn't opening directly from GitHub)

1. **GitHub ek Code Repository hai, Browser nahi:**
   - Jab aap GitHub par kisi `.html` ya `.tsx` file par click karte hain, to GitHub sirf code (text) dikhata hai, website run nahi karta.
2. **React + TypeScript (Vite):**
   - Is project me `src/main.tsx` (TypeScript) use ho raha hai. Browsers direct `.tsx` file run nahi kar sakte; ise build (`npm run build`) karke `.js` me convert karna hota hai.
3. **Asset Base Path:**
   - Humne ab `vite.config.ts` me `base: './'` set kar diya hai aur `.github/workflows/deploy.yml` add kar diya hai, jisse GitHub Pages par bina kisi path error ke website chal sakegi.

---

## 🚀 Option 1: GitHub Pages par LIVE chalane ka tarika (FREE Live Website)

Aapki repository me automated **GitHub Actions** deploy script add kar di gayi hai:

1. Apne GitHub Repository me jayein: `https://github.com/<your-username>/<repo-name>`.
2. Upar **Settings** tab par click karein.
3. Left sidebar me **Pages** par click karein.
4. **Build and deployment** section me:
   - **Source**: Dropdown se **`GitHub Actions`** select karein.
5. Ab **Actions** tab me jayein — aapka app automatically build hokar live URL ban jayega:
   `https://<your-username>.github.io/<repo-name>/`

---

## 💻 Option 2: Apne Computer (VS Code / Terminal) me Run karne ka tarika

Apne laptop/PC par chalane ke liye:

1. **Repository Clone karein**:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Dependencies Install karein**:
   ```bash
   npm install
   ```

3. **Development Server Start karein**:
   ```bash
   npm run dev
   ```

4. **Browser me Open karein**:
   - Browser me open karein: [http://localhost:3000](http://localhost:3000)

---

## 📦 Production Build (Static HTML / JS generate karne ke liye)

Agar aapko normal static folder chahiye:
```bash
npm run build
```
Yeh command `dist/` folder bana degi jisme pure HTML, CSS, aur JS files honge jinhe aap Netlify, Vercel, GitHub Pages, ya kisi bhi web hosting par direct upload kar sakte hain.

---

## 🛠️ Tech Stack
- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Vite
- **AI Models**: Google Gemini 3.5 & 3.8 Flash, Deep Reasoning
