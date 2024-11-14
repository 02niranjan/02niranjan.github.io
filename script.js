// Throttle function to limit the rate at which a function is executed
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan || (Date.now() - lastRan >= limit)) {
            if (lastFunc) {
                clearTimeout(lastFunc);
            }
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                func.apply(context, args);
                lastRan = Date.now();
            }, limit - (Date.now() - lastRan));
        }
    }
}

// Select all sections and profile image for interaction effects
const sections = document.querySelectorAll('.content-section');
const profileImage = document.querySelector('.profile-image');

// Initialize the current section index and set initial styles
let currentSectionIndex = 0;
sections.forEach((section, index) => {
    section.style.transform = index === 0 ? 'scale(1)' : 'scale(0.8)';
    section.style.opacity = index === 0 ? '1' : '0.5';
});

// Scroll event listener with throttling
window.addEventListener('scroll', throttle(() => {
    let foundSection = false;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (!foundSection && rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            if (currentSectionIndex !== index) {
                sections[currentSectionIndex].style.transform = 'scale(0.8)';
                sections[currentSectionIndex].style.opacity = '0.5';
                section.style.transform = 'scale(1)';
                section.style.opacity = '1';
                currentSectionIndex = index;
            }
            foundSection = true;
        }
    });
}, 250));

// 3D Tilt Effect for the profile image
profileImage.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY } = e;
    const { width, height } = e.target.getBoundingClientRect();
    const moveX = ((offsetX - width / 2) / width) * 30;
    const moveY = ((offsetY - height / 2) / height) * 30;
    e.target.style.transform = `rotateY(${moveX}deg) rotateX(${moveY}deg) scale(1.1)`;
});

profileImage.addEventListener('mouseleave', () => {
    profileImage.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
});
