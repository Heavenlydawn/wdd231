const toggleButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

toggleButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});


// COURSE SECTION
const buttons = document.querySelectorAll(".section__course button");
const courses = document.querySelectorAll(".course");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    courses.forEach(course => {
      course.classList.remove("show"); 
      if (filter === "all" || course.classList.contains(filter)) {
        course.classList.add("show");
      }
    });
  });
});

document.querySelector('button[data-filter="all"]').click();


// DATE MODIFIED
const currentYear = new Date().getFullYear();
document.querySelector("footer h2").innerText = `©  🤍 Ozioma Heaven Gabriel 🤍 Abuja ${currentYear}`;


const lastModified = document.lastModified;
document.getElementById("date").textContent = lastModified;
