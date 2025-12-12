# 🌍 Travel Buddy & Meetup Platform (Next.js + Shadcn UI + TypeScript)

A modern **social-travel web platform** built with **Next.js**, **TypeScript**, and **Shadcn UI**, designed to connect travelers and help them find compatible travel companions.  
It includes **JWT-based authentication**, **role-based access**, dynamic **travel plan management**, **search & matching**, and **subscription-based premium features**.

---

## 🚀 Live Demo

**Frontend live:** https://tourmateassignment8.vercel.app/
**Backend live:**  https://assignment8-api-server.vercel.app/

**Frontend GitHub:** https://github.com/sojibshekh/next-lavel-a8-front
**Backend GitHub:** https://github.com/sojibshekh/next-lavel-a8-server

**Admin Credentials:**  
Email: admin@gmail.com  
Password: Admin123

---

## 🧭 Project Overview

**Travel Buddy & Meetup Platform** empowers solo travelers to connect with like-minded explorers.  
Users can create detailed travel plans, search for matches, request to join trips, and leave post-trip reviews. Admins can manage users, plans, and platform content via a dedicated dashboard.

---

## ✨ Core Objectives

- Build a social-travel platform connecting travelers worldwide  
- Enable traveler matching based on destination, dates, and interests  
- Allow users to create and manage travel profiles and plans  
- Secure UI/UX with role-based authentication  
- Integrate subscription payments for premium features  

---

## 🏗️ Features

### 🔓 Public Features
- Landing page showcasing top destinations and recommended matches  
- Search & match travelers by destination, date, and interests  
- Public profiles showing travel history, reviews, and interests  

### 🔐 Authenticated User Features
- JWT-based login & registration  
- Create, edit, and delete travel plans  
- Request to join other users’ travel plans  
- Leave and manage reviews after trips  
- Dashboard overview of upcoming trips and matched travelers  

### 🔐 Admin Features
- Manage users and travel plans  
- Access platform activity and analytics  
- Approve or remove content as needed  

### 💳 Payment Features
- Subscription plans (monthly/yearly)  
- Verified badge for premium users  
- Integration with Stripe/SSLCommerz or other gateways  

### 📍 Optional Features
- Map integration showing nearby travelers  
- In-app notifications  
- Media sharing for trip photos  

---

## 🧰 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15 + TypeScript |
| **Styling / UI** | Shadcn UI + Tailwind CSS |
| **Auth** | JWT + Cookies |
| **Payment** | Stripe / SSLCommerz |
| **Images** | Cloudinary / ImgBB |
| **Deployment** | Vercel / Netlify |

---


### API Endpoints (Frontend consumes)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login | User login |
| GET    | /api/users/:id | Get user profile |
| PATCH  | /api/users/:id | Update profile |
| POST   | /api/travel-plans | Create travel plan |
| GET    | /api/travel-plans | Get all travel plans |
| GET    | /api/travel-plans/match | Search & match travelers |
| POST   | /api/reviews | Add review |
| POST   | /api/payments/create-intent | Create payment intent |

---

## 🖼️ UI/UX Design

- Clean, responsive design with **Shadcn UI** components  
- Dynamic forms for travel plan creation  
- Interactive search and match page  
- User-friendly dashboard with quick overview  

---

## 📌 Notes

- Ensure backend API is running for the frontend to function fully  
- Configure `.env` file with API URLs, Cloudinary keys, and Stripe credentials  
- Supports both User and Admin roles with protected routes  

---

## 🔗 References

- [Shadcn UI Documentation](https://ui.shadcn.com)  
- [Next.js Documentation](https://nextjs.org/docs)  
- [Stripe API Documentation](https://stripe.com/docs/api)  
- [Cloudinary API Documentation](https://cloudinary.com/documentation)



