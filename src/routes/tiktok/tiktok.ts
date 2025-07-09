import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/tiktok/callback", async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  if (!code) {
    return res.status(400).send("TikTok callback missing code.");
  }

  console.log("Received TikTok code:", code);

  try {
    const response = await axios.post(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        client_key: "sbawj3a8c8vpgm0m18",
        client_secret: "sS3s8nTQSyAHaD3Pc4MZ9ehSkjdiejUu",
        code,
        grant_type: "authorization_code",
        redirect_uri:
          "https://sharing-cricket-ultimate.ngrok-free.app/tiktok/callback",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const { access_token, refresh_token } = response.data;
    console.log("TikTok access_token:", access_token);

    // TODO: Save tokens to DB if needed
    res.send("TikTok authentication successful. Tokens received.");
  } catch (err: any) {
    console.error("Error exchanging code:", err.response?.data || err.message);
    res.status(500).send("Failed to get TikTok access token.");
  }
});

export default router;
