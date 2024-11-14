// Add scroll-triggered shrink effect for profile image
window.addEventListener("scroll", () => {
    const heroSection = document.querySelector(".hero");
    const heroHeight = heroSection.offsetHeight;
    
    // Add 'shrink' class to body when scrolling past the hero section
    if (window.scrollY > heroHeight / 2) {
        document.body.classList.add("shrink");
    } else {
        document.body.classList.remove("shrink");
    }
});

// Scroll-triggered animations for each section
const sections = document.querySelectorAll(".content-section");

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

window.addEventListener("scroll", revealSections);

// Initial call to reveal any sections in view on load
revealSections();

// 3D Parallax Effect on Mouse Move in Hero Section
document.addEventListener("mousemove", (e) => {
    const heroImage = document.querySelector(".profile-image img");
    const speed = 0.05;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    
    heroImage.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});

// 3D Tilt Effect on Section Hover
sections.forEach(section => {
    section.addEventListener("mousemove", (e) => {
        const { offsetX, offsetY, target } = e;
        const { offsetWidth, offsetHeight } = target;
        
        const moveX = ((offsetX / offsetWidth) - 0.5) * 20; // Adjust tilt strength here
        const moveY = ((offsetY / offsetHeight) - 0.5) * 20;
        
        section.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    });

    section.addEventListener("mouseleave", () => {
        section.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
});

// Fade-in and Slide-up Animation for Section Text Content
const fadeElements = document.querySelectorAll(".content-section p, .content-section ul");

function fadeInSections() {
    fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", fadeInSections);

// Initial call to show any elements in view on load
fadeInSections();
