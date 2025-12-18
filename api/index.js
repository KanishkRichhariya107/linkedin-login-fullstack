const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// Database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// Health check
app.get("/api", (req, res) => {
  res.send("Backend running on Vercel 🚀");
});

/* STEP 1: Redirect to LinkedIn */
app.get("/api/auth/linkedin", (req, res) => {
  const url =
    "https://www.linkedin.com/oauth/v2/authorization" +
    "?response_type=code" +
    `&client_id=${process.env.LINKEDIN_CLIENT_ID}` +
    `&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}` +
    "&scope=openid%20profile%20email";

  res.redirect(url);
});

/* STEP 2: LinkedIn Callback */
app.get("/api/auth/linkedin/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const tokenRes = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET
        }
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    console.log("LinkedIn user data:", userRes.data);
    const { name, email, picture } = userRes.data;

    const result = await pool.query(
      `
      INSERT INTO users (full_name, email, signup_type, profile_picture)
      VALUES ($1, $2, 'linkedin', $3)
      ON CONFLICT (email) DO UPDATE
      SET full_name = EXCLUDED.full_name,
          profile_picture = EXCLUDED.profile_picture
      RETURNING *;
      `,
      [name, email, picture || null]
    );

    const user = result.rows[0];

    // Redirect to frontend
    res.redirect(
      `${process.env.FRONTEND_URL}/home?name=${encodeURIComponent(user.full_name)}&email=${encodeURIComponent(user.email)}&picture=${encodeURIComponent(picture || '')}`
    );

  } catch (err) {
    console.error(err);
    res.status(500).send("LinkedIn login failed");
  }
});

/* Proxy endpoint for LinkedIn profile pictures */
app.get("/api/proxy-image", async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).send("Missing image URL");
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    res.set('Content-Type', response.headers['content-type']);
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    res.send(response.data);
  } catch (err) {
    console.error("Image proxy error:", err);
    res.status(500).send("Failed to fetch image");
  }
});

// Export for Vercel serverless
module.exports = app;
