# 🎓 IST Batch Website

> **Our Students. Our Achievements. Our Events. Our Memories.**

The **IST Batch Website** is a dedicated digital platform created exclusively for our batch. It serves as a central place to showcase our students, document everyday events, recognize achievements and awards, and preserve important memories throughout our academic journey.

---

## 🌐 About the Project

This website is designed to become the **digital archive of our IST batch**.

Instead of keeping our achievements, events, and memories scattered across social media, group chats, and personal devices, everything can be organized in one website.

The platform will allow authorized members to manage and update information while students and batch members can view our latest activities and accomplishments.

---

## ✨ Main Features

### 👨‍🎓 Students

A dedicated section for our batch members.

Each student profile can contain:

* Name
* Profile picture
* Student information
* Achievements
* Awards
* Contributions
* Other relevant information

---

### 📅 Events

A timeline of what happens throughout our batch journey.

Examples:

* School activities
* Class activities
* Competitions
* Celebrations
* Projects
* Special events
* Important announcements

---

### 🏆 Awards

A dedicated section recognizing students who receive awards and honors.

Awards can include:

* Academic awards
* Competition awards
* Sports awards
* Leadership awards
* School recognitions
* Other achievements

---

### 🌟 Achievements

A place to showcase the accomplishments of our students.

Achievements can include:

* Academic accomplishments
* Programming and technology projects
* Competitions
* Certifications
* Leadership
* Extracurricular activities
* Other notable accomplishments

---

### 📸 Memories

Important photos and moments from our batch can be stored and displayed through the website.

Examples:

* Event photos
* Class photos
* Competition photos
* Celebrations
* Award ceremonies
* Special moments

---

## 🏗️ TECH STACK

The project uses a modern full-stack architecture.

```text
                    IST BATCH WEBSITE
                           │
             ┌─────────────┴─────────────┐
             │                           │
        NEXT.JS / REACT              TAILWIND CSS
             │                           │
             └─────────────┬─────────────┘
                           │
                        SUPABASE
             ┌─────────────┼─────────────┐
             │             │             │
        PostgreSQL       Auth         Storage
        Database        Login          Photos
             │
     ┌───────┼────────┬─────────┐
     │       │        │         │
 Students  Events  Awards  Achievements
```

---

## 💻 Tech Stack

### Frontend

**Next.js + React**

Used to build the website interface and application pages.

### Styling

**Tailwind CSS**

Used to create a responsive and modern design.

### Backend

**Supabase**

Provides the backend services required by the website.

### Database

**PostgreSQL**

Stores structured information such as:

* Students
* Events
* Awards
* Achievements

### Authentication

**Supabase Auth**

Handles authorized access and login functionality.

### Storage

**Supabase Storage**

Used to store:

* Profile pictures
* Event photos
* Award photos
* Achievement images

---

## 🗄️ Database Structure

The main database entities are:

```text
Students
    │
    ├── Achievements
    │
    └── Awards

Events
    │
    └── Photos
```

### Students

Stores information about batch members.

```text
id
name
section
profile_photo
bio
created_at
```

### Events

Stores information about batch events.

```text
id
title
description
event_date
location
created_at
```

### Awards

Stores awards and recognitions.

```text
id
student_id
award_name
description
date
photo
created_at
```

### Achievements

Stores student accomplishments.

```text
id
student_id
title
description
date
photo
created_at
```

---

## 🔐 Access & Security

Because the website contains real student information, access should be handled responsibly.

### Public Users

Can view:

* Student profiles
* Events
* Awards
* Achievements
* Public memories

### Authorized Users

Can:

* Add student information
* Create events
* Upload photos
* Add achievements
* Add awards
* Update website content

Authentication will be handled through **Supabase Auth**.

---

## 📱 Responsive Design

The website should work across different devices:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

Tailwind CSS will be used to create a responsive interface.

---

## 📂 Project Structure

A possible Next.js project structure:

```text
ist-batch-website/
│
├── app/
│   ├── page.tsx
│   ├── students/
│   ├── events/
│   ├── awards/
│   ├── achievements/
│   └── admin/
│
├── components/
│   ├── Navbar.tsx
│   ├── StudentCard.tsx
│   ├── EventCard.tsx
│   ├── AwardCard.tsx
│   └── AchievementCard.tsx
│
├── lib/
│   └── supabase.ts
│
├── public/
│   └── images/
│
├── styles/
│
├── .env.local
├── package.json
└── README.md
```

---

## 🚀 Development

### 1. Clone the repository

```bash
git clone <repository-url>
cd ist-batch-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

Create a Supabase project and configure the required environment variables.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

The website will be available locally through the development server.

---

## 🎯 Project Goals

The IST Batch Website aims to:

* Preserve our batch memories
* Recognize student achievements
* Showcase awards and accomplishments
* Document important events
* Keep batch information organized
* Create a digital record of our journey
* Strengthen our batch identity and community

---

## 🌱 Our Vision

This website is more than just a collection of pages.

It is a **digital record of our journey as IST students**.

As time passes, new events will happen, new achievements will be earned, and new memories will be created.

The website will grow with our batch.

> **Every student has a story.
> Every achievement has a moment.
> Every event becomes a memory.**

---

## 🎓 IST Batch

**Our Students • Our Achievements • Our Events • Our Memories**

Built by the IST Batch, for the IST Batch.
