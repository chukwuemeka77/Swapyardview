// login.js
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailOrPhone = document.getElementById("emailOrPhone").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrPhone, password }),
    });
    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem("userToken", data.token);
      sessionStorage.setItem("userName", data.user.name);
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Login failed. Please try again.");
  }
});
