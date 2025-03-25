document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Mock location search functionality
    const searchBtn = document.getElementById('search-btn');
    const locationInput = document.getElementById('location-input');
    const locationResults = document.getElementById('location-results');
    
    if (searchBtn && locationInput && locationResults) {
        searchBtn.addEventListener('click', () => {
            const query = locationInput.value.trim();
            if (query) {
                // In a real app, this would be an API call
                locationResults.innerHTML = `
                    <h3>Locations near ${query}</h3>
                    <div class="location">
                        <h4>Quickly Boba - Downtown</h4>
                        <p>123 Main St, ${query}</p>
                        <p>Open today: 10AM - 10PM</p>
                    </div>
                    <div class="location">
                        <h4>Quickly Boba - Mall Location</h4>
                        <p>456 Shopping Ave, ${query}</p>
                        <p>Open today: 11AM - 9PM</p>
                    </div>
                `;
                locationResults.style.display = 'block';
                
                // Scroll to results
                locationResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to sections as they come into view
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Image lazy loading fallback
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});
// Add this to your existing JavaScript
function initDirections() {
    const directionsBtn = document.createElement('button');
    directionsBtn.className = 'btn directions-btn';
    directionsBtn.innerHTML = 'Get Directions from Your Location';
    directionsBtn.addEventListener('click', getDirections);
    
    const directionsCta = document.querySelector('.directions-cta');
    if (directionsCta) {
        directionsCta.appendChild(directionsBtn);
    }
}

function getDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                window.open(
                    `https://www.google.com/maps/dir/${lat},${lng}/22015+Main+St+UNIT+E,+Carson,+CA+90745`,
                    '_blank'
                );
            },
            (error) => {
                // Fallback if user denies location
                window.open(
                    'https://www.google.com/maps/dir//22015+Main+St+UNIT+E,+Carson,+CA+90745',
                    '_blank'
                );
            }
        );
    } else {
        // Fallback for browsers without geolocation
        window.open(
            'https://www.google.com/maps/dir//22015+Main+St+UNIT+E,+Carson,+CA+90745',
            '_blank'
        );
    }
}

// Call this in your DOMContentLoaded event
initDirections();