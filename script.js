// Variables for hero section, profile image, background video, and sections
const heroSection = document.querySelector(".hero");
const profileImage = document.querySelector(".profile-image");
const video = document.querySelector(".hero .background-video");
const sections = document.querySelectorAll(".content-section");

// Initial fade-in effect for hero section on page load
window.addEventListener("load", () => {
    heroSection.style.transition = "opacity 1.5s ease, transform 1.5s ease";
    heroSection.style.opacity = "1";
    heroSection.style.transform = "scale(1)";
    
    // Reveal sections in view on load
    revealSections();
});

// Smooth scroll and parallax effects on scroll
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    // Apply parallax effect to background video in the hero section
    if (video) {
        video.style.transform = `translateY(${scrollPosition * 0.4}px) scale(1.1)`;
    }

    // Shrink effect for profile image and hero text when scrolling down
    if (scrollPosition > heroHeight * 0.3) {
        document.body.classList.add("shrink");
    } else {
        document.body.classList.remove("shrink");
    }

    // Reveal content sections as they come into view
    revealSections();
});

// Reveal sections on scroll for smooth entrance animation
function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add("visible");
        } else {
            section.classList.remove("visible");
        }
    });
}

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

// Parallax scrolling effect for each content section, but with stabilization on stop
let lastScrollY = window.scrollY;
let ticking = false;

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            sections.forEach((section, index) => {
                const speed = 0.1 * (index + 1); // Control parallax depth by section
                const offset = currentScrollY * speed;
                section.style.transform = `translateY(${offset}px)`;
            });
            lastScrollY = currentScrollY;
            ticking = false;
        });
        ticking = true;
    }
}

// Throttle scroll events for performance and stable animations
window.addEventListener("scroll", handleScroll);
