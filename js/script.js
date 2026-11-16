/* ==================== FLOATING FUTURISTIC DEVELOPER PROFILE CARD PORTFOLIO ==================== */

// ==================== LOADING SCREEN ==================== 
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1200);
});

// ==================== MUSIC PLAYER ==================== 
const musicPlayerBtn = document.getElementById('musicPlayerBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;

if (musicPlayerBtn && backgroundMusic) {
    // Set initial state dari audio element
    isPlaying = !backgroundMusic.paused;
    
    // Autoplay akan trigger 'play' event automatically dari HTML autoplay attribute
    // Tapi kita pastikan state sinkron
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Pastikan autoplay berhasil, kalau tidak bisa due to browser policy
            if (backgroundMusic.paused) {
                console.log('Autoplay blocked, waiting for user interaction');
                isPlaying = false;
            } else {
                isPlaying = true;
            }
            updateMusicPlayerUI();
        }, 500);
    });

    musicPlayerBtn.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(error => {
                console.error('Error playing music:', error);
            });
            isPlaying = true;
        }
        updateMusicPlayerUI();
    });

    // Update UI when music ends
    backgroundMusic.addEventListener('ended', () => {
        isPlaying = false;
        updateMusicPlayerUI();
    });

    // Update UI when music is playing
    backgroundMusic.addEventListener('play', () => {
        isPlaying = true;
        updateMusicPlayerUI();
    });

    // Update UI when music is paused
    backgroundMusic.addEventListener('pause', () => {
        isPlaying = false;
        updateMusicPlayerUI();
    });

    // Handle audio errors
    backgroundMusic.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        isPlaying = false;
        updateMusicPlayerUI();
    });

    function updateMusicPlayerUI() {
        const iconPlay = musicPlayerBtn.querySelector('.icon-play');
        const iconPause = musicPlayerBtn.querySelector('.icon-pause');
        
        if (isPlaying) {
            musicPlayerBtn.classList.add('playing');
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        } else {
            musicPlayerBtn.classList.remove('playing');
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
        }
    }
}

// ==================== SCROLL PROGRESS BAR ==================== 
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// ==================== THEME TOGGLE ==================== 
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.classList.add('light-mode');
    }
})();

themeToggle.addEventListener('click', () => {
    body.style.transition = 'background-color 0.25s ease, color 0.25s ease';
    body.classList.toggle('light-mode');
    
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    
    setTimeout(() => body.style.transition = '', 300);
});

// ==================== TYPEWRITER EFFECT ==================== 
const typingText = document.getElementById('typingText');
const roles = [
    'Creative Developer',
    'Frontend Developer',
    'UI/UX Enthusiast',
    '3D Web Designer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 75;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 2000);
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

setTimeout(typeWriter, 1000);

// ==================== FLOATING DEVELOPER CARD 3D TILT ==================== 
const developerCard = document.querySelector('.developer-card');

if (developerCard) {
    const cardContainer = document.querySelector('.developer-card-container');
    let bounds;
    
    function updateBounds() {
        bounds = cardContainer.getBoundingClientRect();
    }
    
    updateBounds();
    window.addEventListener('resize', updateBounds);
    
    // Mouse move for 3D tilt effect
    cardContainer.addEventListener('mousemove', (e) => {
        if (!bounds) return;
        
        // Calculate mouse position relative to card center (-1 to 1)
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;
        
        // Apply subtle 3D rotation (max 8 degrees - reduced from 12)
        const rotateY = percentX * 8;
        const rotateX = -percentY * 8;
        
        developerCard.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(15px)
        `;
    });
    
    // Reset on mouse leave
    cardContainer.addEventListener('mouseleave', () => {
        developerCard.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateZ(0px)
        `;
    });
    
    console.log('✨ Floating Developer Card initialized');
}

// ==================== FLOATING NAVIGATION ==================== 
const navLinks = document.querySelectorAll('.nav-link-floating');
const sections = document.querySelectorAll('section');

function setActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== HAMBURGER MENU ==================== 
const hamburger = document.getElementById('hamburgerMenu');
const navMenuFloating = document.querySelector('.nav-menu-floating');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenuFloating.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    const navLinksHamburger = navMenuFloating?.querySelectorAll('.nav-link-floating');
    if (navLinksHamburger) {
        navLinksHamburger.forEach(link => {
            link.addEventListener('click', () => {
                navMenuFloating.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// ==================== SCROLL REVEAL ==================== 
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

const fadeElements = document.querySelectorAll('.org-card, .project-card, .about-content, .contact-content');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ==================== FORM SUBMISSION ==================== 
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Mengirim...';
        submitBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            submitBtn.textContent = 'Terkirim! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.pointerEvents = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ==================== PARALLAX ==================== 
let ticking = false;

function updateParallax() {
    const scrolled = window.scrollY;
    const gradientBg = document.querySelector('.gradient-bg');
    
    if (gradientBg && scrolled < window.innerHeight) {
        gradientBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ==================== INITIALIZE ==================== 
setActiveLink();
updateScrollProgress();

console.log('%c✨ Floating Developer Card Portfolio', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
console.log('%c🎴 New Clean Design - No Lanyard System', 'color: #10b981; font-size: 12px;');
