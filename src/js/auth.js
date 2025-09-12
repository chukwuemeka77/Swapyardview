import { login as apiLogin, signup as apiSignup, getCountries } from './api.js';

/**
 * Login flow
 * @param {string} email
 * @param {string} password
 */
export async function loginFlow(email, password) {
  const data = await apiLogin({ email, password });
  localStorage.setItem('swapyard_token', data.token);
  localStorage.setItem('swapyard_user', JSON.stringify(data.user));
  return data.user;
}

/**
 * Signup flow
 * @param {object} userData - {name, email, phone, password, country}
 */
export async function signupFlow(userData) {
  const data = await apiSignup(userData);
  return data;
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser() {
  const user = localStorage.getItem('swapyard_user');
  return user ? JSON.parse(user) : null;
}

/**
 * Fetch current user from backend (optional)
 */
export async function fetchCurrentUser() {
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  return user;
}

/**
 * Logout user
 */
export function logout() {
  localStorage.removeItem('swapyard_token');
  localStorage.removeItem('swapyard_user');
}

/**
 * Populate country select dropdown
 * @param {HTMLElement} selectEl
 */
export async function populateCountries(selectEl) {
  try {
    const countries = await getCountries();
    countries.forEach(c => {
      const option = document.createElement('option');
      option.value = c.code || c.name;
      option.textContent = c.name;
      selectEl.appendChild(option);
    });
  } catch (err) {
    console.error('Failed to load countries:', err);
  }
}
