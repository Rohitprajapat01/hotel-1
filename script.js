// Gallery images data
const galleryImages = [
    {
        url: '3.jpg',
        title: 'Hotel Exterior',
        category: 'Exterior'
    },
    {
        url: '2.jpg',
        title: 'Luxury Suite',
        category: 'Rooms'
    },
    {
        url: '1.jpg',
        title: 'Presidential Suite',
        category: 'Rooms'
    },
    {
        url: '4.jpg',
        title: 'Deluxe Room',
        category: 'Rooms'
    },
    {
        url: 'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Hotel Lobby',
        category: 'Interior'
    },
    {
        url: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Swimming Pool',
        category: 'Amenities'
    },
    {
        url: 'https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Restaurant',
        category: 'Dining'
    },
    {
        url: 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Spa',
        category: 'Amenities'
    }
];

let currentImageIndex = 0;

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation links smooth scroll
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
        nav.classList.remove('show');
    });
});

// Floating contact toggle
const floatingBtn = document.getElementById('floatingBtn');
const floatingOptions = document.getElementById('floatingOptions');
let isFloatingOpen = false;

floatingBtn.addEventListener('click', () => {
    isFloatingOpen = !isFloatingOpen;
    if (isFloatingOpen) {
        floatingOptions.classList.add('show');
        floatingBtn.innerHTML = '✕';
    } else {
        floatingOptions.classList.remove('show');
        floatingBtn.innerHTML = '💬';
    }
});

// Gallery modal functions
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    
    modalImage.src = galleryImages[index].url;
    modalTitle.textContent = galleryImages[index].title;
    modalCategory.textContent = galleryImages[index].category;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openModal(currentImageIndex);
}

function prevImage() {
    currentImageIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    openModal(currentImageIndex);
}

// Close modal when clicking outside
document.getElementById('galleryModal').addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') {
        closeModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.room-card, .gallery-item, .info-card, .contact-card, .booking-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Preload images for better performance
function preloadImages() {
    galleryImages.forEach(image => {
        const img = new Image();
        img.src = image.url;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', revealSections);
