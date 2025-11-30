// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe section titles and content
    document.querySelectorAll('.section-title, .about-content, .projects-grid, .blog-grid, .contact-content').forEach(el => {
        observer.observe(el);
    });

    // Observe project cards with stagger
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('stagger-item');
        observer.observe(card);
    });

    // Observe blog cards with stagger
    document.querySelectorAll('.blog-card').forEach((card, index) => {
        card.classList.add('stagger-item');
        observer.observe(card);
    });
});

// Form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}