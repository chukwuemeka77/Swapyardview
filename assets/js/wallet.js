// Fetch wallet info
async function loadWallet() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/wallet`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (res.ok) {
      document.getElementById("userBalance").innerText = `Balance: $${data.balance}`;
      document.getElementById("userKYCTier").innerText = `KYC Tier: ${data.kycTier}`;
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to load wallet info.");
  }
}

window.onload = loadWallet;
