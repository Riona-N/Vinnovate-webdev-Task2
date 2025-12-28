// ===== Global Variables =====
let currentLanguage = 'en';
let currentTheme = 'dark';
let currentGalleryIndex = 0;
let galleryItems = [];
let championshipChart = null; // store Chart.js instance to allow re-rendering on theme changes

// ===== Language Data =====
const translations = {
    en: {},
    es: {}
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all features
    initNavigation();
    initHeroCounters();
    initTimeline();
    initStatsFilters();
    initGallery();
    initSettingsPanel();
    initPanelToggles();
    initPressCursor();
    initLazyLoading();
    initScrollAnimations();
    initChart();
    
    // Load from localStorage
    loadPreferences();
}

// ===== Navigation =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active section
        highlightActiveSection();
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll
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
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// ===== Hero Counter Animation =====
function initHeroCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== Timeline Expansion =====
function initTimeline() {
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const timelineContent = button.closest('.timeline-content');
            const details = timelineContent.querySelector('.timeline-details');
            
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                button.textContent = 'Hide Details';
            } else {
                button.textContent = 'View Details';
            }
        });
    });
}

// ===== Stats Filters =====
function initStatsFilters() {
    const filterButtons = document.querySelectorAll('.stats-filter .filter-btn');
    const statCards = document.querySelectorAll('.stat-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            statCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Trigger animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.5s ease-out';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Media Gallery — responsive items, filters, and accessible modal/lightbox
function initGallery() {
    // Small sample dataset using existing assets where possible (expandable). Images removed per request.
    galleryItems = [
        { id: 1, title: 'Rio 2016 Highlight', year: '2016', event: 'Olympics', type: 'video', src: './Rio.mp4', thumb: './2016 silver.jpg' },
        { id: 2, title: 'Tokyo 2021 Interview', year: '2021', event: 'Olympics', type: 'interview', src: './Tokyo.mp4', thumb: './Tokyo Olympics.png' },
        { id: 3, title: 'Training', year: '2022', event: 'Training', type: 'video', src: './videoplayback.mp4', thumb: './first.jpg' }
    ];

    renderGalleryItems();
    populateGalleryFilters();
    attachGalleryFilterHandlers();
    attachModalHandlers();
}

function renderGalleryItems(items = galleryItems) {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';

    items.forEach((item, idx) => {
        const el = document.createElement('button');
        el.className = `gallery-item media-${item.type}`;
        el.setAttribute('data-id', item.id);
        el.setAttribute('data-index', idx);
        el.setAttribute('aria-label', `${item.title} — ${item.event} ${item.year}`);
        el.innerHTML = `
            <div class="thumb" role="img" aria-hidden="true" style="background-image:url('${item.thumb}')">
                ${(item.type === 'video' || item.type === 'interview') ? '<span class="play-icon" aria-hidden="true">▶</span>' : ''}
            </div> 
            <div class="media-meta">
                <h4>${item.title}</h4>
                <div class="meta">${item.event} • ${item.year}</div>
            </div>
        `;

        el.addEventListener('click', () => openGalleryModal(idx));
        grid.appendChild(el);
    });
}

function populateGalleryFilters() {
    const yearSelect = document.getElementById('galleryYear');
    const eventSelect = document.getElementById('galleryEvent');
    if (!yearSelect || !eventSelect) return;

    const years = Array.from(new Set(galleryItems.map(i => i.year))).sort();
    const events = Array.from(new Set(galleryItems.map(i => i.event))).sort();

    years.forEach(y => {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
    });

    events.forEach(ev => {
        const opt = document.createElement('option');
        opt.value = ev;
        opt.textContent = ev;
        eventSelect.appendChild(opt);
    });
}

function attachGalleryFilterHandlers() {
    const yearSelect = document.getElementById('galleryYear');
    const eventSelect = document.getElementById('galleryEvent');
    if (yearSelect) yearSelect.addEventListener('change', applyGalleryFilter);
    if (eventSelect) eventSelect.addEventListener('change', applyGalleryFilter);

    const typeButtons = document.querySelectorAll('.type-filters .filter-btn');
    typeButtons.forEach(btn => btn.addEventListener('click', function() {
        typeButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        applyGalleryFilter();
    }));
}

let galleryModalEl = null;
function attachModalHandlers() {
    galleryModalEl = document.getElementById('galleryModal');
    if (!galleryModalEl) return;

    const closeBtn = galleryModalEl.querySelector('.modal-close');
    const backdrop = galleryModalEl.querySelector('.modal-backdrop');
    const prevBtn = galleryModalEl.querySelector('.modal-prev');
    const nextBtn = galleryModalEl.querySelector('.modal-next');

    closeBtn.addEventListener('click', closeGalleryModal);
    backdrop.addEventListener('click', closeGalleryModal);
    prevBtn.addEventListener('click', () => navigateGallery(-1));
    nextBtn.addEventListener('click', () => navigateGallery(1));

    document.addEventListener('keydown', (e) => {
        if (!galleryModalEl || galleryModalEl.getAttribute('aria-hidden') === 'true') return;
        if (e.key === 'Escape') closeGalleryModal();
        if (e.key === 'ArrowLeft') navigateGallery(-1);
        if (e.key === 'ArrowRight') navigateGallery(1);
    });
}

function applyGalleryFilter() {
    const year = document.getElementById('galleryYear') ? document.getElementById('galleryYear').value : 'all';
    const event = document.getElementById('galleryEvent') ? document.getElementById('galleryEvent').value : 'all';
    const typeBtn = document.querySelector('.type-filters .filter-btn.active');
    const type = typeBtn ? typeBtn.getAttribute('data-filter') : 'all';

    const filtered = galleryItems.filter(i => {
        return (year === 'all' || i.year === year) && (event === 'all' || i.event === event) && (type === 'all' || i.type === type);
    });

    renderGalleryItems(filtered);
}

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const item = galleryItems[currentGalleryIndex];
    const body = document.getElementById('modalBody');
    if (!body || !galleryModalEl) return;

    // Clear previous
    body.innerHTML = '';

    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        img.loading = 'lazy';
        body.appendChild(img);
    } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.style.maxHeight = '70vh';
        body.appendChild(video);
    } else if (item.type === 'interview') {
        // Support local MP4 interviews as video elements, but keep iframe option for external embed URLs
        if (typeof item.src === 'string' && item.src.match(/\.mp4(\?|$)/i)) {
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            video.style.maxHeight = '70vh';
            body.appendChild(video);
        } else {
            const iframe = document.createElement('iframe');
            iframe.src = item.src;
            iframe.width = '100%';
            iframe.height = '480';
            iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            body.appendChild(iframe);
        }
    }

    galleryModalEl.setAttribute('aria-hidden', 'false');
    galleryModalEl.classList.add('open');
    // focus modal body for keyboard interaction
    body.focus();
}

function closeGalleryModal() {
    if (!galleryModalEl) return;
    galleryModalEl.setAttribute('aria-hidden', 'true');
    galleryModalEl.classList.remove('open');

    const body = document.getElementById('modalBody');
    if (!body) return;

    // Pause any playing videos
    const video = body.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    body.innerHTML = '';
}

function navigateGallery(direction) {
    if (!galleryItems || galleryItems.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + direction + galleryItems.length) % galleryItems.length;
    openGalleryModal(currentGalleryIndex);
}

// Fan form removed — related markup and JS removed to keep site focused on stats and achievements.

// ===== Theme Toggle =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme();
        savePreferences();
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        syncSettingsControls();
    });
}

function applyTheme() {
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    } else {
        document.body.removeAttribute('data-theme');
    }
    // Re-render chart to pick up theme-aware CSS variables (safe if canvas not present)
    initChart();
}

function savePreferences() {
    localStorage.setItem('theme', currentTheme);
    localStorage.setItem('language', currentLanguage);
}

function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    
    if (savedTheme) {
        currentTheme = savedTheme;
        applyTheme();
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        document.getElementById('currentLang').textContent = currentLanguage.toUpperCase();
        applyLanguage();
    }
    syncSettingsControls();
}

// ===== Language Toggle =====
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    const currentLangSpan = document.getElementById('currentLang');
    
    langToggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        currentLangSpan.textContent = currentLanguage.toUpperCase();
        applyLanguage();
        savePreferences();
        syncSettingsControls();
    });
}

function applyLanguage() {
    const elements = document.querySelectorAll('[data-en], [data-es]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
}

// ===== Settings Panel (language & theme selectors) =====
function initSettingsPanel() {
    const langSelect = document.getElementById('settingsLanguage');
    const themeSelect = document.getElementById('settingsTheme');

    if (langSelect) {
        langSelect.value = currentLanguage;
        langSelect.addEventListener('change', () => {
            currentLanguage = langSelect.value || 'en';
            applyLanguage();
            savePreferences();
            syncSettingsControls();
        });
    }

    if (themeSelect) {
        themeSelect.value = currentTheme;
        themeSelect.addEventListener('change', () => {
            currentTheme = themeSelect.value || 'dark';
            applyTheme();
            savePreferences();
            syncSettingsControls();
        });
    }

    syncSettingsControls();
}

function syncSettingsControls() {
    const langSelect = document.getElementById('settingsLanguage');
    const themeSelect = document.getElementById('settingsTheme');
    const currentLangSpan = document.getElementById('currentLang');
    const themeToggleIcon = document.querySelector('#themeToggle i');

    if (langSelect) langSelect.value = currentLanguage;
    if (themeSelect) themeSelect.value = currentTheme;
    if (currentLangSpan) currentLangSpan.textContent = currentLanguage.toUpperCase();
    if (themeToggleIcon) themeToggleIcon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Set up mouse/focus listeners to keep aria-expanded attribute in sync for collapsible panels
function initPanelToggles() {
    const panels = document.querySelectorAll('.settings-panel, .connect-panel');
    panels.forEach(panel => {
        // initialize
        panel.setAttribute('aria-expanded', 'false');

        panel.addEventListener('mouseenter', () => {
            panel.setAttribute('aria-expanded', 'true');
            const body = panel.querySelector('.connect-body');
            if (body) body.setAttribute('aria-hidden', 'false');
        });
        panel.addEventListener('mouseleave', () => {
            panel.setAttribute('aria-expanded', 'false');
            const body = panel.querySelector('.connect-body');
            if (body) body.setAttribute('aria-hidden', 'true');
        });

        // keyboard accessibility: expand on focus within and collapse when focus leaves
        panel.addEventListener('focusin', () => {
            panel.setAttribute('aria-expanded', 'true');
            const body = panel.querySelector('.connect-body');
            if (body) body.setAttribute('aria-hidden', 'false');
        });
        panel.addEventListener('focusout', (e) => {
            // if focus moved outside the panel entirely, collapse
            if (!panel.contains(e.relatedTarget)) {
                panel.setAttribute('aria-expanded', 'false');
                const body = panel.querySelector('.connect-body');
                if (body) body.setAttribute('aria-hidden', 'true');
            }
        });
    });
}

// Toggle a global "pressed" state during pointer/touch press so the cursor shows the shuttlecock while the button is held
function initPressCursor() {
    const setPressed = (on) => {
        if (on) document.documentElement.classList.add('is-pressed');
        else document.documentElement.classList.remove('is-pressed');
    };

    window.addEventListener('mousedown', () => setPressed(true));
    window.addEventListener('mouseup', () => setPressed(false));
    window.addEventListener('mouseleave', () => setPressed(false));

    // Touch devices
    window.addEventListener('touchstart', () => setPressed(true), { passive: true });
    window.addEventListener('touchend', () => setPressed(false));

    // Safety: clear on blur
    window.addEventListener('blur', () => setPressed(false));
}

// ===== Lazy Loading =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .stat-card, .badge-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(element);
    });
}

// ===== Chart.js Implementation =====
function initChart() {
    const ctx = document.getElementById('championshipChart');
    
    if (!ctx) return;
    
    // Get computed style for colors from body so theme overrides are picked up
    const styles = getComputedStyle(document.body);
    const primaryColor = styles.getPropertyValue('--primary-color').trim() || '#0b6a3e';
    const secondaryColor = styles.getPropertyValue('--secondary-color').trim() || '#f6c200';
    // --text-light is set to white in dark mode and to a dark color in light mode
    const labelColor = styles.getPropertyValue('--text-light').trim() || '#08321f';
    
    const chartData = {
        labels: ['2013', '2014', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
            {
                label: 'BWF Titles',
                data: [1, 2, 3, 4, 6, 5, 3, 4, 2],
                backgroundColor: 'rgba(11, 106, 62, 0.18)',
                borderColor: primaryColor,
                borderWidth: 3,
                pointBackgroundColor: primaryColor,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.4
            },
            {
                label: 'Major Medals',
                data: [1, 1, 1, 1, 2, 1, 0, 1, 1],
                backgroundColor: 'rgba(97, 208, 255, 0.18)',
                borderColor: secondaryColor,
                borderWidth: 3,
                pointBackgroundColor: secondaryColor,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.4
            }
        ]
    };
    
    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: labelColor,
                        font: {
                            size: 14,
                            family: 'Poppins'
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    titleColor: secondaryColor,
                    bodyColor: '#ffffff',
                    borderColor: secondaryColor,
                    borderWidth: 2,
                    padding: 15,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(11, 106, 62, 0.08)',
                        drawBorder: false
                    },
                    ticks: {
                        color: labelColor,
                        font: {
                            size: 12,
                            family: 'Poppins'
                        }
                    }
                },

                x: {
                    grid: {
                        color: 'rgba(11, 106, 62, 0.08)',
                        drawBorder: false
                    },
                    ticks: {
                        color: labelColor,
                        font: {
                            size: 12,
                            family: 'Poppins'
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };
    
    // Destroy previous chart instance if present (helps when theme changes)
    if (championshipChart) {
        championshipChart.destroy();
        championshipChart = null;
    }

    championshipChart = new Chart(ctx, config);
}



// Parallax behavior removed — sections now scroll normally


// ===== Performance Optimization =====
// Debounce function for scroll events
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

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    highlightActiveSection();
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Map markers removed — no animation needed since map markup was removed.

// ===== Console Message =====
console.log('%c🏸 PV Sindhu - Official Website', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion for badminton', 'color: #a0a0a0; font-size: 14px;');
console.log('%cOlympic Medalist & World Champion | #KeepPushing', 'color: #ffd700; font-size: 16px; font-weight: bold;');

// ===== Easter Egg =====
let konami = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konami.push(e.key);
    konami = konami.slice(-konamiCode.length);
    
    if (konami.join('') === konamiCode.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
        body.style.animation = '';
    }, 5000);
    
    console.log('%c🏸 CHAMPION MODE ACTIVATED! 🏸', 'color: #ffd700; font-size: 24px; font-weight: bold;');
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== Service Worker Registration (for PWA support) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===== Print Styles =====
window.addEventListener('beforeprint', () => {
    document.body.style.background = '#ffffff';
});

window.addEventListener('afterprint', () => {
    applyTheme();
});

// Connect / Fan Form handling
(function() {
    const fanForm = document.getElementById('fanForm');
    if (!fanForm) return;

    const feedbackEl = document.getElementById('fanFeedback');

    fanForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        setFeedback('Sending...');
        const name = (fanForm.name.value || '').trim();
        const email = (fanForm.email.value || '').trim();
        const message = (fanForm.message.value || '').trim();
        const artInput = fanForm.art;

        if (!message) {
            setFeedback('Please enter a message.', true);
            return;
        }

        let artData = null;
        if (artInput && artInput.files && artInput.files[0]) {
            const file = artInput.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setFeedback('Attachment is too large (max 5MB).', true);
                return;
            }
            try {
                artData = await readFileAsDataURL(file);
            } catch (err) {
                setFeedback('Could not read attachment.', true);
                return;
            }
        }

        const stored = JSON.parse(localStorage.getItem('fanMessages') || '[]');
        stored.push({ name, email, message, art: artData, ts: Date.now() });
        localStorage.setItem('fanMessages', JSON.stringify(stored));
        fanForm.reset();
        setFeedback('Thanks! Your message has been saved (demo).');
        setTimeout(() => setFeedback(''), 5000);
    });

    function setFeedback(msg, isError = false) {
        if (!feedbackEl) return;
        feedbackEl.textContent = msg;
        feedbackEl.style.color = isError ? 'var(--secondary-color)' : '';
    }

    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result);
            r.onerror = () => reject(new Error('File read error'));
            r.readAsDataURL(file);
        });
    }
})();

// ===== Visibility Change Handler =====
// Title changes on tab visibility were removed to keep the page title consistent.
// If desired in future, add non-intrusive visibility behavior here (e.g. subtle badge updates).

// ===== Online/Offline Detection =====
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});
