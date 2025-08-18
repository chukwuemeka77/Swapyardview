const receiverSelect = document.getElementById("receiverSelect");
const accountName = document.getElementById("accountName");
const sendBtn = document.getElementById("sendBtn");
const recentPayments = document.getElementById("recentPayments");

// Load receivers and recent payments
async function loadPaymentData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/receivers`, { headers: getAuthHeaders() });
    const data = await res.json();
    receiverSelect.innerHTML = data.receivers
      .map(r => `<option value="${r.accountNumber}">${r.bankName} - ${r.accountNumber}</option>`)
      .join("");

    const recentRes = await fetch(`${API_BASE_URL}/api/recent-payments`, { headers: getAuthHeaders() });
    const recentData = await recentRes.json();
    recentPayments.innerHTML = recentData.payments
      .map(p => `<li class="list-group-item">${p.receiver} - $${p.amount}</li>`)
      .join("");
  } catch (err) {
    console.error(err);
  }
}

// Auto-fill account name
receiverSelect.addEventListener("change", async () => {
  try {
    const selected = receiverSelect.value;
    const res = await fetch(`${API_BASE_URL}/api/account-name/${selected}`, { headers: getAuthHeaders() });
    const data = await res.json();
    accountName.value = data.accountName || "";
  } catch (err) {
    console.error(err);
  }
});

// Send payment
sendBtn.addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const receiver = receiverSelect.value;
  if (!amount || !receiver) return alert("Fill all fields");

  try {
    const res = await fetch(`${API_BASE_URL}/api/payment`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ receiver, amount }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Payment sent successfully!");
      loadPaymentData();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Payment failed.");
  }
});

window.onload = loadPaymentData;
