const WARRANTY_MAX_AGE = 10;

const yearInput = document.getElementById("year");
const warrantyMessage = document.getElementById("warrantyMessage");
const warrantyStatusInput = document.getElementById("warrantyStatus");
const warrantyQuestions = document.getElementById("warrantyQuestions");
const meterReadingSection = document.getElementById("meterReadingSection");
const machineTypeSelect = document.getElementById("machineType");
const form = document.getElementById("serviceForm");
const formStatus = document.getElementById("formStatus");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const MACHINES_WITHOUT_METER = ["CS60"];

function getMachineValue() {
  const selected = document.querySelector('input[name="machine"]:checked');
  return selected ? selected.value : "";
}

function updateMeterField() {
  const selectedMachine = getMachineValue();

  if (MACHINES_WITHOUT_METER.includes(selectedMachine)) {
    meterReadingSection.style.display = "none";
  } else {
    meterReadingSection.style.display = "block";
  }
}

function updateWarrantyState() {
  const yearValue = parseInt(yearInput.value, 10);
  const currentYear = new Date().getFullYear();

  if (!yearValue || Number.isNaN(yearValue)) {
    warrantyMessage.textContent = "";
    warrantyMessage.className = "warranty-message";
    warrantyStatusInput.value = "";
    warrantyQuestions.classList.remove("is-hidden");
    return;
  }

  const age = currentYear - yearValue;

  if (age > WARRANTY_MAX_AGE) {
    warrantyMessage.textContent = "This machine is too old for warranty. Warranty questions are skipped.";
    warrantyMessage.className = "warranty-message warranty-message--old";
    warrantyStatusInput.value = "Out of warranty";
    warrantyQuestions.classList.add("is-hidden");
  } else {
    warrantyMessage.textContent = "This machine may still be under warranty.";
    warrantyMessage.className = "warranty-message warranty-message--ok";
    warrantyStatusInput.value = "Possibly under warranty";
    warrantyQuestions.classList.remove("is-hidden");
  }
}

function validateContactFields() {
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!email && !phone) {
    formStatus.textContent = "Please provide either an email address or a phone number.";
    formStatus.className = "form-status form-status--error";
    return false;
  }

  return true;
}

function showSuccessFromUrl() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("success") === "1") {
    formStatus.textContent = "Your request was submitted successfully.";
    formStatus.className = "form-status form-status--success";

    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}

yearInput.addEventListener("input", updateWarrantyState);

document.querySelectorAll('input[name="machine"]').forEach((radio) => {
  radio.addEventListener("change", updateMeterField);
});

form.addEventListener("submit", function (event) {
  formStatus.textContent = "";
  formStatus.className = "form-status";

  if (!validateContactFields()) {
    event.preventDefault();
    return;
  }

  updateWarrantyState();
  updateMeterField();

  formStatus.textContent = "Submitting request...";
  formStatus.className = "form-status form-status--success";
});

updateWarrantyState();
updateMeterField();
showSuccessFromUrl();