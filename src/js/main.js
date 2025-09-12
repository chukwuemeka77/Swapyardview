import { API_BASE } from './config.js';

// ===== Country fetch & search =====
const countrySelect = document.getElementById('country');
const countrySearch = document.getElementById('countrySearch');



// Fetch countries from backend
async function fetchCountries() {
  try {
    const res = await fetch(`${API_BASE}/countries`);
    if (!res.ok) throw new Error("Network response not ok");
    const countries = await res.json();
    populateCountries(countries);
  } catch (err) {
    console.error("Error fetching countries:", err);
  }
}

// Populate the select element
function populateCountries(countries) {
  countrySelect.innerHTML = ""; // clear existing options
  countries.forEach(c => {
    const option = document.createElement("option");
    option.value = c.code || c.name; 
    option.textContent = c.name;
    countrySelect.appendChild(option);
  });
}

// Filter options as user types
countrySearch.addEventListener("input", () => {
  const search = countrySearch.value.toLowerCase();
  Array.from(countrySelect.options).forEach(option => {
    option.hidden = !option.textContent.toLowerCase().includes(search);
  });
});

// Initialize
document.addEventListener("DOMContentLoaded", fetchCountries);


// ===== Password eye toggle =====


// ===== Password toggle for login =====
// Signup password toggle
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');

if (togglePassword && passwordInput) {
  togglePassword.addEventListener('click', (e) => {
    e.preventDefault();
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeOpen.classList.add('hidden');
      eyeClosed.classList.remove('hidden');
    } else {
      passwordInput.type = 'password';
      eyeOpen.classList.remove('hidden');
      eyeClosed.classList.add('hidden');
    }
  });
}

// Login password toggle (similar logic)
const passwordLogin = document.getElementById('passwordLogin');
const togglePasswordLogin = document.getElementById('togglePasswordLogin');
const eyeOpenLogin = document.getElementById('eyeOpenLogin');
const eyeClosedLogin = document.getElementById('eyeClosedLogin');

if (togglePasswordLogin && passwordLogin) {
  togglePasswordLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (passwordLogin.type === 'password') {
      passwordLogin.type = 'text';
      eyeOpenLogin.classList.add('hidden');
      eyeClosedLogin.classList.remove('hidden');
    } else {
      passwordLogin.type = 'password';
      eyeOpenLogin.classList.remove('hidden');
      eyeClosedLogin.classList.add('hidden');
    }
  });
}



// ===== Login =====
const loginForm = document.getElementById('loginForm');
loginForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = passwordInput.value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    console.log('Login success', data);
    // Redirect to dashboard or save token
  } catch (err) {
    document.getElementById('loginError').textContent = err.message;
  }
});

// ===== Signup =====
const signupForm = document.getElementById('signupForm');
signupForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const country = countrySelect.value;
  const password = passwordInput.value;

  try {
    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, country, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    console.log('Signup success', data);
    window.location.href = '../index.html'; // redirect to login
  } catch (err) {
    document.getElementById('signupError').textContent = err.message;
  }
});
