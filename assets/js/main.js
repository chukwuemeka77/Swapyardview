const API_URL = "https://your-backend-url.onrender.com/api/auth";

// ---------- LOGIN ----------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const spinner = document.getElementById('loginSpinner');
    const btnText = document.getElementById('loginBtnText');
    const errorMsg = document.getElementById('errorMsg');

    spinner.classList.remove('d-none');
    btnText.textContent = '';
    errorMsg.classList.add('d-none');

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('swapyardUser', JSON.stringify(data.user));
        window.location.href = 'index.html';
      } else {
        errorMsg.textContent = data.error;
        errorMsg.classList.remove('d-none');
      }
    } catch (err) {
      errorMsg.textContent = 'Server error';
      errorMsg.classList.remove('d-none');
    } finally {
      spinner.classList.add('d-none');
      btnText.textContent = 'Login';
    }
  });
}

// ---------- SIGNUP ----------
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const spinner = document.getElementById('signupSpinner');
    const btnText = document.getElementById('signupBtnText');
    const errorMsg = document.getElementById('errorMsg');

    spinner.classList.remove('d-none');
    btnText.textContent = '';
    errorMsg.classList.add('d-none');

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, password })
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('swapyardUser', JSON.stringify(data.user));
        window.location.href = 'index.html';
      } else {
        errorMsg.textContent = data.error;
        errorMsg.classList.remove('d-none');
      }
    } catch (err) {
      errorMsg.textContent = 'Server error';
      errorMsg.classList.remove('d-none');
    } finally {
      spinner.classList.add('d-none');
      btnText.textContent = 'Sign Up';
    }
  });
}

// ---------- HOME PAGE ----------
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(sessionStorage.getItem('swapyardUser'));
  if (user) {
    const nameEl = document.getElementById('userName');
    const balanceEl = document.getElementById('userBalance');
    const kycEl = document.getElementById('userKYC');

    if (nameEl) nameEl.textContent = user.email || 'User Name';
    if (balanceEl) balanceEl.textContent = `$${user.balance || 0}`;
    if (kycEl) kycEl.textContent = user.kycTier || 'Tier 0';
  } else if (window.location.pathname.includes('index.html')) {
    window.location.href = 'login.html';
  }
});
