import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Arafil Azmi - Web Developer & Data Enthusiast",
  });
});

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// API endpoint for contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validasi data
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Semua field harus diisi!",
    });
  }

  try {
    // Check if email credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log("Email not configured. Message received:", {
        name,
        email,
        subject,
        message,
      });
      return res.json({
        success: true,
        message: "Pesan diterima! (Email belum dikonfigurasi di server)",
      });
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>Pesan Baru dari Portfolio Contact Form</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="color: #999; font-size: 12px;">
          Balas langsung ke email pengirim: ${email}
        </p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(
      "Email sent to:",
      process.env.EMAIL_TO || process.env.EMAIL_USER
    );
    console.log("From:", name, `(${email})`);

    res.json({
      success: true,
      message: "Pesan berhasil dikirim!",
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({
      success: false,
      message: "Gagal mengirim pesan. Silakan coba lagi.",
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    title: "Server Error",
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║          🚀 Portfolio Server Running                       ║
  ╠═══════════════════════════════════════════════════════════╣
  ║  URL: http://localhost:${PORT}                              ║
  ║  Mode: ${process.env.NODE_ENV || "development"}                       ║
  ║  Press CTRL+C to stop                                     ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
