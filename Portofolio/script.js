/**
 * PORTOFOLIO KHOLILATUL ASTI — SMK TELKOM LAMPUNG
 * Logika Interaktif: Typewriter, Scroll Progress, Active Nav, WhatsApp Form, & Clipboard Copy
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. TOP SCROLL PROGRESS BAR ---
  const scrollProgress = document.getElementById('scrollProgress');
  const siteHeader = document.getElementById('siteHeader');

  window.addEventListener('scroll', () => {
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalScrollHeight > 0 ? window.scrollY / totalScrollHeight : 0;
    
    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${progress})`;
    }

    if (window.scrollY > 40) {
      if (siteHeader) siteHeader.classList.add('scrolled');
    } else {
      if (siteHeader) siteHeader.classList.remove('scrolled');
    }

    updateActiveNavigation();
  });

  // --- 2. ACTIVE NAVIGATION ITEM TRACKING ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link, .mobile-nav-link');

  function updateActiveNavigation() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // --- 3. MOBILE MENU TOGGLE ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavPanel = document.getElementById('mobileNavPanel');

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNavPanel.classList.toggle('open');
    });

    mobileNavPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavPanel.classList.remove('open');
      });
    });
  }

  // --- 4. TYPEWRITER EFFECT PADA HERO SECTION ---
  const typewriterTarget = document.getElementById('typewriterText');
  const roles = [
    'Junior Web Developer',
    'Siswa RPL SMK Telkom Lampung',
    'Front-End & UI Enthusiast',
    'Pengembang Web Responsif'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseDuration = 1800;

  function runTypewriter() {
    if (!typewriterTarget) return;
    const currentText = roles[roleIdx];

    if (!isDeleting) {
      typewriterTarget.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentText.length) {
        isDeleting = true;
        setTimeout(runTypewriter, pauseDuration);
        return;
      }
    } else {
      typewriterTarget.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }

    setTimeout(runTypewriter, isDeleting ? deleteSpeed : typeSpeed);
  }
  runTypewriter();

  // --- 5. FORM PESAN LANGSUNG KE WHATSAPP ---
  const whatsappForm = document.getElementById('whatsappForm');
  const targetWhatsappNumber = '6285783665905'; // Nomor WhatsApp Asti

  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !subject || !message) {
        showToastNotice('Harap lengkapi semua bidang formulir!');
        return;
      }

      // Format teks pesan WhatsApp
      const waText = 
        `Halo Asti, perkenalkan saya *${name}*.\n\n` +
        `*Subjek/Keperluan:* ${subject}\n\n` +
        `*Isi Pesan:*\n"${message}"\n\n` +
        `_Pesan dikirim melalui formulir portofolio pribadi Kholilatul Asti._`;

      const encodedUrl = `https://wa.me/${targetWhatsappNumber}?text=${encodeURIComponent(waText)}`;

      // Notifikasi & Buka WhatsApp di tab baru
      showToastNotice('Mengarahkan ke WhatsApp...');
      setTimeout(() => {
        window.open(encodedUrl, '_blank');
        whatsappForm.reset();
      }, 500);
    });
  }

  // --- 6. SALIN EMAIL 1-KLIK KE CLIPBOARD ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotice = document.getElementById('toastNotice');

  function showToastNotice(msg) {
    if (!toastNotice) return;
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'kholilatulasti@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => {
            showToastNotice('✓ Email kholilatulasti@gmail.com berhasil disalin!');
          })
          .catch(() => {
            showToastNotice(`Email: ${email}`);
          });
      } else {
        showToastNotice(`Email: ${email}`);
      }
    });
  }

  // --- 7. FALLBACK HANDLER FOTO PROFIL ---
  const profileAvatarImg = document.getElementById('profileAvatarImg');
  if (profileAvatarImg) {
    profileAvatarImg.addEventListener('error', function() {
      this.src = 'https://ui-avatars.com/api/?name=Kholilatul+Asti&background=0284c7&color=fff&size=512&font-size=0.33';
    });
  }
});
