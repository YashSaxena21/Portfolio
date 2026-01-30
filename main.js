// Portfolio JavaScript - Yash Saxena

// Update year in footer
document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('darkModeToggle');
    
    if (!toggle) return;
    
    function setTheme(mode) {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Read theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
    
    toggle.addEventListener('click', function () {
        const isDark = document.body.classList.contains('dark-mode');
        const newTheme = isDark ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Typing effect for research topics
document.addEventListener('DOMContentLoaded', function () {
    const typedEl = document.getElementById('typed-role');
    
    if (!typedEl) return;
    
    const topics = ['NeuroSymbolic AI', 'Source Attribution', 'Trustworthy AI', 'Information Retrieval', 'NLP'];
    let topicIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenTopics = 1800;
    
    function type() {
        if (charIndex < topics[topicIndex].length) {
            typedEl.textContent += topics[topicIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenTopics);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedEl.textContent = topics[topicIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            topicIndex = (topicIndex + 1) % topics.length;
            setTimeout(type, 600);
        }
    }
    
    setTimeout(type, 500);
});

// Counter animation using IntersectionObserver
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        el.textContent = Math.floor(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
});

// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Add interactive tilt effect to research focus cards on desktop
document.addEventListener('DOMContentLoaded', function () {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouch) {
        const cards = document.querySelectorAll('.focus-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const rotateX = ((y / rect.height) - 0.5) * 8;
                const rotateY = ((x / rect.width) - 0.5) * -8;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Set active nav link based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Call once on load
});
