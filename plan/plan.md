# 🌤 UIHeaven — Full Project Plan (Production-Grade, Resume-Level)

---

# 🧠 0. Vision

UIHeaven is a developer platform to:

* Discover reusable UI components
* Preview them instantly
* Copy and use in real projects
* Evaluate quality through community signals

---

# 🎯 Core Philosophy

* HTML-first (framework agnostic)
* Zero-friction usage (no login to copy/view)
* Controlled environment (Tailwind + Alpine injection)
* Signal-driven quality (votes, reports, usage)

---

# 🏗 1. Tech Stack

## Frontend

* Next.js (App Router)
* TypeScript (strict)
* Tailwind CSS
* shadcn/ui

## Backend

* Supabase

  * Auth
  * PostgreSQL
  * Storage

## Processing

* Prettier (format HTML)
* html2canvas (thumbnail generation)

---

# 🧱 2. System Architecture

## High-Level Flow

1. User uploads component
2. System processes:

   * sanitize HTML
   * format code
   * generate thumbnail
3. Store in DB
4. Render via sandbox iframe
5. Users interact (vote, comment, etc.)

---

# 📦 3. Database Schema (PostgreSQL)

## users

```sql
id (uuid, pk)
email
username
avatar_url
created_at
```

---

## components

```sql
id (uuid, pk)
title
description
code_html
tailwind_version (v4 | v3 | none)
has_alpine (boolean)
author_id (fk -> users.id)

views (int)
copies (int)
upvotes_count (int)
reports_count (int)
score (float)

thumbnail_url

is_hidden (boolean default false)

created_at
updated_at
```

---

## tags

```sql
id (uuid, pk)
name (unique)
```

---

## component_tags

```sql
component_id (fk)
tag_id (fk)
```

---

## upvotes

```sql
id (uuid, pk)
user_id (fk)
component_id (fk)
created_at

UNIQUE(user_id, component_id)
```

---

## bookmarks

```sql
id (uuid, pk)
user_id (fk)
component_id (fk)
created_at
```

---

## reports

```sql
id (uuid, pk)
user_id (fk)
component_id (fk)
reason (enum)
created_at

UNIQUE(user_id, component_id)
```

---

## comments

```sql
id (uuid, pk)
user_id (fk)
component_id (fk)
parent_id (nullable)
content
created_at
```

---

# 🖥 4. Preview Engine

## Behavior

* Render in sandboxed iframe
* Inject dependencies dynamically

---

## Injection Template

```html
<html>
<head>
  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Alpine -->
  <script defer src="https://unpkg.com/alpinejs"></script>
</head>
<body>
  <!-- USER HTML -->
</body>
</html>
```

---

## Features

* Live preview
* Device switcher:

  * mobile
  * tablet
  * desktop
* Dark/light mode toggle

---

# 🎨 5. Tailwind Version System

## Options

* v4 (default)
* v3
* none

---

## Logic

* Inject script based on selected version
* Show disclaimer:

  > Preview uses CDN environment

---

# 🖼 6. Thumbnail System

## Generation (Frontend)

* Render hidden preview
* Capture using html2canvas
* Upload to storage

---

## Rules

* Fixed size (800x600)
* Fallback if fails
* Optional manual override (future)

---

# 📋 7. Upload Pipeline

## Steps

1. Validate input
2. Format HTML (Prettier)
3. Sanitize HTML
4. Detect:

   * Tailwind usage
   * Alpine usage
5. Generate thumbnail
6. Save component

---

# 🔍 8. Search System

## Fields

* title
* description
* tags

---

## Behavior

* case insensitive
* partial matching
* ranked by:

  * relevance
  * popularity

---

## Filters

* tags
* latest
* popular

---

# 👍 9. Interaction System

## Upvote

* 1 user = 1 vote
* toggle allowed

---

## Bookmark

* saved per user

---

## Comment

* max 2-level nesting
* user editable

---

## Report

### Reasons (fixed)

* broken UI
* misleading thumbnail
* spam
* not responsive

---

## Auto Moderation

```ts
if (reports_count >= 5) {
  is_hidden = true;
}
```

---

# 📊 10. Analytics System

Tracked:

* views
* copies
* upvotes

---

# 🧠 11. Scoring System

```ts
score =
  (upvotes_count * 2) +
  (copies * 3) +
  (views * 0.5)
```

---

## Labels

* ⭐ Verified → score > threshold_1
* 🚀 Production Ready → score > threshold_2

---

# 🏷 12. Tag System

* multi-tag support
* normalized table
* tag suggestions (future)

---

# 📁 13. Collections (Optional v1.1)

* create collection
* add/remove components
* public/private

---

# 🍴 14. Fork System (Optional v1.1)

* duplicate component
* link to original

---

# 🔐 15. Security

* sanitize HTML
* sandbox iframe:

  * no top navigation
  * no access to parent
* restrict script execution scope

---

# ⚙️ 16. API Design

## Components

* GET /components
* GET /components/:id
* POST /components
* PUT /components/:id
* DELETE /components/:id

---

## Interactions

* POST /upvote
* DELETE /upvote
* POST /bookmark
* POST /report
* POST /comment

---

# 🎯 17. Access Rules

## Public (no login)

* view components
* copy code
* search

---

## Auth required

* upload
* upvote
* comment
* bookmark
* report

---

# 🚀 18. Development Phases

## Phase 1 (Core)

* Auth
* Upload
* Preview
* Search
* Copy

---

## Phase 2 (Engagement)

* Upvote
* Bookmark
* Comments
* Reports

---

## Phase 3 (Polish)

* Thumbnail system
* scoring
* moderation

---

# 🧪 19. Edge Cases

* empty HTML → reject
* broken layout → allow but reportable
* missing Tailwind → still render
* large HTML → limit size

---

# 🧨 20. What Makes This Resume-Level

* real-world tradeoffs (CDN, versioning)
* sandbox security
* interaction system design
* moderation logic
* analytics + scoring

---

# 🏁 Final Goal

A clean, performant, developer-focused UI platform that demonstrates:

* full-stack capability
* product thinking
* system design
* real engineering decisions

---
