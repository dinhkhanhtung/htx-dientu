// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Form submission handler with enhanced validation
document.getElementById('join-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Enhanced validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!name) {
        alert('Vui lòng nhập họ tên.');
        document.getElementById('name').focus();
        return;
    }

    if (!email) {
        alert('Vui lòng nhập email.');
        document.getElementById('email').focus();
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Vui lòng nhập email hợp lệ.');
        document.getElementById('email').focus();
        return;
    }

    if (!phone) {
        alert('Vui lòng nhập số điện thoại.');
        document.getElementById('phone').focus();
        return;
    }

    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số).');
        document.getElementById('phone').focus();
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Đang Gửi...';
    submitBtn.disabled = true;

    // Simulate form submission (in real scenario, send to server)
    setTimeout(() => {
        alert(`Cảm ơn ${name}! Chúng tôi sẽ liên hệ với bạn qua ${email} hoặc ${phone} trong thời gian sớm nhất để hoàn tất đăng ký.`);
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Enhanced Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Special animations for different sections
            if (entry.target.id === 'services') {
                animateServiceCards(entry.target);
            } else if (entry.target.id === 'stats') {
                animateStats(entry.target);
            }
        }
    });
}, observerOptions);

// Animate service cards
function animateServiceCards(section) {
    const cards = section.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Animate stats
function animateStats(section) {
    const stats = section.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const number = stat.textContent;
        if (number.includes('+')) {
            animateNumber(stat, number);
        }
    });
}

// Number animation
function animateNumber(element, target) {
    const text = target.replace(/\D/g, '');
    const suffix = target.replace(/[\d\s]/g, '');
    const num = parseInt(text);
    let current = 0;
    const increment = num / 30;

    const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
            element.textContent = num + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 50);
}

// Initialize animations
document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'hero') {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    }
});

// Service cards staggered animation
function animateServiceCards(section) {
    const cards = section.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Add loading animation to form
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Floating Phone Icon Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const floatingPhone = document.getElementById('floating-phone');
    const phoneLink = floatingPhone.querySelector('.phone-link');

    // Add click tracking for analytics (optional)
    phoneLink.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Phone call initiated from floating button');

        // Add a subtle animation feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Pause animation when user hovers (already handled by CSS)
    // But we can add some additional interactivity
    floatingPhone.addEventListener('mouseenter', function() {
        // Optional: Add sound notification or other effects
        // For now, CSS handles the pause and scale
    });
});
