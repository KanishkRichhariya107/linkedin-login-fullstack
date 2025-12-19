# LinkedIn Login Full Stack Application

A full-stack web application that implements LinkedIn OAuth 2.0 authentication with React frontend and Node.js/Express backend, deployed on Vercel with PostgreSQL database.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [User Flow](#user-flow)
- [Official Documentation](#official-documentation)
- [API Endpoints](#api-endpoints)

## ✨ Features

- ✅ LinkedIn OAuth 2.0 Authentication
- ✅ User profile display with name, email, and profile picture
- ✅ Profile picture proxy to bypass CORS restrictions
- ✅ PostgreSQL database integration
- ✅ User data persistence
- ✅ Responsive UI with styled-components
- ✅ Logout functionality
- ✅ Fallback avatar with user initials

## 🛠 Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Styled Components
- Vite

**Backend:**
- Node.js
- Express.js
- PostgreSQL (via pg)
- Axios
- CORS
- dotenv

**Deployment:**
- Vercel (Frontend & Backend)
- Neon PostgreSQL (Database)

## 📁 Project Structure

```
linkedin-login-fullstack/
├── Frontend/                  # React frontend application
│   ├── src/
│   │   ├── App.jsx           # Main app with routing
│   │   ├── Login.jsx         # Login page component
│   │   ├── Home.jsx          # User dashboard after login
│   │   ├── main.jsx          # React entry point
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── api/                       # Express backend API
│   ├── index.js              # Main API routes & serverless handler
│   ├── db.js                 # PostgreSQL connection pool
│   ├── package.json
│   └── .env                  # Environment variables (not in repo)
│
├── vercel.json               # Vercel deployment configuration
├── database.sql              # PostgreSQL database schema
├── .env.sample               # Sample environment variables
└── README.md                 # This file
```

##  Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (or Neon account)
- LinkedIn Developer Account
- Vercel account (for deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/KanishkRichhariya107/linkedin-login-fullstack.git
cd linkedin-login-fullstack
```

### 2. Install Dependencies

**Backend:**
```bash
cd api
npm install
```

**Frontend:**
```bash
cd Frontend
npm install
```

### 3. LinkedIn OAuth Setup

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Create a new app or select existing app
3. Navigate to **Auth** tab
4. Add **Authorized redirect URLs**:
   ```
   https://your-vercel-domain.vercel.app/api/auth/linkedin/callback
   ```
5. Copy **Client ID** and **Client Secret**
6. Under **Products**, enable **Sign In with LinkedIn using OpenID Connect**

### 4. Database Setup

1. Create a PostgreSQL database on [Neon](https://console.neon.tech)
2. Run the SQL schema from `database.sql`:
   ```bash
   psql -h your-hostname -U your-username -d your-database -f database.sql
   ```
3. Copy the connection string

### 5. Environment Variables

Create `.env` file in the `api` directory (use `.env.sample` as reference):

```env
LINKEDIN_CLIENT_ID=your_actual_client_id
LINKEDIN_CLIENT_SECRET=your_actual_client_secret
LINKEDIN_REDIRECT_URI=https://your-domain.vercel.app/api/auth/linkedin/callback
FRONTEND_URL=https://your-domain.vercel.app
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

### 6. Local Development

**Run Backend:**
```bash
cd api
node index.js
```

**Run Frontend:**
```bash
cd Frontend
npm run dev
```

##  Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.sample`

5. Redeploy after adding environment variables

##  Database Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mobile_no VARCHAR(15),
    role VARCHAR(20) DEFAULT 'candidate',
    signup_type VARCHAR(20) DEFAULT 'linkedin',
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 User Flow

1. **Landing Page** → User sees "Login with LinkedIn" button
2. **OAuth Redirect** → User clicks button → Redirects to LinkedIn authorization
3. **LinkedIn Authentication** → User logs in with LinkedIn credentials
4. **Authorization** → User grants permissions to the app
5. **Callback** → LinkedIn redirects back with authorization code
6. **Token Exchange** → Backend exchanges code for access token
7. **Fetch User Data** → Backend fetches user profile from LinkedIn API
8. **Database Save** → User data saved to PostgreSQL (insert or update)
9. **Dashboard** → User redirected to home page with profile data
10. **Logout** → User can logout and return to login page

##  Official Documentation

### LinkedIn OAuth
- **LinkedIn Developers Portal:** https://www.linkedin.com/developers/apps
- **LinkedIn OAuth 2.0 Documentation:** https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication
- **Sign In with LinkedIn using OpenID Connect:** https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2
- **LinkedIn API Documentation:** https://learn.microsoft.com/en-us/linkedin/shared/references/v2/profile

### API Dashboard Links
- **LinkedIn Developer Dashboard:** https://www.linkedin.com/developers/apps
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Neon Console:** https://console.neon.tech

## 🔌 API Endpoints

### Authentication Routes

#### `GET /api/auth/linkedin`
- **Description:** Initiates LinkedIn OAuth flow
- **Response:** Redirects to LinkedIn authorization page

#### `GET /api/auth/linkedin/callback`
- **Description:** Handles LinkedIn OAuth callback
- **Query Parameters:**
  - `code`: Authorization code from LinkedIn
- **Response:** Redirects to frontend with user data

#### `GET /api/proxy-image`
- **Description:** Proxies LinkedIn profile images to bypass CORS
- **Query Parameters:**
  - `url`: LinkedIn image URL
- **Response:** Image binary data

#### `GET /api`
- **Description:** Health check endpoint
- **Response:** `"Backend running on Vercel 🚀"`

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth Client ID | `86ipteu9ek507` |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth Client Secret | `xYz123AbC456` |
| `LINKEDIN_REDIRECT_URI` | OAuth callback URL | `https://app.vercel.app/api/auth/linkedin/callback` |
| `FRONTEND_URL` | Frontend application URL | `https://app.vercel.app` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |

##  Notes

- All LinkedIn OAuth scopes used: `openid`, `profile`, `email`
- Profile pictures are proxied through backend to bypass LinkedIn's CORS policy
- Database uses `ON CONFLICT` to update existing users on re-login
- Frontend uses React Router for client-side routing
- Vercel serverless functions handle backend API

##  Troubleshooting

**Issue:** "redirect_uri does not match"
- **Solution:** Ensure `LINKEDIN_REDIRECT_URI` in `.env` matches exactly what's in LinkedIn app settings

**Issue:** Profile picture not loading
- **Solution:** Images are proxied through `/api/proxy-image` endpoint. Check Vercel logs for errors.

**Issue:** Database connection fails
- **Solution:** Verify `DATABASE_URL` is correct and database is accessible. Check Neon console.

**Issue:** 404 on routes after deployment
- **Solution:** `vercel.json` is configured for SPA routing. Ensure it's properly deployed.

##  Author

**Kanishk Richhariya**
- GitHub: [@KanishkRichhariya107](https://github.com/KanishkRichhariya107)

##  License

This project is open source and available for educational purposes.
