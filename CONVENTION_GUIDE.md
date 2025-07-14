# Seraphine Hybrid V1 - Coding Convention & Structure Guide

## 🗂️ Folder Structure
```
src/
├── assets/
│   ├── images/
│   ├── icons/
│   ├── audio/
│   └── lottie/
├── components/
├── hooks/
├── pages/
├── styles/
├── utils/
```

## 📄 File Naming
- Gunakan `PascalCase.tsx` untuk React Component
- Gunakan `kebab-case.css` untuk style khusus
- Gunakan `camelCase.ts` untuk helper functions

## ✨ Component Rules
- 1 component per file
- Tambahkan komentar di atas setiap function utama
- Hindari hard-coded string → pakai constant jika berulang

## 💬 Commit Message Format
```
[fitur] / [fix] / [docs] / [chore] - Judul singkat
```

## 📱 Responsive
- Gunakan `flex`, `grid`, `w-full`, dan `max-w-` dari Tailwind
- Gunakan `@media` queries hanya jika benar-benar perlu
