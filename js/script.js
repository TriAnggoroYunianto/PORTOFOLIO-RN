// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save theme preference
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// ==================== Card Flip Effect (Improved) ====================
const cardFlip = document.querySelector('.card-flip');

if (cardFlip) {
    let isFlipped = false;
    let isAnimating = false;

    // Touch support for mobile devices
    cardFlip.addEventListener('touchstart', (e) => {
        if (isAnimating) return;
        
        isAnimating = true;
        isFlipped = !isFlipped;
        
        if (isFlipped) {
            cardFlip.style.transform = 'rotateY(180deg) scale(1.02)';
        } else {
            cardFlip.style.transform = 'rotateY(0deg) scale(1)';
        }
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    });

    // Prevent default touch behavior
    cardFlip.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
}

// ==================== Mobile Menu Toggle ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== Navbar Scroll Effect ====================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== Active Navigation Link ====================
const sections = document.querySelectorAll('section');

function setActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ==================== Smooth Scroll ====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Fade In Animation on Scroll ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
const fadeElements = document.querySelectorAll('.org-card, .project-card, .about-content, .contact-content');
fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ==================== Form Submission ====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send the data to a server here
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
    });
}

// ==================== Mouse Parallax Effect ====================
const hero = document.querySelector('.hero');
const floatingCard = document.querySelector('.floating-card');

if (hero && floatingCard) {
    hero.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 30;
        const moveY = (mouseY - 0.5) * 30;
        
        floatingCard.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// ==================== Scroll Progress Indicator ====================
function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #8B5CF6, #EC4899);
            z-index: 9999;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${scrolled}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// ==================== Count Up Animation for Stats ====================
function animateCount(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCount(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ==================== Project Card Tilt Effect ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== Cursor Effect ====================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #8B5CF6;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;
document.body.appendChild(cursor);

// Only show custom cursor on larger screens
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
}

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#EC4899';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#8B5CF6';
    });
});

// ==================== Initialize ====================
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Set initial active link
    setActiveLink();
    
    // Update scroll progress
    updateScrollProgress();
});

// ==================== Console Message ====================
console.log('%c👋 Welcome to my portfolio!', 'color: #8B5CF6; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #EC4899; font-size: 14px;');

// ==================== Loading Screen Animation ====================
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// ==================== Canvas Particles System (Stars) ====================
const particlesCanvas = document.querySelector('.particles-canvas');
if (particlesCanvas) {
    const ctx = particlesCanvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        particlesCanvas.width = particlesCanvas.offsetWidth;
        particlesCanvas.height = particlesCanvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star particle system
    const stars = [];
    const starCount = 100; // Lebih banyak bintang tapi lebih ringan

    class Star {
        constructor() {
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
            this.size = Math.random() * 2 + 0.5; // Bintang lebih kecil
            this.opacity = Math.random();
            this.twinkleSpeed = Math.random() * 0.02 + 0.01;
            this.growing = Math.random() > 0.5;
        }

        update() {
            // Twinkle effect (berkelap-kelip)
            if (this.growing) {
                this.opacity += this.twinkleSpeed;
                if (this.opacity >= 1) {
                    this.growing = false;
                }
            } else {
                this.opacity -= this.twinkleSpeed;
                if (this.opacity <= 0.1) {
                    this.growing = true;
                }
            }
        }

        draw() {
            // Bintang putih dengan gradient
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(0.5, `rgba(168, 85, 247, ${this.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(168, 85, 247, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Tambahkan efek bintang 4 sudut (cross)
            if (this.opacity > 0.7) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(this.x - this.size * 2, this.y);
                ctx.lineTo(this.x + this.size * 2, this.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.size * 2);
                ctx.lineTo(this.x, this.y + this.size * 2);
                ctx.stroke();
            }
        }
    }

    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    // Animation loop (lebih ringan, tanpa koneksi garis)
    function animateStars() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animateStars);
    }
    animateStars();
}

// ==================== Enhanced Scroll Animations ====================
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, scrollObserverOptions);

// Apply animations to elements
document.querySelectorAll('.float-up, .slide-in-left, .slide-in-right').forEach(el => {
    if (!el.classList.contains('animated')) {
        el.style.opacity = '0';
        if (el.classList.contains('float-up')) {
            el.style.transform = 'translateY(50px)';
        } else if (el.classList.contains('slide-in-left')) {
            el.style.transform = 'translateX(-50px)';
        } else if (el.classList.contains('slide-in-right')) {
            el.style.transform = 'translateX(50px)';
        }
        scrollAnimationObserver.observe(el);
    }
});

// ==================== Magnetic Button Effect ====================
document.querySelectorAll('.btn, .cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ==================== Spotlight Cursor Effect ====================
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
});

// ==================== Smooth Section Transitions ====================
const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
    section.style.transition = 'all 0.5s ease-in-out';
});

// ==================== Organization Card Hover Effects ====================
const orgCards = document.querySelectorAll('.org-card');
orgCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== Glowing Elements on Scroll ====================
const glowElements = document.querySelectorAll('.glow-on-hover');
glowElements.forEach(el => {
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.5)';
            }
        });
    }, { threshold: 0.5 });
    
    glowObserver.observe(el);
});

// ==================== Performance Optimization ====================
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations handled here
    });
}, { passive: true });

// ==================== Initialize All Animations ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes after DOM is ready
    setTimeout(() => {
        document.body.classList.add('animations-ready');
    }, 100);
});
