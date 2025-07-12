// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Custom cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursor && cursorOutline) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseout', function() {
            cursor.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        
        document.addEventListener('mouseover', function() {
            cursor.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }
    
    // Theme toggler
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('bx-moon');
            themeIcon.classList.add('bx-sun');
        } else {
            themeIcon.classList.remove('bx-sun');
            themeIcon.classList.add('bx-moon');
        }
    });
    
    // Active navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const currentLocation = window.location.href;
    
    navLinks.forEach(link => {
        if (currentLocation.includes(link.href)) {
            link.classList.add('active');
        }
    });
    
    // Animated counters
    const counters = document.querySelectorAll('.counter');
    let started = false;
    
    function startCounters() {
        if (started) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / duration * 10;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.min(Math.ceil(current), target);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                    if (target > 100) {
                        counter.textContent += '+';
                    }
                }
            };
            
            updateCounter();
        });
        
        started = true;
    }
    
    // Observer for counter section
    const counterSection = document.querySelector('.counter');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.counter').forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('filter-active', 'bg-indigo-600');
                btn.classList.add('bg-gray-800', 'text-gray-300');
            });
            
            this.classList.add('filter-active', 'bg-indigo-600', 'text-white');
            this.classList.remove('bg-gray-800', 'text-gray-300');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                }
            });
        });
    });
    
    // Typing effect for hero section
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = ['exceptional websites.', 'powerful web apps.', 'engaging experiences.', 'business solutions.'];
        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
                typingDelay = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
                typingDelay = 100;
            }
            
            if (!isDeleting && letterIndex === currentWord.length) {
                isDeleting = true;
                typingDelay = 1500; // Pause at end of word
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 500; // Pause before typing new word
            }
            
            setTimeout(typeEffect, typingDelay);
        }
        
        setTimeout(typeEffect, 1000);
    }
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('[data-skill-level]');
    
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-skill-level');
                    entry.target.style.width = level + '%';
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
