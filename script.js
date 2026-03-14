// ===== LOCAL TIME (Québec) =====
function updateTime() {
  const now = new Date();
  const options = {
    timeZone: 'America/Toronto',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  const timeStr = now.toLocaleTimeString('en-CA', options).toUpperCase();
  const el = document.getElementById('localTime');
  if (el) el.textContent = `QC ${timeStr}`;
}
updateTime();
setInterval(updateTime, 1000);

// ===== LANGUAGE TOGGLE =====
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;

  // Update buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });

  // Update all translatable elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.innerHTML = text;
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = 'rgba(0,0,0,0.3)';
  } else {
    navbar.style.borderBottomColor = 'rgba(0,0,0,0.15)';
  }
});

// ===== CURSOR CROSSHAIR TRACKER =====
// Add a small dot that follows the cursor
const cursorDot = document.createElement('div');
cursorDot.style.cssText = `
  position: fixed;
  width: 6px;
  height: 6px;
  background: #000;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
  mix-blend-mode: difference;
`;
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', e => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.service-card, .equip-row, .app-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== HERO CAMERA TILT ON MOUSE MOVE =====
const cameraVisual = document.querySelector('.camera-visual');
if (cameraVisual) {
  document.addEventListener('mousemove', e => {
    const rect = cameraVisual.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    cameraVisual.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
    cameraVisual.style.transition = 'transform 0.3s ease';
  });
}
