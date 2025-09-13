// Initialize Vanta.js NET (particle network) effect for background
window.addEventListener('DOMContentLoaded', function () {
    if (window.VANTA && window.VANTA.NET) {
        window.VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x0a0a23, // solid dark
            color: 0x00fff7,
            points: 14.0,
            maxDistance: 22.0,
            spacing: 18.0,
            showDots: true,
            showLines: true
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Active navigation link
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav .nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });


    // Typing effect for homepage
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".typing-cursor");
    
    if (typedTextSpan) {
        const textArray = ["Monisha Bharadwaj"];
        const typingDelay = 150;
        const erasingDelay = 100;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }
        
        setTimeout(type, newTextDelay + 250);
    }

    // Scroll-triggered fade-in animations
    const animatedElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Contact form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            const data = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                    formStatus.className = 'success';
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                           formStatus.textContent = data["errors"].map(error => error["message"]).join(", ")
                           formStatus.className = 'error';
                        } else {
                           formStatus.textContent = "Oops! There was a problem submitting your form.";
                           formStatus.className = 'error';
                        }
                    })
                }
            }).catch(error => {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
                formStatus.className = 'error';
            });
        });
    }
});