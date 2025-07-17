// JavaScript for Hasini Sai Maram Portfolio

// Skills Data
const skillsData = {
    technical: [
        'Python', 'C++', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 
        'Git', 'MySQL', 'React', 'Node.js', 'MongoDB', 'Express.js'
    ],
    soft: [
        'Problem Solving', 'Team Collaboration', 'Communication', 
        'Leadership', 'Time Management', 'Critical Thinking'
    ]
};

// Projects Data
const projectsData = [
    {
        title: 'AgriMarket',
        description: 'A comprehensive web interface designed to streamline agricultural product purchases for consumers. Features include product browsing, cart management, and secure checkout processes.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'MySQL'],
        features: [
            'User-friendly product catalog',
            'Shopping cart functionality',
            'Secure payment processing',
            'Order tracking system',
            'Responsive design'
        ]
    },
    {
        title: 'To-Do List Web Application',
        description: 'An intuitive task management system designed specifically for students to enhance productivity and organization. Includes priority levels, due dates, and category sorting.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Local Storage'],
        features: [
            'Task creation and management',
            'Priority level assignment',
            'Due date tracking',
            'Category-based organization',
            'Progress tracking'
        ]
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Populate skills
    populateSkills();
    
    // Populate projects
    populateProjects();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize scroll effects
    initializeScrollEffects();
});

// Initialize animations
function initializeAnimations() {
    // Add loading animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('loading');
    });
    
    // Trigger animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Populate skills
function populateSkills() {
    const technicalSkillsContainer = document.getElementById('technical-skills');
    const softSkillsContainer = document.getElementById('soft-skills');
    
    // Technical skills
    skillsData.technical.forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.textContent = skill;
        technicalSkillsContainer.appendChild(badge);
    });
    
    // Soft skills
    skillsData.soft.forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'skill-badge soft-skill';
        badge.textContent = skill;
        softSkillsContainer.appendChild(badge);
    });
}

// Populate projects
function populateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-md-6 mb-4';
        
        projectCard.innerHTML = `
            <div class="project-card">
                <div class="card-body p-4">
                    <h3 class="project-title">
                        <i class="bi bi-globe text-primary me-2"></i>
                        ${project.title}
                    </h3>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-tech">
                        <h5 class="text-primary mb-2">Technologies Used:</h5>
                        <div class="d-flex flex-wrap gap-1">
                            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h5 class="text-accent mb-2">Key Features:</h5>
                        <ul class="project-features list-unstyled">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    let scrollTimer = null;
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Clear existing timer
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        
        // Set a timer to run after scrolling ends
        scrollTimer = setTimeout(function() {
            updateScrollIndicator();
        }, 150);
    });
    
    // Initial call
    updateScrollIndicator();
}

// Update scroll indicator
function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) {
        // Create scroll indicator if it doesn't exist
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        document.body.appendChild(indicator);
    }
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    document.querySelector('.scroll-indicator').style.width = scrollPercent + '%';
}

// Utility functions
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

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to skill badges
    setTimeout(() => {
        const skillBadges = document.querySelectorAll('.skill-badge');
        skillBadges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }, 1000);
    
    // Add typing effect to hero section
    const heroText = document.querySelector('.hero-section .lead');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});