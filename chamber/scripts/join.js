document.getElementById("timestamp").value = new Date().toLocaleString();
function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Thank you
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}
document.getElementById("firstname").textContent = getParam("firstname");
document.getElementById("lastname").textContent = getParam("lastname");
document.getElementById("email").textContent = getParam("email");
document.getElementById("mobile").textContent = getParam("mobile");
document.getElementById("orgname").textContent = getParam("orgname");
document.getElementById("timestamp").textContent = getParam("timestamp");
