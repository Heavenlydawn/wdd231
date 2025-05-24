const membersSection = document.getElementById("members");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error fetching member data:", error);
    membersSection.innerHTML = `<p>Error loading members. Please try again later.</p>`;
  }
}

function displayMembers(members) {
  membersSection.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div>
    <h3>${member.name}</h3>
    <div class="card__content">
      <img src="${member.image}" alt="${
      member.name
    } logo" loading="lazy" width="80" height="80">
      </div>
      <div>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${
        member.website
      }" target="_blank" rel="noopener noreferrer">${member.name}</a></p>
      <p><strong>Membership Level:</strong> ${getMembershipLevel(
        member.membershipLevel
      )}</p>
      </div>
    </div>
    `;
    membersSection.appendChild(card);
  });
}

function getMembershipLevel(level) {
  return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
}

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

// Hamburger menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}
