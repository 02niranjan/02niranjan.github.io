// Variables to manage sections and initial setup
const sections = document.querySelectorAll('.content-section');
let currentSectionIndex = 0;  // Start with the first section

// Set initial scales and opacities for sections
sections.forEach((section, index) => {
  if (index === 0) {
    section.style.transform = 'scale(1)';
    section.style.opacity = '1';
  } else {
    section.style.transform = 'scale(0.8)';
    section.style.opacity = '0.5';
  }
});

// Function to handle scrolling and section transformations
window.addEventListener('scroll', () => {
  const direction = (document.body.getBoundingClientRect()).top > 0 ? 'up' : 'down';

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    // Check if the section is in the viewport
    if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
      // Adjust the scale and opacity if this section is the new current section
      if (currentSectionIndex !== index) {
        sections[currentSectionIndex].style.transform = 'scale(0.8)';
        sections[currentSectionIndex].style.opacity = '0.5';
        
        section.style.transform = 'scale(1)';
        section.style.opacity = '1';
        currentSectionIndex = index;
      }
    }
  });

  // Optionally, you can add a throttle to reduce the number of times this function is called
  // during rapid scrolling for better performance
});

// 3D Tilt Effect on Profile Image
const profileImage = document.querySelector('.profile-image');
profileImage.addEventListener('mousemove', (e) => {
  const { offsetX, offsetY, target } = e;
  const { width, height } = target.getBoundingClientRect();
  const moveX = ((offsetX - width / 2) / width) * 30; // Tilt depth
  const moveY = ((offsetY - height / 2) / height) * 30;

  target.style.transform = `rotateY(${moveX}deg) rotateX(${moveY}deg)`;
});

profileImage.addEventListener('mouseleave', () => {
  profileImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

