"use strict";
const API_BASE = "http://localhost:8080/shortUrl";
const form = document.getElementById("shortenForm");
const inputUrl = document.getElementById("longUrl");
const inputExpiry = document.getElementById("expiresAt");
const errorBox = document.getElementById("error");
const resultBox = document.getElementById("result");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorBox.textContent = "";
    resultBox.textContent = "";
    const url = inputUrl.value.trim();
    if (!url) {
        errorBox.textContent = "Please enter a URL.";
        return;
    }
    const payload = { longUrl: url };
    if (inputExpiry.value) {
        payload.expiredAt = inputExpiry.value;
    }
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        let body;
        try {
            body = await response.json();
        }
        catch (_) {
        }
        if (!response.ok) {
            throw new Error((body === null || body === void 0 ? void 0 : body.message) || "Couldn't shorten the URL");
        }
        resultBox.innerHTML = `
      Short URL:
      <a href="${body.shortUrl}" target="_blank">${body.shortUrl}</a>
    `;
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        errorBox.textContent = msg;
    }
});
