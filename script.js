/**
 * THE SPORTS HERALD — Main JavaScript
 * Handles: scroll effects, animations, mobile menu, form, scroll-to-top
 */

// ── Reveal on scroll (Intersection Observer) ──────────────────────────────
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of the same parent slightly
      const siblings = entry.target.parentElement.querySelectorAll('.reveal-up');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));


// ── Navbar: solid on scroll ───────────────────────────────────────────────
const navbar = document.getElementById('navbar');

let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Add scrolled class to navbar
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Hide/show scroll top button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  lastScrollY = scrollY;
}, { passive: true });


// ── Mobile Menu ───────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const menuOverlay = document.getElementById('menuOverlay');
const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

function openMenu() {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});


// ── Smooth scroll for anchor links ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});


// ── Scroll to top button ──────────────────────────────────────────────────
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ── Active nav link highlighting ──────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(s => activeLinkObserver.observe(s));


// ── Contact Form ──────────────────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const form = document.getElementById('contactForm');

  // Show loading state
  btn.disabled = true;
  btn.textContent = 'Sending…';
  btn.style.opacity = '0.7';

  // Simulate submission (replace with real backend/email service)
  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
    form.reset();

    // Reset after 6 seconds
    setTimeout(() => {
      btn.style.display = '';
      btn.style.opacity = '';
      btn.disabled = false;
      btn.textContent = 'Send Message';
      success.style.display = 'none';
    }, 6000);
  }, 1200);
}


// ── Parallax on hero image (subtle) ──────────────────────────────────────
const heroImg = document.querySelector('.hero__img');
if (heroImg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `scale(1.04) translateY(${scrolled * 0.18}px)`;
    }
  }, { passive: true });
}


// ── Ticker pause on focus (accessibility) ────────────────────────────────
const tickerTrack = document.querySelector('.ticker__track');
if (tickerTrack) {
  tickerTrack.addEventListener('focusin', () => {
    tickerTrack.querySelector('.ticker__items').style.animationPlayState = 'paused';
  });
  tickerTrack.addEventListener('focusout', () => {
    tickerTrack.querySelector('.ticker__items').style.animationPlayState = '';
  });
}


// ── Card hover tilt effect (subtle 3D) ────────────────────────────────────
const tiltCards = document.querySelectorAll('.tournament__block, .why__item');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// ── Nav hamburger animated lines ──────────────────────────────────────────
// Ensure aria attributes are set
hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('aria-controls', 'mobileMenu');

// ── Init: force first section reveals ────────────────────────────────────
document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
  setTimeout(() => {
    el.classList.add('is-visible');
  }, 200 + i * 150);
});

// ── Lightbox for News Images ──────────────────────────────────────────────
const newsImages = document.querySelectorAll('.news-img');
if (newsImages.length > 0) {
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  
  const lightboxImg = document.createElement('img');
  lightboxImg.className = 'lightbox__img';
  
  const lightboxClose = document.createElement('button');
  lightboxClose.className = 'lightbox__close';
  lightboxClose.innerHTML = '✕';
  lightboxClose.setAttribute('aria-label', 'Close image');
  
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(lightboxClose);
  document.body.appendChild(lightbox);
  
  let isZoomed = false;

  function updateTransformOrigin(e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    lightboxImg.style.transformOrigin = `${x}% ${y}%`;
  }

  // Handle zooming and panning
  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
    isZoomed = !isZoomed;
    if (isZoomed) {
      lightboxImg.classList.add('zoomed');
      updateTransformOrigin(e);
    } else {
      lightboxImg.classList.remove('zoomed');
      setTimeout(() => {
        if (!isZoomed) lightboxImg.style.transformOrigin = 'center center';
      }, 300);
    }
  });

  lightbox.addEventListener('mousemove', (e) => {
    if (isZoomed) {
      updateTransformOrigin(e);
    }
  });

  // Open lightbox on grid image click
  newsImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    });
  });
  
  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    isZoomed = false;
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transformOrigin = 'center center';
  };
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// ── IPL Points Table Logic ────────────────────────────────────────────────
const pointsTableTabs = document.getElementById('pointsTableTabs');
const pointsTableContainer = document.getElementById('pointsTableContainer');

if (pointsTableTabs && pointsTableContainer) {
  const currentYear = new Date().getFullYear();
  // Generate years from 2008 to current year
  const years = Array.from({ length: currentYear - 2007 }, (_, i) => currentYear - i);
  
  let activeYear = currentYear;
  const standingsCache = {};

  // Initialize tabs
  function initTabs() {
    years.forEach(year => {
      const btn = document.createElement('button');
      btn.className = `points-table__tab ${year === activeYear ? 'active' : ''}`;
      btn.dataset.year = year;
      
      let tabText = `${year}`;
      if (year === currentYear) {
        tabText += ` <span class="live-badge-tab">LIVE</span>`;
      }
      
      btn.innerHTML = tabText;
      
      btn.addEventListener('click', () => {
        document.querySelectorAll('.points-table__tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        activeYear = year;
        loadStandings(year);
      });
      
      pointsTableTabs.appendChild(btn);
    });
  }

  // Generate Skeleton HTML
  function getSkeletonHTML() {
    return `
      <div class="skeleton-container">
        ${Array.from({ length: 10 }).map(() => '<div class="skeleton skeleton-row"></div>').join('')}
      </div>
    `;
  }

  const teamLogos = {
    "Rajasthan Royals": { short: "RR", logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Rajasthan_Royals_Logo.svg" },
    "Kings XI Punjab": { short: "KXIP", logo: "https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg" },
    "Punjab Kings": { short: "PBKS", logo: "https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg" },
    "Chennai Super Kings": { short: "CSK", logo: "https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg" },
    "Delhi Daredevils": { short: "DD", logo: "https://upload.wikimedia.org/wikipedia/en/f/f5/Delhi_Capitals_Logo.svg" },
    "Delhi Capitals": { short: "DC", logo: "https://upload.wikimedia.org/wikipedia/en/f/f5/Delhi_Capitals_Logo.svg" },
    "Kolkata Knight Riders": { short: "KKR", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg" },
    "Mumbai Indians": { short: "MI", logo: "https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg" },
    "Royal Challengers Bangalore": { short: "RCB", logo: "https://upload.wikimedia.org/wikipedia/en/1/15/Royal_Challengers_Bangalore_Logo.svg" },
    "Royal Challengers Bengaluru": { short: "RCB", logo: "https://upload.wikimedia.org/wikipedia/en/1/15/Royal_Challengers_Bangalore_Logo.svg" },
    "Deccan Chargers": { short: "DC", logo: "https://upload.wikimedia.org/wikipedia/en/b/b8/Deccan_Chargers_logo.svg" },
    "Pune Warriors India": { short: "PWI", logo: "images/logo.jpg" },
    "Kochi Tuskers Kerala": { short: "KTK", logo: "images/logo.jpg" },
    "Sunrisers Hyderabad": { short: "SRH", logo: "https://upload.wikimedia.org/wikipedia/en/8/81/Sunrisers_Hyderabad.svg" },
    "Rising Pune Supergiant": { short: "RPS", logo: "images/logo.jpg" },
    "Gujarat Lions": { short: "GL", logo: "images/logo.jpg" },
    "Gujarat Titans": { short: "GT", logo: "https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg" },
    "Lucknow Super Giants": { short: "LSG", logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/Lucknow_Super_Giants_IPL_Logo.svg" }
  };

  function getYearKey(year) {
    if (year === 2008) return "2007/08";
    if (year === 2010) return "2009/10";
    if (year === 2020) return "2020/21";
    return String(year);
  }

  // Generate Table HTML
  function getTableHTML(data) {
    if (!data || !data.length) {
      return `<div class="points-table-error">No data available for this season.</div>`;
    }
    
    // Sort by position just in case
    data.sort((a, b) => a.position - b.position);

    const rows = data.map((team, index) => {
      const isTopFour = index < 4 ? 'class="top-four"' : '';
      const meta = teamLogos[team.team] || { short: team.team.substring(0, 3).toUpperCase(), logo: 'images/logo.jpg' };
      
      return `
        <tr ${isTopFour}>
          <td class="team-col">
            <img src="${meta.logo}" alt="${meta.short}" class="team-logo" loading="lazy"/>
            <span>${window.innerWidth < 600 ? meta.short : team.team}</span>
          </td>
          <td>${team.played}</td>
          <td>${team.wins}</td>
          <td>${team.losses}</td>
          <td>${team.ties}</td>
          <td><strong>${team.points}</strong></td>
        </tr>
      `;
    }).join('');

    return `
      <table class="points-table-grid">
        <thead>
          <tr>
            <th style="text-align: left;">Team</th>
            <th>M</th>
            <th>W</th>
            <th>L</th>
            <th>T</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  let fullPointsData = null;

  // Fetch or Load from cache
  async function loadStandings(year) {
    pointsTableContainer.innerHTML = getSkeletonHTML();

    try {
      if (!fullPointsData) {
        const response = await fetch(`ipl_yearwise_points_table.json`);
        if (!response.ok) throw new Error('Failed to load JSON');
        fullPointsData = await response.json();
      }

      const yearKey = getYearKey(year);
      const data = fullPointsData[yearKey];
      
      pointsTableContainer.innerHTML = getTableHTML(data || []);
    } catch (error) {
      console.error('Failed to fetch standings:', error);
      pointsTableContainer.innerHTML = `<div class="points-table-error">Unable to load data. Please try again later.</div>`;
    }
  }

  // Initialize
  initTabs();
  loadStandings(activeYear);
  
  // Handle resize for short team names on mobile
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if(standingsCache[activeYear]) {
         pointsTableContainer.innerHTML = getTableHTML(standingsCache[activeYear]);
      }
    }, 250);
  });
}
