"use strict";
const API_BASE = 'shortUrl';
const form = document.getElementById('shortenForm');
const inputUrl = document.getElementById('longUrl');
const inputExpiry = document.getElementById('expiresAt');
const errorBox = document.getElementById('error');
const resultBox = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorBox.textContent = '';
    resultBox.classList.add('hidden');
    resultBox.innerHTML = '';
    const longUrl = inputUrl.value.trim();
    if (!longUrl) {
        errorBox.textContent = 'Please enter a valid URL.';
        return;
    }
    const payload = { longUrl };
    if (inputExpiry.value) {
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(inputExpiry.value)) {
            errorBox.textContent = 'Invalid expiry date format.';
            return;
        }
        payload.expiredAt = inputExpiry.value;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Shortening...';
    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const body = await response.json();
        if (!response.ok) {
            throw new Error((body === null || body === void 0 ? void 0 : body.message) || 'Failed to shorten URL');
        }
        resultBox.innerHTML = `
      <strong>Short URL</strong>
      <a href="${body.shortUrl}" target="_blank">${body.shortUrl}</a>
      <button id="copyBtn">Copy</button>
    `;
        resultBox.classList.remove('hidden');
        document.getElementById('copyBtn').addEventListener('click', () => {
            navigator.clipboard.writeText(body.shortUrl);
        });
    }
    catch (err) {
        errorBox.textContent =
            err instanceof Error ? err.message : 'Something went wrong';
    }
    finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Shorten URL';
    }
});
