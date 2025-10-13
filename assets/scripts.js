const TRANSITION_DURATION = 600;

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initRevealObserver();
  initStatCounters();
  initParticleBackground();
});

function initPageTransitions() {
  const body = document.body;
  const activate = () => {
    body.classList.add('has-transition');
    body.classList.remove('is-exiting');
    requestAnimationFrame(() => {
      body.classList.add('is-ready');
    });
  };

  activate();

  window.addEventListener('pageshow', () => {
    body.classList.remove('is-exiting');
    requestAnimationFrame(() => {
      body.classList.add('is-ready');
    });
  });

  document.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (anchor.target && anchor.target !== '_self') return;
    if (anchor.hasAttribute('download')) return;
    if (/^(mailto:|tel:)/.test(href)) return;

    let destination;
    try {
      destination = new URL(anchor.href);
    } catch (error) {
      return;
    }

    if (destination.origin !== window.location.origin) return;

    anchor.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const navigate = () => {
        window.location.href = anchor.href;
      };
      body.classList.add('is-exiting');
      setTimeout(navigate, TRANSITION_DURATION - 100);
    });
  });
}

function initRevealObserver() {
  const targets = [
    ...document.querySelectorAll('.section'),
    ...document.querySelectorAll('.card'),
    ...document.querySelectorAll('.timeline-item'),
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

function initStatCounters() {
  const counters = document.querySelectorAll('[data-stat-value]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((node) => observer.observe(node));
}

function animateCounter(node) {
  const target = Number(node.getAttribute('data-stat-value') || '0');
  const suffix = node.getAttribute('data-stat-suffix') || '';
  const duration = Number(node.getAttribute('data-stat-duration') || 1400);
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeOutCubic(progress);
    const value = Math.floor(target * eased);
    node.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function initParticleBackground() {
  const canvas = document.createElement('canvas');
  canvas.className = 'particle-canvas';
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  const particles = [];
  const PARTICLE_COUNT = window.innerWidth < 600 ? 40 : 80;
  const colorOptions = ['#6cc3ff', '#9ef5c1', '#ffffff'];
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const createParticle = () => {
    const velocityScale = 0.15;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      vx: (Math.random() - 0.5) * velocityScale,
      vy: (Math.random() - 0.5) * velocityScale,
      opacity: Math.random() * 0.6 + 0.2,
    };
  };

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    particles.push(createParticle());
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -50 || particle.x > width + 50) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }
      if (particle.y < -50 || particle.y > height + 50) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }

      ctx.beginPath();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}
