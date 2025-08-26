document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.style.display = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.style.display = 'none';
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let allValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#e5e7eb';
                }
            });

            if (!allValid) {
                e.preventDefault();
                alert('Por favor, completa todos los campos obligatorios.');
            }
        });
    });

    // Calculator functionality
    const calcButton = document.querySelector('.calculator-form button[type="button"]');
    if (calcButton) {
        calcButton.addEventListener('click', function() {
            const weight = document.querySelector('input[placeholder="0.5"]').value;
            const service = document.querySelector('.calculator-form select').value;
            
            if (weight) {
                let price = 0;
                switch(service) {
                    case 'nacional':
                        price = Math.max(5.99, parseFloat(weight) * 3.5);
                        break;
                    case 'express':
                        price = Math.max(19.99, parseFloat(weight) * 8.0);
                        break;
                    case 'internacional':
                        price = Math.max(15.99, parseFloat(weight) * 12.0);
                        break;
                    default:
                        price = 15.99;
                }
                
                const resultPrice = document.querySelector('.price-display .price');
                if (resultPrice) {
                    resultPrice.textContent = price.toFixed(2) + '€';
                }
                
                // Show result
                const calcResult = document.querySelector('.calc-result');
                if (calcResult) {
                    calcResult.style.display = 'block';
                }
            } else {
                alert('Por favor, ingresa el peso del paquete.');
            }
        });
    }

    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 500);
        }, 5000);
    });

    // Add loading states to buttons
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            button.disabled = true;
            
            // Re-enable after form submission attempt
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);
        });
    });

    // Animate counters on scroll
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                    if (target && !counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter, target);
                    }
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    function animateCounter(element, target) {
        const originalText = element.textContent;
        const isPercentage = originalText.includes('%');
        const hasPlus = originalText.includes('+');
        const isTime = originalText.includes('/');
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current).toString();
            if (isPercentage) displayValue += '%';
            if (hasPlus) displayValue += '+';
            if (isTime) displayValue = originalText; // Keep original for time format
            
            element.textContent = displayValue;
        }, 40);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .service-card, .help-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Tracking number format
    const trackingInputs = document.querySelectorAll('input[name="trackingNumber"]');
    trackingInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Auto-uppercase and format tracking number
            e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            if (e.target.value.length > 10) {
                e.target.value = e.target.value.substring(0, 10);
            }
        });
    });

    // Add floating effect to hero illustration
    const heroIllustration = document.querySelector('.delivery-illustration');
    if (heroIllustration) {
        setInterval(() => {
            heroIllustration.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
        }, 50);
    }
});