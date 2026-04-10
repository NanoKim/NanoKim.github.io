/********************
 * SECTION SCROLLING
 ********************/
const HEADER_HEIGHT = 70;

let currentSectionIndex = 0;

const sectionsArr = Array.from(document.querySelectorAll('.section'));
function updateCurrentSection() {
  const scrollPos = container.scrollTop + container.clientHeight / 2;

  sectionsArr.forEach((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      currentSectionIndex = index;
    }
  });
}

window.addEventListener('resize', () => {
  updateCurrentSection();
  scrollToSection(currentSectionIndex);
});

function scrollToSection(index) {
  currentSectionIndex = index;

  const target = sectionsArr[index];
  const top = target.offsetTop;

  container.scrollTo({
    top,
    behavior: 'smooth'
  });
}

const container = document.querySelector('.container');

container.addEventListener('wheel', (e) => {
  const activeSection = document.elementFromPoint(
    window.innerWidth / 2,
    window.innerHeight / 2
  ).closest('.section');

  const scrollable = activeSection.querySelector('.section_wrapper');

  if (!scrollable) return;

  const atTop = scrollable.scrollTop === 0;
  const atBottom =
    scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight;

  if (
    (e.deltaY > 0 && !atBottom) ||
    (e.deltaY < 0 && !atTop)
  ) {
    e.stopPropagation();
  }
}, { passive: false });
/********************
 * SECTION SCROLLING
 ********************/

const scrollThumb = document.querySelector('.scroll-thumb');

container.addEventListener('scroll', () => {
  const scrollTop = container.scrollTop;
  const docHeight = container.scrollHeight - container.clientHeight;

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

    let targetId = link.dataset.target;
    if (targetId === 'projects') {
      targetId = 'projects1';
    }
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

function mapToNavId(id) {
  if (id.startsWith('projects')) return 'projects';
  return id;
}

const textObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const id = mapToNavId(entry.target.id);

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


/********************
 * RESUME
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
/********************
 * RESUME
 ********************/


/********************
 * PORTFOLIO
 ********************/
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
/********************
 * PORTFOLIO
 ********************/


/********************
 * SKILL PROGRESS
 ********************/
document.querySelectorAll('.skill-bar').forEach(bar => {
  const percent = parseFloat(bar.dataset.percent) || 0;

  const totalStars = 5;
  const perStar = 100 / totalStars;

  for (let i = 0; i < totalStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const bg = document.createElement('div');
    bg.classList.add('star-bg');

    const fill = document.createElement('div');
    fill.classList.add('star-fill');

    const start = i * perStar;
    const end = start + perStar;

    let fillPercent = 0;

    if (percent >= end) {
      fillPercent = 100;
    } else if (percent > start) {
      fillPercent = ((percent - start) / perStar) * 100;
    }

    fill.style.width = fillPercent + '%';

    star.appendChild(bg);
    star.appendChild(fill);
    bar.appendChild(star);
  }
});
/********************
 * SKILL PROGRESS
 ********************/


/********************
 * PROJECT TAB
 ********************/
document.querySelectorAll('.project_section_container').forEach(project => {
  const tabs = project.querySelectorAll('.tab');
  const contents = project.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      project.querySelector(`#${target}`).classList.add('active');
    });
  });
});
/********************
 * PROJECT TAB
 ********************/


/********************
 * INVENTORY TAB
 ********************/
document.querySelectorAll('.inventory_section_container').forEach(inventory => {
  const tabs = inventory.querySelectorAll('.tab');
  const contents = inventory.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      inventory.querySelector(`#${target}`).classList.add('active');
    });
  });
});
/********************
 * INVENTORY TAB
 ********************/


/********************
 * STACK TAB
 ********************/
function animateStack(items) {
  items.forEach(el => {
    const x = (Math.random() - 0.5) * 600;
    const y = (Math.random() - 0.5) * 400 - 300;
    const r = (Math.random() - 0.5) * 720;

    el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(0.3)`;
    el.style.opacity = '0';
    el.style.filter = 'blur(6px)';
  });

  requestAnimationFrame(() => {
    items.forEach((el, i) => {
      setTimeout(() => {
        el.style.transform = '';
        el.style.opacity = '1';
        el.style.filter = 'blur(0)';
      }, i * 40);
    });
  });
}

function observeStack(container) {
  const items = container.querySelectorAll('.stack-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStack(items);
        observer.disconnect();
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(container);
}

document.querySelectorAll('.stack_section_container').forEach(project => {
  const tabs = project.querySelectorAll('.tab');
  const contents = project.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      const nextContent = project.querySelector(`#${target}`);

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      nextContent.classList.add('active');

      const nextItems = nextContent.querySelectorAll('.stack-item');
      animateStack(nextItems);
    });
  });

  const container = project;

  observeStack(container);
});
/********************
 * STACK TAB
 ********************/


/********************
 * CODING STYLE TAB
 ********************/
document.querySelectorAll('.coding-pre code').forEach(el => {
  el.dataset.code = el.textContent.trim();
});

let typingTimer;

function typeCode(element, speed = 1) {
  clearTimeout(typingTimer);

  const text = element.dataset.code;
  element.textContent = '';
  let i = 0;

  const chunk = 8;

  function typing() {
    if (i < text.length) {
      element.textContent += text.slice(i, i + chunk);
      i += chunk;
      typingTimer = setTimeout(typing, speed);
    } else {
      Prism.highlightElement(element);
    }
  }

  typing();
}

function observeCoding(container) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeContent = container.querySelector('.coding-content.active');
        const codeEl = activeContent.querySelector('code');

        typeCode(codeEl, 1);

        observer.disconnect();
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(container);
}

document.querySelectorAll('.codingStyle_section_container').forEach(project => {
  const tabs = project.querySelectorAll('.coding-tab');
  const contents = project.querySelectorAll('.coding-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const activeContent = project.querySelector(`#${target}`);
      activeContent.classList.add('active');

      const codeEl = activeContent.querySelector('code');
      typeCode(codeEl, 5);
    });
  });

  observeCoding(project);
});
/********************
 * CODING STYLE TAB
 ********************/


/********************
 * RADAR CHART
 ********************/
document.querySelectorAll('.radar-chart').forEach(chart => {
  const values = chart.dataset.values.split(',').map(v => parseFloat(v));
  const svg = chart.querySelector('.radar-svg');

  if (!svg) return;

  svg.innerHTML = '';

  const size = 200;
  const center = size / 2;
  const radius = 80;
  const levels = 7;

  const angleStep = (Math.PI * 2) / values.length;

  function getPoint(value, i, scale = 1) {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = radius * scale * (value / 100);
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  }

  function getGridPoint(i, scale) {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = radius * scale;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  }

  for (let level = 1; level <= levels; level++) {
    const scale = level / levels;
    const points = values.map((_, i) => getGridPoint(i, scale)).join(' ');

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", points);
    polygon.setAttribute("class", "radar-grid");

    svg.appendChild(polygon);
  }

  values.forEach((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;

    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", center);
    line.setAttribute("y1", center);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("class", "radar-axis");

    svg.appendChild(line);
  });

  const dataPoints = values.map((v, i) => getPoint(v, i)).join(' ');

  const dataPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  dataPolygon.setAttribute("points", dataPoints);
  dataPolygon.setAttribute("class", "radar-data");

  svg.appendChild(dataPolygon);
});
/********************
 * RADAR CHART
 ********************/


/********************
 * PROJECT IMAGE
 ********************/
const modal = document.getElementById('imageModal');
const modalImg = modal.querySelector('.image-modal-content');

document.querySelectorAll('.image-hover-box img').forEach(img => {
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.add('active');
    modalImg.src = img.src;
  });
});

document.querySelectorAll('.zoom-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const img = btn.closest('.image-hover-box').querySelector('img');
    modal.classList.add('active');
    modalImg.src = img.src;
  });
});

document.addEventListener('click', () => {
  modal.classList.remove('active');
});
/********************
 * PROJECT IMAGE
 ********************/