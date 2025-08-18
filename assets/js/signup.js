const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const emailOrPhone = document.getElementById("emailOrPhone").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, emailOrPhone, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Signup failed. Try again.");
  }
});
