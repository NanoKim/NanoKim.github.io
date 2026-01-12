/********************
 * SECTION SCROLLING
 ********************/
const HEADER_HEIGHT = 70;

let isScrolling = false;
let currentSectionIndex = 0;

const sectionsArr = Array.from(document.querySelectorAll('.section'));
function updateCurrentSection() {
  const scrollPos = window.scrollY + window.innerHeight / 2;

  sectionsArr.forEach((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      currentSectionIndex = index;
    }
  });
}

window.addEventListener(
  'wheel',
  e => {
    if (isScrolling) {
      e.preventDefault();
      return;
    }

    updateCurrentSection();

    if (e.deltaY > 0) {
      if (currentSectionIndex < sectionsArr.length - 1) {
        e.preventDefault();
        scrollToSection(currentSectionIndex + 1);
      }
    } else {
      if (currentSectionIndex > 0) {
        e.preventDefault();
        scrollToSection(currentSectionIndex - 1);
      }
    }
  },
  { passive: false }
);

function scrollToSection(index) {
  isScrolling = true;
  currentSectionIndex = index;

  const target = sectionsArr[index];
  const top = target.offsetTop;

  window.scrollTo({
    top,
    behavior: 'smooth'
  });

  syncThemeBySection();

  setTimeout(() => {
    isScrolling = false;
  }, 1200);
}

function syncThemeBySection() {
  const isDarkSection = currentSectionIndex === 4;
  document.body.classList.toggle('dark', isDarkSection);
  localStorage.setItem('theme', isDarkSection ? 'dark' : 'light');
}
/********************
 * SECTION SCROLLING
 ********************/

const scrollThumb = document.querySelector('.scroll-thumb');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const indicatorHeight = 200 - 40;

  const ratio = scrollTop / docHeight;
  const moveY = indicatorHeight * ratio;

  scrollThumb.style.transform = `translateY(${moveY}px)`;
});

/********************
 * HEADER
 ********************/
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.dataset.target;
    const index = sectionsArr.findIndex(
      section => section.id === targetId
    );

    if (index === -1) return;

    scrollToSection(index);
  });
});

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav a');

let lastScrollY = window.scrollY;
let scrollDirection = 'down';

window.addEventListener('scroll', () => {
  scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = window.scrollY;
});

const textObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;

      navLinks.forEach(link => {
        const isTarget = link.dataset.target === id;
        const isActive = link.classList.contains('active');

        if (isActive && !isTarget) {
          link.classList.remove(
            'fill-left',
            'fill-right',
            'remove-left',
            'remove-right'
          );

          if (scrollDirection === 'down') {
            link.classList.add('remove-right');
          } else {
            link.classList.add('remove-left');
          }

          link.classList.remove('active');
        }

        if (!isActive && isTarget) {
          link.classList.remove(
            'fill-left',
            'fill-right',
            'remove-left',
            'remove-right'
          );

          link.classList.add('active');

          if (scrollDirection === 'down') {
            link.classList.add('fill-left');
          } else {
            link.classList.add('fill-right');
          }
        }
      });
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => textObserver.observe(section));

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});
/********************
 * HEADER
 ********************/

/********************
 * SCROLL INDICATOR
 ********************/
const indicatorDots = document.querySelectorAll('.scroll-indicator span');

const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      indicatorDots.forEach(dot => {
        dot.classList.toggle(
          'active',
          dot.dataset.target === entry.target.id
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer2.observe(section));
/********************
 * SCROLL INDICATOR
 ********************/
document.getElementById('resumeBtn').addEventListener('click', e => {
  e.preventDefault();

  fetch('assets/pdf/resume.pdf')
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NanoKim_Resume.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
});

document.getElementById('portfolioBtn').addEventListener('click', e => {
  e.preventDefault();

  fetch('assets/pdf/portfolio.pdf')
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NanoKim_Portfolio.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
});