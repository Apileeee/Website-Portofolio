import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import escapeHtml from "escape-html";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Security middleware
app.disable("x-powered-by");

// Body parser dengan limit
app.use(express.json({ limit: "10kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Rate limit contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // maksimal 5 request
  message: {
    success: false,
    message: "Terlalu banyak percobaan. Coba lagi nanti.",
  },
});

// Home
app.get("/", (req, res) => {
  res.render("index", {
    title: "Arafil Azmi - Web Developer & Data Enthusiast",
  });
});

// Email transporter
const transporter =
  process.env.EMAIL_USER && process.env.EMAIL_PASSWORD
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
    : null;

// Contact API
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Required validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Semua field harus diisi.",
    });
  }

  // Length validation
  if (
    name.length > 100 ||
    email.length > 150 ||
    subject.length > 150 ||
    message.length > 3000
  ) {
    return res.status(400).json({
      success: false,
      message: "Input terlalu panjang.",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Format email tidak valid.",
    });
  }

  try {
    // Jika email belum dikonfigurasi
    if (!transporter) {
      console.log("Email config missing:", {
        name,
        email,
        subject,
      });

      return res.json({
        success: true,
        message: "Pesan diterima.",
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const mailOptions = {
      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_TO || process.env.EMAIL_USER,

      replyTo: email,

      subject: `Portfolio Contact: ${subject}`,

      html: `
          <h2>Pesan Baru dari Portfolio</h2>

          <p>
            <strong>Nama:</strong>
            ${safeName}
          </p>

          <p>
            <strong>Email:</strong>
            ${safeEmail}
          </p>

          <p>
            <strong>Subject:</strong>
            ${safeSubject}
          </p>

          <p>
            <strong>Pesan:</strong>
          </p>

          <p>
            ${safeMessage}
          </p>
        `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Pesan berhasil dikirim.",
    });
  } catch (error) {
    console.error("Email error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengirim pesan.",
    });
  }
});

// 404
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).render("error", {
    title: "Server Error",
    error: "Terjadi kesalahan.",
  });
});

// Untuk Vercel
export default app;
