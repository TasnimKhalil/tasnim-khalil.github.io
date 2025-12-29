// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Theme Toggle with fallback (no localStorage dependency)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Try to load saved theme, but don't fail if localStorage is unavailable
let currentTheme = 'dark'; // default theme
try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
} catch (e) {
    console.log('localStorage not available, using default theme');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = body.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        currentTheme = newTheme;
        
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            console.log('Could not save theme preference');
        }
        
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// Header Background on Scroll
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
if (typedTextSpan) {
    const isEnglish = document.documentElement.lang === 'en';
    const textArray = isEnglish ? [
        'Data Science Student',
        'ML Engineering Enthusiast', 
        'AI Problem Solver'
    ] : [
        'Étudiante en Data Science',
        'Passionnée de ML Engineering',
        'Résolution de problèmes IA'
    ];
    
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing effect
    setTimeout(type, newTextDelay + 250);
}

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.remove('hidden'), 10);
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories && categories.split(' ').includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.remove('hidden'), 10);
                    } else {
                        card.classList.add('hidden');
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                }
            });
        });
    });
}

// Console Easter Egg
console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #64ffda;');
console.log('%c🚀 Thanks for checking out my portfolio!', 'font-size: 16px; color: #8892b0;');
console.log('%c📧 Let\'s connect: tasnimkhelil24@gmail.com', 'font-size: 14px; color: #64ffda;');
