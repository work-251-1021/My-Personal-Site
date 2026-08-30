document.addEventListener('DOMContentLoaded', () => {
  // ۱. اجرای کدهای سراسری (قابل استفاده در هر دو صفحه)
  initBackgroundWaves();
  initJellyCursor();
  
  // ۲. منطق‌های اختصاصی بر اساس صفحه جاری
  const page = document.body.dataset.page;
  if (page === 'home') {
    initHomePage();
  } else if (page === 'about') {
    initAboutPage();
  }
});

/* ==========================================================
   1. GLOBAL FEATURES (Waves Canvas & Jelly Cursor)
   ========================================================== */
function initBackgroundWaves() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const curves = [];
  const curveCount = 7;

  for (let i = 0; i < curveCount; i++) {
    curves.push({
      baseY: (h / (curveCount + 1)) * (i + 1) + (Math.random() - 0.5) * 80,
      amplitude: 35 + Math.random() * 45,    
      wavelength: 0.0015 + Math.random() * 0.001,
      speed: 0.006 + Math.random() * 0.008,
      phase: Math.random() * Math.PI * 3,
      opacity: 0.05 + Math.random() * 0.07,  
      lineWidth: 1.2 + Math.random() * 1.0
    });
  }

  function animateCurves() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < curves.length; i++) {
      const c = curves[i];
      c.phase += c.speed;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(59, 91, 255, ${c.opacity})`;
      ctx.lineWidth = c.lineWidth;
      ctx.lineCap = 'round';

      for (let x = 0; x <= w; x += 15) {
        const y = c.baseY + 
                  Math.sin(x * c.wavelength + c.phase) * c.amplitude +
                  Math.cos(x * c.wavelength * 0.5 + c.phase * 0.8) * (c.amplitude * 0.4);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    requestAnimationFrame(animateCurves);
  }
  animateCurves();
}

function initJellyCursor() {
  const jelly = document.getElementById('cursor-jelly');
  const dot = document.getElementById('cursor-dot');
  if (!jelly || !dot) return;

  let mouseX = -100;
  let mouseY = -100;
  let jellyX = -100;
  let jellyY = -100;
  let isMouseDown = false;
  let isVisible = false;

  // مخفی بودن اولیه تا اولین حرکت ماوس
  jelly.style.opacity = '0';
  dot.style.opacity = '0';
  jelly.style.transition = 'opacity 0.2s ease';
  dot.style.transition = 'opacity 0.2s ease';

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      jelly.style.opacity = '1';
      dot.style.opacity = '1';
      jellyX = mouseX;
      jellyY = mouseY;
    }

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    jelly.style.opacity = '0';
    dot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    jelly.style.opacity = '1';
    dot.style.opacity = '1';
  });

  window.addEventListener('mousedown', () => {
    isMouseDown = true;
  });

  window.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  function renderJelly() {
    jellyX += (mouseX - jellyX) * 0.15;
    jellyY += (mouseY - jellyY) * 0.15;

    const deltaX = mouseX - jellyX;
    const deltaY = mouseY - jellyY;
    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    let scaleX = 1;
    let scaleY = 1;

    if (isMouseDown) {
      scaleX = 0.75;
      scaleY = 0.75;
    } else {
      const stretch = Math.min(speed * 0.007, 0.35);
      scaleX = 1 + stretch;
      scaleY = 1 - stretch * 0.7;
    }

    jelly.style.transform = `translate(${jellyX}px, ${jellyY}px) translate(-50%, -50%) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;

    requestAnimationFrame(renderJelly);
  }
  renderJelly();
}

/* ==========================================================
   2. PAGE SPECIFIC INITIALIZERS (برای آینده)
   ========================================================== */
function initHomePage() {
  // در صورت نیاز به کدهای خاص صفحه اصلی، اینجا بنویسید.
  console.log("Home page specific JS active.");
}

function initAboutPage() {
  // در صورت نیاز به کدهای خاص صفحه درباره ما، اینجا بنویسید.
  console.log("About page specific JS active.");
}
