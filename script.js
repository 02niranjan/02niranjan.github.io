// Variables for hero, profile image, background video, and sections
const heroSection = document.querySelector(".hero");
const profileImage = document.querySelector(".profile-image");
const video = document.querySelector(".hero .background-video");
const sections = document.querySelectorAll(".content-section");

// Initial fade-in effect for hero section and all content sections
window.addEventListener("load", () => {
    heroSection.style.transition = "opacity 1.5s ease, transform 1.5s ease";
    heroSection.style.opacity = "1";
    heroSection.style.transform = "scale(1)";

    sections.forEach(section => {
        section.style.transition = "opacity 1.2s ease, transform 1.2s ease";
        section.style.opacity = "1";
        section.style.transform = "scale(1)";
    });
});

// Smooth Scroll and Parallax Effects on Scroll
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    // Apply parallax effect to background video
    if (video) {
        video.style.transform = `translateY(${scrollPosition * 0.4}px) scale(1.1)`;
    }

    // Shrink effect for profile image and hero text on scroll
    if (scrollPosition > heroHeight * 0.3) {
        document.body.classList.add("shrink");
    } else {
        document.body.classList.remove("shrink");
    }

    // Reveal content sections as they come into view
    revealSections();
});

// Function to reveal sections on scroll with smooth entrance animations
function revealSections() {
    const triggerBottom = window.innerHeight * 0.8;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add("visible");
        } else {
            section.classList.remove("visible");
        }
    });
}

// Initial call to reveal any sections already in view on load
revealSections();

// 3D Tilt Effect on Profile Image Hover
profileImage.addEventListener("mousemove", (e) => {
    const { offsetX, offsetY } = e;
    const width = profileImage.offsetWidth;
    const height = profileImage.offsetHeight;
    const moveX = ((offsetX - width / 2) / width) * 20; // Controls the tilt depth
    const moveY = ((offsetY - height / 2) / height) * 20;

    profileImage.style.transform = `rotateX(${moveY}deg) rotateY(${moveX}deg) scale(1.05)`;
});

profileImage.addEventListener("mouseleave", () => {
    profileImage.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});

// Parallax scrolling effect for each content section
document.addEventListener("scroll", () => {
    sections.forEach((section, index) => {
        const speed = 0.15 * (index + 1); // Vary speed by section index
        section.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});
