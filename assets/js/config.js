// config.js
// Centralized API base URL
const API_BASE_URL = "https://your-render-backend.onrender.com";

// Headers helper
function getAuthHeaders() {
  const token = sessionStorage.getItem("userToken"); // Assuming backend returns a token on login
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}
