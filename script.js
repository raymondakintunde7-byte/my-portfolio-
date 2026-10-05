const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const projectDialog = document.querySelector(".project-dialog");
const dialogImage = document.querySelector(".dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
const dialogType = document.querySelector(".dialog-type");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      card.hidden =
        selectedFilter !== "all" && card.dataset.category !== selectedFilter;
    });
  });
});

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.dataset.image;
    dialogImage.src = image;
    dialogImage.alt = card.querySelector("img").alt;
    dialogTitle.textContent = card.dataset.title;
    dialogType.textContent = card.dataset.type;
    projectDialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

function closeProjectDialog() {
  projectDialog.close();
  document.body.classList.remove("dialog-open");
}

document
  .querySelector(".dialog-close")
  .addEventListener("click", closeProjectDialog);
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) closeProjectDialog();
});
projectDialog.addEventListener("close", () =>
  document.body.classList.remove("dialog-open"),
);

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation",
  );
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mainNav.classList.remove("is-open");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
