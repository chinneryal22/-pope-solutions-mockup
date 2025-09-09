// Pope Solutions AI Platform - Interactive Features & Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initScrollAnimations();
    initMetricCounters();
    initInteractiveElements();
    initMobileMenu();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .product-card, .metric-card, .benefit, .dashboard-preview'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('animate-ready');
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card.animate-ready {
            transition-delay: 0.1s;
        }
        
        .feature-card:nth-child(2).animate-ready {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3).animate-ready {
            transition-delay: 0.3s;
        }
        
        .feature-card:nth-child(4).animate-ready {
            transition-delay: 0.4s;
        }
        
        .product-card.animate-ready {
            transition-delay: 0.2s;
        }
        
        .metric-card.animate-ready {
            transition-delay: 0.1s;
        }
        
        .metric-card:nth-child(2).animate-ready {
            transition-delay: 0.2s;
        }
        
        .metric-card:nth-child(3).animate-ready {
            transition-delay: 0.3s;
        }
        
        .metric-card:nth-child(4).animate-ready {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
}

// Animated counters for metrics
function initMetricCounters() {
    const counterElements = document.querySelectorAll('.stat-number, .metric-value, .metric-number');
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers appropriately
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('M')) {
                element.textContent = '$' + Math.floor(current) + 'M';
            } else if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (number > 0) {
                    animateCounter(entry.target, number);
                }
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(element => {
        counterObserver.observe(element);
    });
}

// Interactive elements and hover effects
function initInteractiveElements() {
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button click effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Dashboard live data simulation
    simulateLiveData();
}

// Simulate live data updates in dashboard preview
function simulateLiveData() {
    const dashboardMetrics = document.querySelectorAll('.dashboard-content .metric-value');
    
    if (dashboardMetrics.length === 0) return;
    
    const baseValues = {
        opportunities: 247,
        pipeline: 124,
        compliance: 89
    };
    
    setInterval(() => {
        dashboardMetrics.forEach((metric, index) => {
            const baseValue = Object.values(baseValues)[index];
            const variation = Math.floor(Math.random() * 10) - 5; // ±5 variation
            const newValue = baseValue + variation;
            
            if (index === 0) {
                metric.textContent = newValue;
            } else if (index === 1) {
                metric.textContent = '$' + newValue + 'M';
            } else if (index === 2) {
                metric.textContent = Math.max(85, Math.min(95, newValue)) + '%';
            }
        });
    }, 5000); // Update every 5 seconds
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu toggle button
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('mobile-menu-toggle');
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    navContainer.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    const mobileNavLinks = navLinks.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Add mobile menu styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            width: 30px;
            height: 30px;
            justify-content: space-between;
        }
        
        .mobile-menu-toggle span {
            display: block;
            height: 3px;
            width: 100%;
            background-color: var(--primary-blue);
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background-color: white;
                flex-direction: column;
                padding: var(--spacing-xl);
                box-shadow: var(--shadow-lg);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.mobile-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-links a {
                padding: var(--spacing-md) 0;
                border-bottom: 1px solid var(--gray-200);
                text-align: center;
            }
            
            .nav-links a:last-child {
                border-bottom: none;
            }
            
            body.menu-open {
                overflow: hidden;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
}

// Parallax scroll effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.dashboard-preview');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Update navigation background opacity based on scroll
    const navbar = document.querySelector('.navbar');
    const scrollPercentage = Math.min(scrolled / 100, 1);
    navbar.style.backgroundColor = `rgba(255, 255, 255, ${0.9 + (scrollPercentage * 0.1)})`;
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navLinks && navLinks.classList.contains('mobile-open')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
        }
    }
});

// Preload critical resources
function preloadResources() {
    // Preload any critical images or fonts
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Call preload function
preloadResources();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add custom cursor effect for interactive elements
document.addEventListener('mousemove', function(e) {
    const interactiveElements = document.elementsFromPoint(e.clientX, e.clientY);
    const isInteractive = interactiveElements.some(element => 
        element.classList.contains('btn-primary') || 
        element.classList.contains('btn-secondary') ||
        element.classList.contains('product-card') ||
        element.tagName === 'A'
    );
    
    document.body.style.cursor = isInteractive ? 'pointer' : 'default';
});