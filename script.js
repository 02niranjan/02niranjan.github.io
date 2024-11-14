// Import Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Particle Setup
const particlesCount = 800;
const particles = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    particlePositions[i] = (Math.random() - 0.5) * 1000;
}

particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

// Particle Material
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    blending: THREE.AdditiveBlending,
    transparent: true,
});

const particleMesh = new THREE.Points(particles, particleMaterial);
scene.add(particleMesh);

camera.position.z = 250;

// Animation Function
function animateParticles() {
    particleMesh.rotation.y += 0.002; // Rotate particles for dynamic effect
    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initiate Animation
animateParticles();

