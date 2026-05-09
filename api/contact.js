const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzlgBajtWFIkfUfVVYZXsPZ5L0F-IdGtI1kZLwOq5ru6aLQSs7V1ya-oqrziZjY3AyLjw/exec";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(502).json({ message: "Failed to submit form" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: "Server communication failed" });
  }
}
