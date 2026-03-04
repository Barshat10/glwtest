document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("fakeSubmit").addEventListener("click", () => {
  alert("Demo: Formular wurde nicht gesendet. (Perfekt zum Testen von Overlays/z-index)");
});