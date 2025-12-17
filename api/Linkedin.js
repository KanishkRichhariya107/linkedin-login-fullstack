const express = require("express");
const axios = require("axios");
const pool = require("./db");

const router = express.Router();

/* STEP 1: Redirect to LinkedIn */
router.get("/linkedin", (req, res) => {
  const url =
    "https://www.linkedin.com/oauth/v2/authorization" +
    "?response_type=code" +
    `&client_id=${process.env.LINKEDIN_CLIENT_ID}` +
    `&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}` +
    "&scope=openid%20profile%20email";

  res.redirect(url);
});

/* STEP 2: LinkedIn Callback */
router.get("/linkedin/callback", async (req, res) => {
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

    const { name, email } = userRes.data;

    const result = await pool.query(
      `
      INSERT INTO users (full_name, email, signup_type)
      VALUES ($1, $2, 'linkedin')
      ON CONFLICT (email) DO UPDATE
      SET full_name = EXCLUDED.full_name
      RETURNING *;
      `,
      [name, email]
    );

    const user = result.rows[0];

    // Redirect to frontend
    res.redirect(
      `${process.env.FRONTEND_URL}/home?name=${encodeURIComponent(user.full_name)}&email=${encodeURIComponent(user.email)}`
    );

  } catch (err) {
    console.error(err);
    res.status(500).send("LinkedIn login failed");
  }
});

module.exports = router;
