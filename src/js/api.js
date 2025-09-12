const API_BASE = "https://api.example.com"; // Replace with your backend URL

/**
 * Generic fetch wrapper
 * @param {string} path - API endpoint path
 * @param {object} options - fetch options
 */
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("swapyard_token");

  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = data.error || res.statusText || "API request failed";
    throw new Error(error);
  }

  return data;
}

/**
 * Auth endpoints
 */
export async function signup({ name, email, phone, password, country }) {
  return apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, phone, password, country })
  });
}

export async function login({ email, phone, password }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, phone, password })
  });
}

/**
 * Other backend endpoints
 */
export async function getCountries() {
  return apiFetch("/countries");
}

export async function getPayments() {
  return apiFetch("/payments");
}

export async function getTransactions() {
  return apiFetch("/transactions");
}

export async function getNotifications() {
  return apiFetch("/notifications");
}
