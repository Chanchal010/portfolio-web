
const themeButtons = document.querySelectorAll('.theme-btn');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === savedTheme);
    });
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === 'dark');
        });
    } else if (prefersLight) {
        htmlElement.setAttribute('data-theme', 'light');
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === 'light');
        });
    }
}

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');

        themeButtons.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        if (theme === 'default') {
            htmlElement.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        } else {
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    });
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const typingElement = document.getElementById('typing-text');
const typingTexts = ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'UI/UX Enthusiast'];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function typeEffect() {
    const currentText = typingTexts[typingIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
        typingDelay = 500; 
    }

    setTimeout(typeEffect, typingDelay);
}

window.addEventListener('load', typeEffect);

const fadeElements = document.querySelectorAll('.fade-in');
const showElement = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);

        if (isVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('load', showElement);
window.addEventListener('scroll', showElement);

const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');

projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        projectFilters.forEach(f => f.classList.remove('active'));

        filter.classList.add('active');

        const filterValue = filter.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const testimonialSlider = document.querySelector('.testimonials-slider');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');
let currentSlide = 0;
const slideWidth = 100;
const slideCount = document.querySelectorAll('.testimonial').length;

const updateSlider = () => {
    testimonialSlider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

    
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
};
const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
};

const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
};

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

let slideInterval = setInterval(nextSlide, 5000);

testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formPopup = document.getElementById('form-popup');
const closePopup = document.getElementById('close-popup');
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};
const formErrors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    subject: document.getElementById('subject-error'),
    message: document.getElementById('message-error')
};
const popupFields = {
    name: document.getElementById('popup-name'),
    email: document.getElementById('popup-email'),
    subject: document.getElementById('popup-subject'),
    message: document.getElementById('popup-message')
};

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

Object.keys(formInputs).forEach(key => {
    formInputs[key].addEventListener('input', () => {
        if (key === 'email') {
            if (!validateEmail(formInputs[key].value) && formInputs[key].value !== '') {
                formErrors[key].style.display = 'block';
            } else {
                formErrors[key].style.display = 'none';
            }
        } else {
            if (formInputs[key].value === '') {
                formErrors[key].style.display = 'block';
            } else {
                formErrors[key].style.display = 'none';
            }
        }
    });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    Object.keys(formInputs).forEach(key => {
        if (formInputs[key].value === '') {
            formErrors[key].style.display = 'block';
            isValid = false;
        }
    });
    
    if (!validateEmail(formInputs.email.value)) {
        formErrors.email.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        Object.keys(popupFields).forEach(key => {
            popupFields[key].textContent = formInputs[key].value;
        });
        
        formPopup.classList.add('active');
        
        contactForm.reset();
    }
});

closePopup.addEventListener('click', () => {
    formPopup.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === formPopup) {
        formPopup.classList.remove('active');
    }
});