/**
 * ALFARI.DEV - JAVASCRIPT LOGIC
 * Recreated with Pure Vanilla JavaScript (Code Gốc)
 * Features: Starfield, Audio Synthesizer, Lanyard Physics, Typewriter,
 *           Tabs, Modals, Guestbook, and Scroll-Spy.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. STARFIELD & PARTICLE SYSTEM
     ========================================================================== */
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  const stars = [];
  const numStars = Math.min(130, Math.floor((width * height) / 9000));

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.6 + 0.4;
      this.baseAlpha = Math.random() * 0.7 + 0.3;
      this.alpha = this.baseAlpha;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
      this.speedY = Math.random() * 0.15 + 0.03;
    }
    update() {
      this.alpha += this.twinkleSpeed * this.twinkleDir;
      if (this.alpha > 1) {
        this.alpha = 1;
        this.twinkleDir = -1;
      } else if (this.alpha < 0.2) {
        this.alpha = 0.2;
        this.twinkleDir = 1;
      }

      this.y -= this.speedY;
      if (this.y < 0) {
        this.y = height;
        this.x = Math.random() * width;
      }
    }
    draw() {
      ctx.fillStyle = `rgba(180, 210, 255, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Shooting star
  let shootingStar = null;
  function spawnShootingStar() {
    shootingStar = {
      x: Math.random() * (width * 0.7),
      y: Math.random() * (height * 0.3),
      length: Math.random() * 80 + 50,
      speed: Math.random() * 8 + 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      opacity: 1,
      alive: true
    };
  }

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }
  }
  initStars();

  setInterval(() => {
    if (!shootingStar && Math.random() > 0.35) {
      spawnShootingStar();
    }
  }, 4000);

  function animateStars() {
    ctx.clearRect(0, 0, width, height);

    // Draw ambient cosmic gradient
    const grad = ctx.createRadialGradient(width * 0.5, height * 0.2, 50, width * 0.5, height * 0.2, width * 0.8);
    grad.addColorStop(0, 'rgba(30, 58, 138, 0.15)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Update & draw background stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }

    // Update & draw shooting star
    if (shootingStar) {
      const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
      const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

      const shootGrad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
      shootGrad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
      shootGrad.addColorStop(0.3, `rgba(56, 189, 248, ${shootingStar.opacity * 0.8})`);
      shootGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.strokeStyle = shootGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shootingStar.x, shootingStar.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
      shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
      shootingStar.opacity -= 0.015;

      if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
        shootingStar = null;
      }
    }

    requestAnimationFrame(animateStars);
  }
  animateStars();


  /* ==========================================================================
     2. FLOATING NAVBAR SCROLLSPY & ACTIVE INDICATOR
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const navIndicator = document.getElementById('navIndicator');
  const sections = document.querySelectorAll('section.section');

  function updateIndicator(targetLink) {
    if (!targetLink || !navIndicator) return;
    const linkRect = targetLink.getBoundingClientRect();
    const navRect = targetLink.parentElement.getBoundingClientRect();

    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
  }

  // Set initial indicator position
  const initialActive = document.querySelector('.nav-link.active') || navLinks[0];
  setTimeout(() => updateIndicator(initialActive), 150);
  window.addEventListener('resize', () => {
    const current = document.querySelector('.nav-link.active');
    if (current) updateIndicator(current);
  });

  // ScrollSpy listener
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const linkTarget = link.getAttribute('data-target');
        if (linkTarget === currentSectionId) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
          updateIndicator(link);
        }
      });
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ==========================================================================
     3. AMBIENT AUDIO SYNTHESIZER (Web Audio API)
     ========================================================================== */
  const soundToggle = document.getElementById('soundToggle');
  const soundWaves = document.getElementById('soundWaves');
  const iconSoundOff = document.getElementById('iconSoundOff');
  const iconSoundOn = document.getElementById('iconSoundOn');

  let audioCtx = null;
  let isPlaying = false;
  let synthNodes = [];

  // Ambient chord frequencies (Chill Lofi Minor Chords: Fmaj7 -> Em7 -> Dm7 -> Cmaj7)
  const chords = [
    [174.61, 220.00, 261.63, 329.63], // F, A, C, E
    [164.81, 196.00, 246.94, 293.66], // E, G, B, D
    [146.83, 174.61, 220.00, 261.63], // D, F, A, C
    [130.81, 164.81, 196.00, 246.94]  // C, E, G, B
  ];
  let chordIndex = 0;
  let chordInterval = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playAmbientChord(freqs) {
    if (!audioCtx || !isPlaying) return;

    // Fade out previous notes
    synthNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.setValueAtTime(gain.gain.value, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        setTimeout(() => osc.stop(), 1300);
      } catch (err) {}
    });
    synthNodes = [];

    // Master filter for lush warmth
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    // Create soft sine/triangle oscillators for each voice
    freqs.forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      noteGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 1.5);

      osc.connect(noteGain);
      noteGain.connect(filter);
      osc.start();

      synthNodes.push({ osc, gain: noteGain });
    });
  }

  function toggleAudio() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = !isPlaying;

    if (isPlaying) {
      soundWaves.classList.add('active');
      iconSoundOff.classList.add('hidden');
      iconSoundOn.classList.remove('hidden');
      soundToggle.setAttribute('title', 'Matikan Suara');
      showToast('🎵 Musik ambient diaktifkan');

      // Start loop
      playAmbientChord(chords[chordIndex]);
      chordInterval = setInterval(() => {
        chordIndex = (chordIndex + 1) % chords.length;
        playAmbientChord(chords[chordIndex]);
      }, 4800);
    } else {
      soundWaves.classList.remove('active');
      iconSoundOff.classList.remove('hidden');
      iconSoundOn.classList.add('hidden');
      soundToggle.setAttribute('title', 'Bunyikan Suara');
      clearInterval(chordInterval);

      synthNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
          setTimeout(() => osc.stop(), 600);
        } catch (e) {}
      });
      synthNodes = [];
      showToast('🔇 Musik dimatikan');
    }
  }

  soundToggle.addEventListener('click', toggleAudio);


  /* ==========================================================================
     4. HERO TYPEWRITER EFFECT
     ========================================================================== */
  const typewriterElem = document.getElementById('typewriter');
  const roles = [
    'Junior Developer',
    'Web Development',
    'React & Three.js Enthusiast'
  ];

  let currentRoleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 50;
  const pauseTime = 1800;

  function typeEffect() {
    const currentText = roles[currentRoleIdx];

    if (!isDeleting) {
      typewriterElem.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseTime);
        return;
      }
      setTimeout(typeEffect, typeSpeed);
    } else {
      typewriterElem.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        currentRoleIdx = (currentRoleIdx + 1) % roles.length;
        setTimeout(typeEffect, 400);
        return;
      }
      setTimeout(typeEffect, deleteSpeed);
    }
  }
  setTimeout(typeEffect, 600);


  /* ==========================================================================
     5. INTERACTIVE 3D LANYARD WITH PHYSICS SIMULATION
     ========================================================================== */
  const lanyardCard = document.getElementById('lanyardCard');
  const lanyardCanvas = document.getElementById('lanyardCanvas');
  const lctx = lanyardCanvas.getContext('2d');

  function resizeLanyardCanvas() {
    const rect = lanyardCanvas.parentElement.getBoundingClientRect();
    lanyardCanvas.width = rect.width;
    lanyardCanvas.height = rect.height;
  }
  resizeLanyardCanvas();
  window.addEventListener('resize', resizeLanyardCanvas);

  // Card physics state
  let cardX = 0;
  let cardY = 0;
  let targetX = 0;
  let targetY = 0;
  let vx = 0;
  let vy = 0;
  let rotationZ = 0;
  let isDragging = false;
  let startDragX = 0;
  let startDragY = 0;
  let swayTime = 0;

  // Mouse drag events
  lanyardCard.addEventListener('mousedown', (e) => {
    isDragging = true;
    startDragX = e.clientX - targetX;
    startDragY = e.clientY - targetY;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      targetX = e.clientX - startDragX;
      targetY = e.clientY - startDragY;

      // Limit bounds
      targetX = Math.max(-140, Math.min(140, targetX));
      targetY = Math.max(-40, Math.min(160, targetY));
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      targetX = 0;
      targetY = 0;
    }
  });

  // Touch support
  lanyardCard.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    startDragX = touch.clientX - targetX;
    startDragY = touch.clientY - targetY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      targetX = touch.clientX - startDragX;
      targetY = touch.clientY - startDragY;
      targetX = Math.max(-120, Math.min(120, targetX));
      targetY = Math.max(-40, Math.min(140, targetY));
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
    targetX = 0;
    targetY = 0;
  });

  function updateLanyardPhysics() {
    swayTime += 0.025;
    
    // Natural subtle swaying when not dragged
    const naturalSwayX = isDragging ? 0 : Math.sin(swayTime) * 12;
    const naturalSwayY = isDragging ? 0 : Math.cos(swayTime * 1.5) * 4;

    // Spring physics
    const springK = 0.08;
    const damping = 0.82;

    const ax = ((targetX + naturalSwayX) - cardX) * springK;
    const ay = ((targetY + naturalSwayY) - cardY) * springK;

    vx = (vx + ax) * damping;
    vy = (vy + ay) * damping;

    cardX += vx;
    cardY += vy;

    rotationZ = (cardX * 0.14) + (vx * 1.8);

    // Apply transform to the card
    lanyardCard.style.transform = `translate3d(${cardX}px, ${cardY}px, 0) rotateZ(${rotationZ}deg)`;

    // Draw the lanyard ribbon / cord
    const cWidth = lanyardCanvas.width;
    const cHeight = lanyardCanvas.height;
    lctx.clearRect(0, 0, cWidth, cHeight);

    const anchorX = cWidth / 2;
    const anchorY = 0;

    const cardTopX = (cWidth / 2) + cardX;
    const cardTopY = (cHeight / 2) + cardY - 140;

    // Dual cord ribbon
    lctx.beginPath();
    lctx.moveTo(anchorX - 10, anchorY);
    lctx.quadraticCurveTo(
      anchorX + (cardX * 0.4) - 20,
      cardTopY * 0.5,
      cardTopX - 6,
      cardTopY
    );
    lctx.strokeStyle = '#2563eb';
    lctx.lineWidth = 4;
    lctx.lineCap = 'round';
    lctx.stroke();

    lctx.beginPath();
    lctx.moveTo(anchorX + 10, anchorY);
    lctx.quadraticCurveTo(
      anchorX + (cardX * 0.4) + 20,
      cardTopY * 0.5,
      cardTopX + 6,
      cardTopY
    );
    lctx.strokeStyle = '#38bdf8';
    lctx.lineWidth = 3;
    lctx.lineCap = 'round';
    lctx.stroke();

    requestAnimationFrame(updateLanyardPhysics);
  }
  updateLanyardPhysics();


  /* ==========================================================================
     6. STATS COUNTER ANIMATION (Intersection Observer)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsTriggered = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsTriggered) {
        statsTriggered = true;
        statNumbers.forEach((numElem) => {
          const target = parseInt(numElem.getAttribute('data-target'), 10);
          let current = 0;
          const duration = 1200;
          const stepTime = Math.floor(duration / (target || 1));

          const counter = setInterval(() => {
            current++;
            numElem.textContent = current;
            if (current >= target) {
              clearInterval(counter);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsContainer = document.querySelector('.stats-grid');
  if (statsContainer) statsObserver.observe(statsContainer);


  /* ==========================================================================
     7. PORTFOLIO TABS SWITCHER
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const tabId = `tab-${btn.getAttribute('data-tab')}`;
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });


  /* ==========================================================================
     8. PROJECT DETAIL MODAL
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalProjectContent = document.getElementById('modalProjectContent');

  const projectDetails = {
    cyber: {
      title: 'CYBER GYZN',
      category: 'Phishing Analytics Dashboard',
      description: 'CYBER GYZN adalah platform pemantauan dan analisis ancaman siber yang dirancang khusus untuk memantau data phising secara real-time. Dilengkapi dengan deteksi anomali, sistem pelaporan terstruktur, serta integrasi visualisasi grafik responsif.',
      features: [
        'Real-time phishing payload analytics & log tracking',
        'Interactive charts & geographic distribution maps',
        'Multi-tenant authentication via Firebase Auth',
        'Instant alert webhook notifications'
      ],
      techs: ['React', 'Tailwind CSS', 'Firebase Firestore', 'Lucide React', 'Vite'],
      github: 'https://github.com/gyzeennnpro-sudo',
      preview: 'https://cyber-gyzn.app'
    },
    bot: {
      title: 'Bot Generate Artikel',
      category: 'AI Automated Content Engine',
      description: 'Aplikasi dashboard otomatisasi artikel berbasis AI untuk menghasilkan artikel bermutu tinggi yang ramah SEO secara instan. Dilengkapi dengan pengelolaan outline otomatis, keyword suggestion, dan integrasi auto-publish CMS.',
      features: [
        'AI prompt orchestration using OpenAI GPT API',
        'Automated SEO meta tag and keyword density calculation',
        'Draft versioning and instant markdown export',
        'Custom article tone of voice and language customization'
      ],
      techs: ['Python', 'OpenAI API', 'React', 'Tailwind CSS', 'FastAPI'],
      github: 'https://github.com/gyzeennnpro-sudo',
      preview: '#'
    },
    siswa: {
      title: 'Database Siswa SMK Texmaco',
      category: 'School Management Dashboard',
      description: 'Platform manajemen data siswa terpusat untuk memonitor profil siswa, data presensi harian, riwayat pembayaran, serta buku raport digital dengan arsitektur sistem informasi sekolah yang handal.',
      features: [
        'CRUD data siswa, kelas, jurusan, dan wali kelas',
        'Export data laporan otomatis ke format Excel/PDF',
        'Role-based access: Admin, Guru, dan Wali Murid',
        'Pencarian instan dengan filtering dinamis'
      ],
      techs: ['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript', 'XAMPP'],
      github: 'https://github.com/gyzeennnpro-sudo',
      preview: '#'
    }
  };

  document.querySelectorAll('.btn-details').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-project');
      const data = projectDetails[pKey];
      if (!data) return;

      modalProjectContent.innerHTML = `
        <div class="modal-project-header">
          <span class="section-tag" style="margin-bottom:0.5rem">${data.category}</span>
          <h3>${data.title}</h3>
          <div class="modal-project-tags">
            ${data.techs.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
        <div class="modal-project-body">
          <p>${data.description}</p>
          <h4 style="color:#ffffff; margin-bottom:0.6rem; font-size:1.05rem">Fitur Utama:</h4>
          <ul style="color:#94a3b8; margin-bottom:1.5rem; padding-left:1.25rem; font-size:0.9rem; line-height:1.8">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        <div class="modal-actions">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <span>Lihat di GitHub</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <button class="btn btn-outline" id="btnModalCloseSecondary">Tutup</button>
        </div>
      `;

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');

      document.getElementById('btnModalCloseSecondary')?.addEventListener('click', closeProjectModal);
    });
  });

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  modalClose.addEventListener('click', closeProjectModal);
  modalBackdrop.addEventListener('click', closeProjectModal);


  /* ==========================================================================
     9. CERTIFICATE LIGHTBOX MODAL
     ========================================================================== */
  const certModal = document.getElementById('certModal');
  const certModalClose = document.getElementById('certModalClose');
  const certModalBackdrop = document.getElementById('certModalBackdrop');
  const certModalBody = document.getElementById('certModalBody');

  const certData = {
    pkl: {
      title: 'Sertifikat PKL Universitas STEKOM',
      issuer: 'Universitas STEKOM',
      no: '0018/061058/ST/R-JTS/E/2026',
      recipient: 'Muhammad Al-Fari Yusuf',
      period: '05 Januari 2026 – 23 Mei 2026'
    },
    'udemy-css': {
      title: 'CSS and JavaScript Crash Course',
      issuer: 'PROPER DOT INSTITUTE (Udemy)',
      no: 'Certificate of Completion',
      recipient: 'Muhammad Al-Fari Yusuf',
      period: 'Validated Developer Credential'
    },
    'udemy-web': {
      title: 'Web Development Certification',
      issuer: 'Udemy Online Learning',
      no: 'UC-f106f323-2cad-4f16-a2d3-e0e843fb2016',
      recipient: 'Muhammad Al-Fari Yusuf',
      period: 'Full Stack Web Architecture'
    }
  };

  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', () => {
      const cKey = card.getAttribute('data-cert');
      const c = certData[cKey];
      if (!c) return;

      certModalBody.innerHTML = `
        <div style="background: linear-gradient(135deg, #111827, #1f2937); padding: 3rem 2rem; border-radius: 16px; border: 2px solid rgba(59, 130, 246, 0.4); margin-bottom: 1.5rem; box-shadow: 0 0 30px rgba(59,130,246,0.2);">
          <div style="font-size: 3rem; margin-bottom: 1rem">🏆</div>
          <h2 style="font-family:'Space Grotesk',sans-serif; color:#ffffff; font-size:1.8rem; margin-bottom:0.5rem">${c.title}</h2>
          <p style="color:#38bdf8; font-family:'JetBrains Mono',monospace; font-size:0.95rem; margin-bottom:1.5rem">${c.no}</p>
          <div style="background:rgba(255,255,255,0.05); padding:1.25rem; border-radius:12px; max-width:400px; margin:0 auto 1.5rem auto;">
            <p style="color:#94a3b8; font-size:0.85rem">Diberikan Kepada:</p>
            <h3 style="color:#ffffff; font-size:1.35rem; font-weight:700">${c.recipient}</h3>
            <p style="color:#60a5fa; font-size:0.85rem; margin-top:0.35rem">${c.period}</p>
          </div>
          <p style="color:#94a3b8; font-size:0.9rem">Penerbit Resmi: <strong>${c.issuer}</strong></p>
        </div>
        <button class="btn btn-outline" id="btnCertCloseInner">Tutup Sertifikat</button>
      `;

      certModal.classList.add('active');
      certModal.setAttribute('aria-hidden', 'false');

      document.getElementById('btnCertCloseInner')?.addEventListener('click', closeCertModal);
    });
  });

  function closeCertModal() {
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
  }

  certModalClose.addEventListener('click', closeCertModal);
  certModalBackdrop.addEventListener('click', closeCertModal);

  // Global ESC key to close any active modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCertModal();
    }
  });


  /* ==========================================================================
     10. INTERACTIVE GUESTBOOK & COMMENTS (Local Storage)
     ========================================================================== */
  const commentForm = document.getElementById('commentForm');
  const commentAuthor = document.getElementById('commentAuthor');
  const commentAvatar = document.getElementById('commentAvatar');
  const avatarPreview = document.getElementById('avatarPreview');
  const commentBody = document.getElementById('commentBody');
  const commentsFeed = document.getElementById('commentsFeed');
  const commentsCount = document.getElementById('commentsCount');
  const btnLoadMore = document.getElementById('btnLoadMoreComments');

  // Update avatar preview
  commentAvatar.addEventListener('change', () => {
    avatarPreview.textContent = commentAvatar.value;
  });

  // Seed default authentic comments from Muhammad Al-Fari's website
  const defaultComments = [
    { name: 'Mann29', avatar: '🧑‍💻', time: '26 menit lalu', text: 'Tutor bgg' },
    { name: 'asuy', avatar: '🔥', time: '1 jam lalu', text: 'gacor kali kau banh' },
    { name: 'Ali', avatar: '🚀', time: '10 jam lalu', text: 'Gokilll broo' },
    { name: 'Owie lico', avatar: '🌟', time: '1 hari lalu', text: 'nice website bro' },
    { name: 'Cha eun woo', avatar: '⚡', time: '1 hari lalu', text: 'Tutor kak, web nya di publis di github ga kak?' },
    { name: 'Jokowi', avatar: '👑', time: '2 hari lalu', text: 'Kau berbakat' },
    { name: 'Rian S', avatar: '🎯', time: '3 hari lalu', text: 'Keren banget animasi lanyard-nya bang!' }
  ];

  // Retrieve user comments from LocalStorage
  let storedComments = [];
  try {
    const raw = localStorage.getItem('alfari_comments');
    if (raw) storedComments = JSON.parse(raw);
  } catch (e) {}

  let allComments = [...storedComments, ...defaultComments];
  let visibleCount = 5;

  function renderComments() {
    commentsFeed.innerHTML = '';
    const slice = allComments.slice(0, visibleCount);

    slice.forEach((item) => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment-item';
      commentDiv.innerHTML = `
        <div class="comment-avatar">${item.avatar || '🧑‍💻'}</div>
        <div class="comment-content">
          <div class="comment-author-row">
            <span class="comment-author">${item.name}</span>
            <span class="comment-time">${item.time}</span>
          </div>
          <p class="comment-text">${escapeHtml(item.text)}</p>
        </div>
      `;
      commentsFeed.appendChild(commentDiv);
    });

    commentsCount.textContent = 223 + storedComments.length;

    if (visibleCount >= allComments.length) {
      btnLoadMore.style.display = 'none';
    } else {
      btnLoadMore.style.display = 'inline-flex';
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  renderComments();

  btnLoadMore.addEventListener('click', () => {
    visibleCount += 4;
    renderComments();
  });

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = commentAuthor.value.trim();
    const text = commentBody.value.trim();
    const avatar = commentAvatar.value;

    if (!name || !text) return;

    const newComment = {
      name,
      avatar,
      time: 'Baru saja',
      text
    };

    storedComments.unshift(newComment);
    try {
      localStorage.setItem('alfari_comments', JSON.stringify(storedComments));
    } catch (err) {}

    allComments = [...storedComments, ...defaultComments];
    renderComments();

    commentAuthor.value = '';
    commentBody.value = '';
    showToast('💬 Komentar berhasil dikirim!');
  });


  /* ==========================================================================
     11. CONTACT FORM
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    contactForm.reset();
    showToast(`✅ Terima kasih ${name}, pesan kamu telah terkirim!`);
  });


  /* ==========================================================================
     12. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }


  /* ==========================================================================
     13. SCROLL TO TOP
     ========================================================================== */
  const btnScrollTop = document.getElementById('btnScrollTop');
  if (btnScrollTop) {
    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
