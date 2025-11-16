# 🎬 Movies App — Next.js 16, React 19, OMDb API

A modern movie search application built using **Next.js App Router**, **React 19**, and **OMDb API**.  
The app supports movie searching, details view, pagination, and saving favorites in `localStorage`.

---

## 📌 Features

### 🔍 Movie Search

- Search by movie title
- Optional filters: **year**, **type** (movie / series / episode)
- Form validation with user-friendly error messages

### 📄 Results & Pagination

- Server-side fetching using App Router
- Smart validation & clamping of page numbers
- Smooth UI transitions using `useTransition` and custom `UIContext`
- Skeleton loading indicators & disabled UI during transitions

### 🎞️ Movie Details Page

- Full movie details fetched from OMDb API
- Back button to return to list
- Favorite toggle available on detail view

### ❤️ Favorites System

- Favorites stored in `localStorage`
- Global state management via `FavoritesProvider`
- Favorites list with pagination
- Auto-adjust page number when items are removed
- Prevents duplicate favorites

### 🧪 Unit Testing

Implemented with:

- **Jest**
- **React Testing Library**
- **JS-DOM environment**

Includes tests for:

- Validation utilities
- Form validation
- Error messages
- Navigation helpers

---

## 🛠️ Tech Stack

| Technology     | Usage                                  |
| -------------- | -------------------------------------- |
| Next.js 16     | App Router, server components, routing |
| React 19       | UI, transitions                        |
| TypeScript     | Strong typing                          |
| TailwindCSS v4 | Styling                                |
| Jest + RTL     | Unit testing                           |
| OMDb API       | Movie data                             |

---

## 🚀 Getting Started

##### 1. Clone project

```
git clone https://github.com/drozdzyk667/future_mind
cd future_mind
```

##### 2. Install dependencies

```
pnpm install
```

##### 3. OMDBI key

```
create .env.local file in root, with
OMDB_API_KEY=<your_api_omdb_key_here>
```

##### 4. Run

```
pnpm dev
```

##### 5. Testing

```
pnpm run test
```

## 🚀 Project Structure

```
src/
├─ app/
│ ├─ movies/
│ ├─ movie/[id]/
│ ├─ favorites/
│ ├─ api/
│ └─ ...
│
├─ components/
│ ├─ MoviesList/
│ ├─ MovieCard/
│ ├─ FavoriteButton/
│ └─ ReturnButton/
│ └─ ...
│
├─ helpers/
│ ├─ validators/
│ ├─ hooks/
│ └─ types/
│
├─ lib/
│ ├─ omdb.ts
│ ├─ FavoritesContext.tsx
│ └─ UITransitionContext.tsx
```
