document.documentElement.classList.add('js');

const progressBar = document.querySelector('#reading-progress-bar');
let scrollFrameRequested = false;

function updateReadingProgress() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
  progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  scrollFrameRequested = false;
}

window.addEventListener('scroll', function () {
  if (!scrollFrameRequested) {
    scrollFrameRequested = true;
    window.requestAnimationFrame(updateReadingProgress);
  }
}, { passive: true });
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

function setMenuOpen(isOpen) {
  document.body.classList.toggle('nav-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Đóng điều hướng' : 'Mở điều hướng');
}

menuToggle.addEventListener('click', function () {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});
primaryNav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () { setMenuOpen(false); });
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') setMenuOpen(false);
});

const staggeredElements = document.querySelectorAll('.concept-grid .concept-card, .process-grid .process-card, .meaning-list .meaning-item, .quiz-form .quiz-question');
const staggeredParents = new Map();
staggeredElements.forEach(function (element) {
  const index = staggeredParents.get(element.parentElement) || 0;
  staggeredParents.set(element.parentElement, index + 1);
  element.style.setProperty('--reveal-delay', index * 110 + 'ms');
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealElements.forEach(function (element) { revealObserver.observe(element); });
} else {
  revealElements.forEach(function (element) { element.classList.add('is-visible'); });
}

const navLinks = Array.from(primaryNav.querySelectorAll('a[href^="#"]'));
const navSections = navLinks.map(function (link) {
  return document.querySelector(link.getAttribute('href'));
}).filter(Boolean);

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-100px 0px -80px 0px', threshold: 0 });
  navSections.forEach(function (section) { navObserver.observe(section); });
}

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

function followPointer(element, type) {
  let frame = 0;
  let pointX = 0.5;
  let pointY = 0.5;

  element.addEventListener('pointerenter', function () {
    if (type !== 'ambient') element.classList.add('is-tilting');
  });
  element.addEventListener('pointermove', function (event) {
    const bounds = element.getBoundingClientRect();
    pointX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    pointY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    if (frame) return;
    frame = window.requestAnimationFrame(function () {
      if (type === 'ambient') {
        element.style.setProperty('--ambient-x', pointX * 100 + '%');
        element.style.setProperty('--ambient-y', pointY * 100 + '%');
      } else {
        const strength = type === 'hero' ? 3.5 : 2.4;
        element.style.setProperty('--pointer-x', pointX * 100 + '%');
        element.style.setProperty('--pointer-y', pointY * 100 + '%');
        element.style.setProperty('--tilt-x', (0.5 - pointY) * strength + 'deg');
        element.style.setProperty('--tilt-y', (pointX - 0.5) * strength + 'deg');
      }
      frame = 0;
    });
  });
  element.addEventListener('pointerleave', function () {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    if (type === 'ambient') {
      element.style.setProperty('--ambient-x', '78%');
      element.style.setProperty('--ambient-y', '12%');
      return;
    }
    element.classList.remove('is-tilting');
    element.style.setProperty('--pointer-x', '50%');
    element.style.setProperty('--pointer-y', '50%');
    element.style.setProperty('--tilt-x', '0deg');
    element.style.setProperty('--tilt-y', '0deg');
  });
}

if (finePointer.matches && !motionPreference.matches) {
  const hero = document.querySelector('.hero');
  if (hero) followPointer(hero, 'ambient');
  document.querySelectorAll('.hero-art, .concept-card, .process-card').forEach(function (element) {
    followPointer(element, element.classList.contains('hero-art') ? 'hero' : 'card');
  });
}

const temperatureSlider = document.querySelector('#temperature-slider');
const waterLab = document.querySelector('#water-lab');

if (temperatureSlider && waterLab) {
  const temperatureValue = document.querySelector('#temperature-value');
  const phaseTitle = document.querySelector('#phase-title');
  const phaseDetail = document.querySelector('#phase-detail');
  const sceneState = document.querySelector('#scene-state');
  const waterVisual = document.querySelector('.water-visual');
  const beakerFill = document.querySelector('.beaker-fill');
  let previousPhase = null;
  let phaseAnimationTimer = 0;

  function updateWaterPhase() {
    const temperature = Number(temperatureSlider.value);
    const label = temperature < 0 ? '−' + Math.abs(temperature) : String(temperature);
    let phase;
    let title;
    let detail;
    let scene;

    if (temperature === 0) {
      phase = 'threshold';
      title = 'ĐIỂM NÚT · 0°C';
      detail = 'Ngưỡng đóng băng: băng và nước lỏng có thể cùng tồn tại.';
      scene = 'ĐANG CHUYỂN PHA';
    } else if (temperature === 100) {
      phase = 'threshold';
      title = 'ĐIỂM NÚT · 100°C';
      detail = 'Ngưỡng sôi: nước lỏng và hơi nước có thể cùng tồn tại.';
      scene = 'ĐANG CHUYỂN PHA';
    } else if (temperature < 0) {
      phase = 'ice';
      title = 'THỂ RẮN · BĂNG';
      detail = 'Dưới 0°C, nước tồn tại ở thể rắn trong mô phỏng này.';
      scene = 'THỂ RẮN';
    } else if (temperature < 100) {
      phase = 'liquid';
      title = 'THỂ LỎNG · NƯỚC';
      detail = 'Trong khoảng này, nước giữ thể lỏng.';
      scene = 'THỂ LỎNG';
    } else {
      phase = 'steam';
      title = 'THỂ KHÍ · HƠI NƯỚC';
      detail = 'Trên 100°C, nước ở thể khí trong mô phỏng này.';
      scene = 'THỂ KHÍ';
    }

    temperatureValue.textContent = label;
    phaseTitle.textContent = title;
    phaseDetail.textContent = detail;
    sceneState.textContent = scene;
    if (previousPhase !== null && phase !== previousPhase) {
      window.clearTimeout(phaseAnimationTimer);
      waterVisual.classList.remove('phase-shift');
      void waterVisual.offsetWidth;
      waterVisual.classList.add('phase-shift');
      phaseAnimationTimer = window.setTimeout(function () {
        waterVisual.classList.remove('phase-shift');
      }, 700);
    }
    previousPhase = phase;
    waterLab.dataset.phase = phase;
    waterVisual.dataset.phase = phase;
    beakerFill.style.setProperty('--fill-level', (28 + ((temperature + 20) / 140) * 44) + '%');
    temperatureSlider.setAttribute('aria-valuetext', label + ' độ C, ' + title.toLowerCase());
  }

  temperatureSlider.addEventListener('input', updateWaterPhase);
  updateWaterPhase();
}
const quizForm = document.querySelector('#quiz-form');
if (quizForm) {
  const quizQuestions = Array.from(quizForm.querySelectorAll('.quiz-question'));
  const quizFeedback = document.querySelector('#quiz-feedback');

  quizForm.addEventListener('change', function (event) {
    if (event.target.matches('input[type=radio]')) {
      event.target.closest('.quiz-question').classList.remove('needs-answer');
    }
  });

  quizForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let score = 0;
    let answered = 0;
    let firstUnanswered = null;

    quizQuestions.forEach(function (question) {
      const answer = question.dataset.answer;
      const selected = question.querySelector('input:checked');
      const labels = question.querySelectorAll('label');
      question.classList.remove('needs-answer');

      if (!selected) {
        question.classList.add('needs-answer');
        if (!firstUnanswered) firstUnanswered = question.querySelector('input');
        return;
      }

      answered += 1;
      if (selected.value === answer) score += 1;
      labels.forEach(function (label) {
        const input = label.querySelector('input');
        label.classList.toggle('is-correct', input.value === answer);
        label.classList.toggle('is-incorrect', input.checked && input.value !== answer);
      });
    });

    if (answered < quizQuestions.length) {
      quizFeedback.textContent = answered === 0 ? 'Chọn một đáp án cho mỗi câu nhé.' : 'Bạn đã trả lời ' + answered + '/3 câu. Hoàn thành các câu còn lại để xem kết quả.';
      if (firstUnanswered) firstUnanswered.focus();
    } else if (score === quizQuestions.length) {
      quizFeedback.textContent = '3/3 chính xác — bạn đã nắm được nhịp chuyển.';
    } else {
      quizFeedback.textContent = score + '/3 câu đúng. Đáp án đúng được đánh dấu màu xanh.';
    }
  });

  quizForm.addEventListener('reset', function () {
    window.setTimeout(function () {
      quizQuestions.forEach(function (question) {
        question.classList.remove('needs-answer');
        question.querySelectorAll('label').forEach(function (label) {
          label.classList.remove('is-correct', 'is-incorrect');
        });
      });
      quizFeedback.textContent = 'Chọn một đáp án cho mỗi câu nhé.';
    }, 0);
  });
}
