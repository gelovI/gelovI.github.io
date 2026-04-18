const imageWrappers = document.querySelectorAll(".project-image-wrapper");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

let currentImages = [];
let currentIndex = 0;

function showImage(index) {
  if (!currentImages.length) return;
  currentIndex = (index + currentImages.length) % currentImages.length;
  lightboxImage.src = currentImages[currentIndex];
}

function openLightbox(images, startIndex = 0) {
  currentImages = images;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
  showImage(startIndex);
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  lightboxImage.src = "";
  currentImages = [];
  currentIndex = 0;
}

imageWrappers.forEach((wrapper) => {
  const images = wrapper.dataset.images
    .split(",")
    .map((img) => img.trim())
    .filter(Boolean);

  wrapper.addEventListener("click", () => {
    openLightbox(images, 0);
  });
});

lightboxNext.addEventListener("click", () => {
  showImage(currentIndex + 1);
});

lightboxPrev.addEventListener("click", () => {
  showImage(currentIndex - 1);
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showImage(currentIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    showImage(currentIndex - 1);
  }
});

// Toggle Projects Section
const toggleProjectsBtn = document.getElementById("toggleProjects");
const hiddenProjects = document.querySelectorAll(".hidden-project");

if (toggleProjectsBtn && hiddenProjects.length) {
  let projectsOpen = false;

  const showMoreText = toggleProjectsBtn.dataset.showMore || "Show more";
  const showLessText = toggleProjectsBtn.dataset.showLess || "Show less";

  toggleProjectsBtn.addEventListener("click", () => {
    projectsOpen = !projectsOpen;

    hiddenProjects.forEach((project) => {
      if (projectsOpen) {
        project.classList.add("show");
      } else {
        project.classList.remove("show");
      }
    });

    toggleProjectsBtn.textContent = projectsOpen ? showLessText : showMoreText;
  });
}
