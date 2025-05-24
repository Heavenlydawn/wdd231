// Toggle view buttons
gridBtn.addEventListener("click", () => {
  membersSection.classList.add("grid-view");
  membersSection.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  membersSection.classList.add("list-view");
  membersSection.classList.remove("grid-view");
});

// Footer update
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

getMembers();