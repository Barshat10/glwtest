const WARRANTY_MAX_AGE = 10;

const yearInput = document.getElementById("year");
const warrantyMessage = document.getElementById("warrantyMessage");
const form = document.getElementById("serviceForm");
const statusText = document.getElementById("formStatus");

yearInput.addEventListener("input", () => {

const year = parseInt(yearInput.value);
const currentYear = new Date().getFullYear();

if(!year) return;

const age = currentYear - year;

if(age > WARRANTY_MAX_AGE){

warrantyMessage.textContent =
"⚠️ This machine is older than warranty period.";

warrantyMessage.style.color = "red";

}else{

warrantyMessage.textContent =
"✅ Machine may still be under warranty.";

warrantyMessage.style.color = "green";

}

});


form.addEventListener("submit",(e)=>{

e.preventDefault();

const formData = new FormData(form);

const email = formData.get("email");
const phone = formData.get("phone");

if(!email && !phone){

statusText.textContent =
"Please provide email or phone number.";

statusText.style.color="red";
return;

}

statusText.textContent =
"Form submitted (demo mode). Backend connection not yet implemented.";

statusText.style.color="green";

});