// Git commit info - Auto-generated, do not edit manually
const GIT_COMMIT_HASH = '9c46948';
const GIT_REPO_URL = 'https://github.com/anu-physical-therapy/web/commit/';

document.addEventListener('DOMContentLoaded', () => {
    // Update git commit hash in footer
    const gitCommitHash = document.getElementById('git-commit-hash');
    const gitCommitLink = document.getElementById('git-commit-link');
    if (gitCommitHash && gitCommitLink) {
        gitCommitHash.textContent = GIT_COMMIT_HASH;
        gitCommitLink.href = GIT_REPO_URL + GIT_COMMIT_HASH;
    }
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Form submission tracking
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
        });
    }
    
    // Track consultation button clicks
    const consultationBtn = document.querySelector('.hero .btn');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'button_click', {
                    'event_category': 'CTA',
                    'event_label': 'Book a Consultation'
                });
            }
        });
    }
    
    // Track phone and email clicks
    const contactLinks = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            const isPhone = this.href.startsWith('tel:');
            if (typeof gtag === 'function') {
                gtag('event', 'contact_click', {
                    'event_category': 'Contact',
                    'event_label': isPhone ? 'Phone' : 'Email'
                });
            }
        });
    });
    
    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'outbound_link', {
                    'event_category': 'External Links',
                    'event_label': this.href
                });
            }
        });
    });
    
    // Track service card views
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const serviceName = entry.target.querySelector('h3').textContent;
                if (typeof gtag === 'function') {
                    gtag('event', 'service_view', {
                        'event_category': 'Content',
                        'event_label': serviceName
                    });
                }
                serviceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-links a.active')?.classList.remove('active');
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
});