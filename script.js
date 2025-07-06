
const GITHUB_PAGES_BASE_PATH = '/hotel-1/'; // Adjust this if your project is in a different subdirectory

const galleryImages = [
    {
        url: `${GITHUB_PAGES_BASE_PATH}12.jpg`,
        title: 'Hotel Exterior',
        category: 'Garden'
    },
    {
        url: `${GITHUB_PAGES_BASE_PATH}11.jpg`,
        title: 'Nearby Places',
        category: 'Temple'
    },
    {
        url: `${GITHUB_PAGES_BASE_PATH}fttemple.jpg`,
        title: 'Nearby Places',
        category: 'Temple'
    },
    {
        url: `${GITHUB_PAGES_BASE_PATH}13.jpg`,
        title: 'Hotel Exterior',
        category: 'Exterior'
    },
    {
        url: `${GITHUB_PAGES_BASE_PATH}vip.jpg`,
        title: 'Deluxe Suite',
        category: 'Rooms'
    },
    {
        url: `${GITHUB_PAGES_BASE_PATH}14.jpg`,
        title: 'Garden',
        category: 'Amenities'
    },
    {
        url: `${GITHUB_PAGES_BASE_PATH}templeview.jpg`,
        title: 'Nearby Attractions',
        category: 'Temple'
    },
    {
        url: `${GITHUB_PAGES_BASE_PATH}3bed.jpg`,
        title: 'Family Suite',
        category: 'Rooms'
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
        nav.classList.remove('show'); // Close mobile menu after clicking a link
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
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');

function openModal(index) {
    currentImageIndex = index;

    modalImage.src = galleryImages[index].url;
    modalTitle.textContent = galleryImages[index].title;
    modalCategory.textContent = galleryImages[index].category;

    galleryModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    galleryModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
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
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) { // Check if the click is directly on the modal background
        closeModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (galleryModal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Intersection Observer for animations (sections and cards)
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Start observing 50px before the viewport bottom
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed'); // Add a class to trigger CSS animation
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Select all sections and animated cards
    const elementsToAnimate = document.querySelectorAll(
        'section, .room-card, .gallery-item, .info-card, .contact-card, .booking-card'
    );

    elementsToAnimate.forEach(el => {
        // Initial state for animation (handled by CSS, but ensure no 'revealed' class initially)
        el.classList.remove('revealed');
        observer.observe(el);
    });

    // Preload gallery images for better performance, only when needed
    preloadGalleryImages();
});

// Preload images for better performance in the gallery
function preloadGalleryImages() {
    galleryImages.forEach(image => {
        const img = new Image();
        img.src = image.url;
        // Optionally, add a small fade-in once loaded if needed for specific large images
    });
}
