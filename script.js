// =========================
// MOBILE MENU TOGGLE
// =========================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// =========================
// WHATSAPP BUTTON
// =========================

function openWhatsApp() {
    const phoneNumber = '27718001803';
    const message = encodeURIComponent('Hi Nexa Living, I am interested in becoming a distributor. Can you provide more information?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// =========================
// DISTRIBUTOR FORM SUBMISSION
// =========================

const distributorForm = document.getElementById('distributorForm');

distributorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(distributorForm);
    const data = {
        name: formData.get('name'),
        surname: formData.get('surname'),
        phone: formData.get('phone'),
        province: formData.get('province'),
        city: formData.get('city'),
        email: formData.get('email'),
        experience: formData.get('experience')
    };

    // Validate form
    if (!data.name || !data.surname || !data.phone || !data.province || !data.city || !data.email) {
        alert('Please fill in all required fields');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Validate phone
    if (data.phone.length < 10) {
        alert('Please enter a valid phone number');
        return;
    }

    // Send via WhatsApp
    sendViaWhatsApp(data);
});

function sendViaWhatsApp(data) {
    const phoneNumber = '27718001803';
    const message = encodeURIComponent(
        `🟢 NEW DISTRIBUTOR APPLICATION\n\n` +
        `Name: ${data.name} ${data.surname}\n` +
        `Phone: ${data.phone}\n` +
        `Email: ${data.email}\n` +
        `Province: ${data.province}\n` +
        `City: ${data.city}\n` +
        `Business Experience: ${data.experience || 'Not provided'}\n\n` +
        `Please respond to this application.`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Show success message
    showSuccessMessage();

    // Reset form
    distributorForm.reset();
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #00A651;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = '✓ Application submitted! Check your WhatsApp.';
    
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// =========================
// SCROLL ANIMATIONS
// =========================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.product-card, .feature, .testimonial-card, .vision-box, .mission-box'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});

// =========================
// SMOOTH SCROLL FOR BUTTONS
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =========================
// ACTIVE NAVIGATION INDICATOR
// =========================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = '0.7';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.opacity = '1';
        }
    });
});

// =========================
// FORM INPUT VALIDATION
// =========================

const inputs = document.querySelectorAll('.distributor-form input, .distributor-form textarea');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ff6b6b';
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#006B3F';
    });
});

// =========================
// KEYBOARD ACCESSIBILITY
// =========================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Accessibility: Allow Enter to submit form
    if (e.key === 'Enter' && e.target.closest('.distributor-form')) {
        const submitBtn = distributorForm.querySelector('button[type="submit"]');
        if (e.target !== submitBtn && e.target.tagName !== 'TEXTAREA') {
            submitBtn.click();
        }
    }
});

// =========================
// PAGE LOAD ANIMATION
// =========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// =========================
// UTILITY: ADD ANIMATION KEYFRAMES
// =========================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);

// =========================
// GOOGLE ANALYTICS PLACEHOLDER
// =========================

// Add your Google Analytics code here when ready:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'YOUR_GOOGLE_ANALYTICS_ID');

console.log('Nexa Living Website - All systems operational ✓');
