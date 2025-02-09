# Habitudes - Habits tracker

## Project Overview

SaaS to easily track habits

### Workflow

1. User wants to track something (for instance his sport session)
2. He create a new entry called sport
3. That generates a new line for sport activity
4. The user can click on the day in the line to add a new sport acitivity that is displayed on screen

---

## MVP

- **Features**

  - User can create a new activity line
  - User can check days to add activity on a line
  - User can uncheck days to remove activity from line
  - User can delete an activity line

- **App details**
- Everything is stored in the user localStorage
- User don't have to log in as everything is in localStorage
- The app has only two pages: landing page and dashboard
- Landing page describes the app with proper SEO and such
- Dashboard displays activity lines

## File Structure

- `src/`
  - `app/`
    - dashboard
      - `page.tsx`
    - (landing)
      - `page.tsx`
    - `layout.tsx`
    - `api/`
    - `components/`
  - `lib/`
  - `store/`
    - `features/`
  - `utils/`

---

## Tech Stack

- TypeScript
- NextJS App Router
- Tailwind

---

## Documentation

- [NextJS App Router](https://nextjs.org/docs/app/building-your-application/routing)
- [Tailwind](https://tailwindcss.com/docs/installation)
