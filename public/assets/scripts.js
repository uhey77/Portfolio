const TRANSITION_DURATION = 600;

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initRevealObserver();
  initStatCounters();
  initParticleBackground();
  initMaterializeComponents();
  initAOSAnimations();
  initSkillChart();
  initJQueryHelpers();
  initGitHubContent();
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

function initMaterializeComponents() {
  if (!window.M) return;
  window.M.AutoInit();
}

function initAOSAnimations() {
  if (!window.AOS) return;
  window.AOS.init({
    once: true,
    offset: 120,
    easing: 'ease-out-cubic',
    duration: 700,
  });
}

function initSkillChart() {
  const canvas = document.getElementById('skillChart');
  if (!canvas || !window.Chart || canvas.dataset.chartInitialized) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const useEnglish = document.documentElement.lang === 'en';
  const labels = useEnglish
    ? ['XAI', 'LLM orchestration', 'MLOps', 'Data storytelling', 'Backend', 'Frontend']
    : ['XAI', 'LLMオーケストレーション', 'MLOps', 'データストーリーテリング', 'バックエンド', 'フロントエンド'];

  const data = useEnglish
    ? [90, 85, 80, 75, 70, 65]
    : [90, 85, 80, 75, 70, 65];

  new window.Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: useEnglish ? 'Comfort level (%)' : '習熟度 (%)',
          data,
          borderWidth: 2,
          borderColor: 'rgba(108, 195, 255, 0.8)',
          backgroundColor: 'rgba(108, 195, 255, 0.2)',
          pointBackgroundColor: '#6cc3ff',
          pointBorderColor: '#ffffff',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          suggestedMin: 40,
          suggestedMax: 100,
          ticks: {
            display: false,
          },
          angleLines: {
            color: 'rgba(255,255,255,0.15)',
          },
          grid: {
            color: 'rgba(255,255,255,0.15)',
          },
          pointLabels: {
            color: '#d0e6ff',
            font: {
              size: 14,
              family: '"Roboto", "Noto Sans JP", sans-serif',
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: '#d0e6ff',
          },
        },
      },
    },
  });

  canvas.dataset.chartInitialized = 'true';
}

function initJQueryHelpers() {
  if (!window.jQuery) return;
  const $ = window.jQuery;
  const $header = $('.site-header');

  const handleScroll = () => {
    $header.toggleClass('is-scrolled', $(window).scrollTop() > 24);
  };

  $(window).on('scroll', handleScroll);
  handleScroll();

  $('.contact-trigger').on('click', function (event) {
    const targetHref = $(this).attr('href');
    if (!targetHref) return;
    event.preventDefault();
    if (window.M && window.M.toast) {
      window.M.toast({ html: window.document.documentElement.lang === 'en' ? 'Opening contact page…' : '連絡先ページを開きます…', displayLength: 1200 });
    }
    setTimeout(() => {
      window.location.href = targetHref;
    }, 280);
  });
}

function initTypingAnimation() {
  const title = document.querySelector('.hero h1');
  if (!title) return;

  const text = title.textContent;
  title.textContent = '';

  let i = 0;
  const type = () => {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100 + Math.random() * 50);
    }
  };

  setTimeout(type, 500);
}

function initTiltEffect() {
  const cards = document.querySelectorAll('.card, .stat-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

function initGitHubContent() {
  const container = document.getElementById('github-content');
  if (!container) return;

  const username = 'uhey77';
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=3`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('GitHub API request failed');
      }
      return response.json();
    })
    .then(repos => {
      container.innerHTML = ''; // Clear loading indicator

      if (repos.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--muted);">リポジトリが見つかりませんでした。</p>';
        return;
      }

      repos.forEach((repo, index) => {
        const card = document.createElement('article');
        card.className = 'card hoverable';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100 + 50).toString());

        const description = repo.description || '説明はありません。';
        const language = repo.language ? `<span class="chip" style="font-size: 12px; padding: 4px 8px; height: auto; line-height: 1.2;">${repo.language}</span>` : '';
        const stars = repo.stargazers_count > 0 ? `<span style="margin-left: 8px; font-size: 14px; color: var(--accent);">★ ${repo.stargazers_count}</span>` : '';

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${description}</p>
          <div style="margin-top: 12px; display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">
            ${language}
            ${stars}
          </div>
          <p class="meta" style="margin-top: 16px;"><a href="${repo.html_url}" target="_blank" rel="noreferrer">GitHubで見る</a></p>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching GitHub repos:', error);
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--muted);">
        <p>読み込みに失敗しました。</p>
        <p style="font-size: 12px; margin-top: 8px;">Error: ${error.message}</p>
      </div>`;
    });
}
