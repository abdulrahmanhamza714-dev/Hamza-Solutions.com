const ADMIN_PHONE = "233554890113";

function submitForm() {

  const plan = document.getElementById("projectType").value;
  const name = document.getElementById("fullName").value;
  const method = document.getElementById("contactMethod").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const email = document.getElementById("email").value;
  const budget = document.getElementById("budget").value;
  const details = document.getElementById("details").value;

  const deadlineField = document.getElementById("deadline");
  const deadline = deadlineField ? deadlineField.value : "";

  // =========================
  // MAINTENANCE ADD-ON
  // =========================
  const maintenanceFree = document.getElementById("maintenance_free")?.checked;
  const maintenancePlan = document.querySelector('input[name="maintenance_plan"]:checked')?.value || "none";

  let maintenanceText = "";

  if (maintenancePlan === "15") {
    maintenanceText = "Website Care Plan ($15/month)";
  } 
  else if (maintenancePlan === "30") {
    maintenanceText = "Business Care Plan ($30/month)";
  } 
  else {
    maintenanceText = "No extended maintenance";
  }

  if (maintenanceFree) {
    maintenanceText = "1 Month FREE Maintenance included + " + maintenanceText;
  }

  // =========================
  // VALIDATION
  // =========================
  if (!plan || !name || !method || !budget || !details) {
    alert("Please fill all required fields.");
    return;
  }

  // =========================
  // WHATSAPP FLOW
  // =========================
  if (method === "whatsapp") {

    if (!whatsapp) {
      alert("Please enter your WhatsApp number.");
      return;
    }

    const msg = `
🚀 NEW PROJECT REQUEST

👤 Name: ${name}
📦 Project: ${plan}
💰 Budget: ${budget}
🛠 Maintenance: ${maintenanceText}
⏳ Deadline: ${deadline || "Not specified"}

📝 Details:
${details}

📱 WhatsApp: ${whatsapp}
`;

    const url = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    showSuccess("whatsapp");
    return;
  }

  // =========================
  // EMAIL FLOW (EMAILJS)
  // =========================
  if (method === "email") {

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    emailjs.send("service_rp4ryhq", "template_axrhigs", {
      from_name: name,
      reply_to: email,
      plan: plan,
      budget: budget,
      deadline: deadline || "Not specified",
      maintenance: maintenanceText,
      message: details
    })

    .then(() => {
      showSuccess("email");
    })

    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Failed to send request. Try again.");
    });

    return;
  }

  showSuccess("default");
}

/* =========================
   SUCCESS SCREEN
========================= */
function showSuccess(type) {

  document.getElementById("formScreen").style.display = "none";
  document.getElementById("successScreen").style.display = "block";

  const successText = document.getElementById("successText");

  if (type === "whatsapp") {
    successText.textContent =
      "We’ve received your request. We will contact you on WhatsApp within 24 hours.";
  }

  else if (type === "email") {
    successText.textContent =
      "We’ve received your request. We will contact you via Email within 24 hours.";
  }

  else {
    successText.textContent =
      "We’ve received your request.";
  }
}

/* =========================
   CONTACT METHOD TOGGLE
========================= */
function toggleContactFields() {
  const method = document.getElementById("contactMethod").value;

  const whatsappGroup = document.getElementById("whatsappGroup");
  const emailGroup = document.getElementById("emailGroup");

  if (!whatsappGroup || !emailGroup) return;

  whatsappGroup.style.display = method === "whatsapp" ? "block" : "none";
  emailGroup.style.display = method === "email" ? "block" : "none";
}

function toggleContactFields() {
  const method = document.getElementById("contactMethod").value;

  const whatsappGroup = document.getElementById("whatsappGroup");
  const emailGroup = document.getElementById("emailGroup");

  if (!whatsappGroup || !emailGroup) return;

  whatsappGroup.style.display = method === "whatsapp" ? "block" : "none";
  emailGroup.style.display = method === "email" ? "block" : "none";
}