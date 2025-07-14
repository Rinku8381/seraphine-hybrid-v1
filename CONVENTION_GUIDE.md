# Seraphine Hybrid V1 - Coding Convention & Structure Guide

## 🗂️ Folder Structure

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

## 📄 File Naming

- Use `PascalCase.tsx` for React Components
- Use `kebab-case.css` for custom styles
- Use `camelCase.ts` for helper functions

## ✨ Component Rules

- One component per file
- Add comments above each main function
- Avoid hard-coded strings → use constants for repeated values

## 💬 Commit Message Format

[feature] / [fix] / [docs] / [chore] - Short title

## 📱 Responsive

- Use `flex`, `grid`, `w-full`, and `max-w-` from Tailwind
- Use `@media` queries only when absolutely necessary
