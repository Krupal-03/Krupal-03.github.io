class ThreeJSScrollAnimation {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mixer = null;
        this.model = null;
        
        this.init();
    }

    init() {
        // Check if Three.js is available and container exists
        const container = document.getElementById('hero-model');
        if (!container || typeof THREE === 'undefined') return;

        this.setupScene(container);
        this.setupCamera();
        this.setupRenderer(container);
        this.setupLighting();
        this.createPlaceholderModel(); // Replace with your 3D model
        this.setupScrollAnimation();
        this.animate();
    }

    setupScene(container) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }

    setupRenderer(container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    createPlaceholderModel() {
        // Create a simple animated cube as placeholder
        // Replace this with your actual 3D human model loading code
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.8
        });
        
        this.model = new THREE.Mesh(geometry, material);
        this.scene.add(this.model);

        // Create simple animation mixer
        this.mixer = new THREE.AnimationMixer(this.model);
    }

    setupScrollAnimation() {
        // Use GSAP ScrollTrigger for scroll-based animations
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(this.model.rotation, {
            y: Math.PI * 2,
            duration: 1,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    // Additional animations based on scroll progress
                    this.model.position.y = Math.sin(self.progress * Math.PI) * 2;
                    this.model.scale.setScalar(1 + self.progress * 0.5);
                }
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update animation mixer
        if (this.mixer) {
            this.mixer.update(0.016); // 60fps
        }

        // Rotate model slowly
        if (this.model) {
            this.model.rotation.x += 0.005;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeJSScrollAnimation();
});

// Handle window resize
window.addEventListener('resize', () => {
    // This will be handled by the class instance
});